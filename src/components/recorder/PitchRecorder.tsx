import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Mic, 
  Video, 
  Square, 
  Play, 
  Pause, 
  Upload,
  Loader2,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface PitchRecorderProps {
  onEvaluationComplete: (evaluation: any, transcript: string, mediaUrl: string) => void;
  disabled?: boolean;
}

interface PitchEvaluation {
  clarity: number;
  confidence: number;
  pacing: number;
  suggestions: string[];
  transcript: string;
  overall_score: number;
}

const PitchRecorder = ({ onEvaluationComplete, disabled = false }: PitchRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingType, setRecordingType] = useState<'audio' | 'video'>('audio');
  const [mediaBlob, setMediaBlob] = useState<Blob | null>(null);
  const [mediaUrl, setMediaUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [evaluation, setEvaluation] = useState<PitchEvaluation | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setRecordingDuration(prev => prev + 1);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      setRecordingDuration(0);
      
      const constraints = recordingType === 'video' 
        ? { video: true, audio: true }
        : { audio: true };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (recordingType === 'video' && videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      // Create MediaRecorder with proper options
      const options: MediaRecorderOptions = {};
      const nativeMediaRecorder = window.MediaRecorder;
      
      if (recordingType === 'video') {
        // Try video formats in order of preference
        if (nativeMediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')) {
          options.mimeType = 'video/webm;codecs=vp9,opus';
        } else if (nativeMediaRecorder.isTypeSupported('video/webm')) {
          options.mimeType = 'video/webm';
        }
      } else {
        // Try audio formats in order of preference
        if (nativeMediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
          options.mimeType = 'audio/webm;codecs=opus';
        } else if (nativeMediaRecorder.isTypeSupported('audio/webm')) {
          options.mimeType = 'audio/webm';
        }
      }

      const recorder = new nativeMediaRecorder(stream, options);
      mediaRecorderRef.current = recorder;
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const mimeType = recordingType === 'video' ? 'video/webm' : 'audio/webm';
        const blob = new Blob(chunks, { type: mimeType });
        setMediaBlob(blob);
        setMediaUrl(URL.createObjectURL(blob));
        stopTimer();
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      };

      recorder.start();
      setIsRecording(true);
      startTimer();
      
      toast.success(`${recordingType === 'video' ? 'Video' : 'Audio'} recording started`);
    } catch (error) {
      console.error('Error starting recording:', error);
      toast.error('Failed to start recording. Please check your permissions.');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        startTimer();
        setIsPaused(false);
        toast.success('Recording resumed');
      } else {
        mediaRecorderRef.current.pause();
        stopTimer();
        setIsPaused(true);
        toast.success('Recording paused');
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      toast.success('Recording stopped');
    }
  };

  const playMedia = () => {
    if (recordingType === 'video' && videoRef.current) {
      videoRef.current.play();
    } else if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const evaluatePitch = async () => {
    if (!mediaBlob) {
      toast.error('No recording available to evaluate');
      return;
    }

    setIsProcessing(true);
    try {
      // Convert blob to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        const audioData = base64.split(',')[1]; // Remove data URL prefix

        // Call evaluation edge function
        const { data, error } = await supabase.functions.invoke('evaluatePitch', {
          body: {
            audio: audioData,
            type: recordingType
          }
        });

        if (error) {
          throw new Error(error.message || 'Evaluation failed');
        }

        if (!data.success) {
          throw new Error(data.error || 'Evaluation failed');
        }

        // Upload media to storage if evaluation was successful
        const timestamp = Date.now();
        const fileName = `pitch_${timestamp}.${recordingType === 'video' ? 'webm' : 'webm'}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('pitch-recordings')
          .upload(fileName, mediaBlob, {
            contentType: recordingType === 'video' ? 'video/webm' : 'audio/webm',
            upsert: false
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          // Continue even if upload fails
        }

        const mediaStorageUrl = uploadData ? 
          supabase.storage.from('pitch-recordings').getPublicUrl(uploadData.path).data.publicUrl :
          null;

        setEvaluation(data.evaluation);
        onEvaluationComplete(data.evaluation, data.evaluation.transcript, mediaStorageUrl || '');
        
        toast.success('Pitch evaluation completed!');
      };
      
      reader.readAsDataURL(mediaBlob);
    } catch (error) {
      console.error('Error evaluating pitch:', error);
      toast.error('Failed to evaluate pitch. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetRecording = () => {
    setMediaBlob(null);
    setMediaUrl(null);
    setEvaluation(null);
    setRecordingDuration(0);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold">🎬 Record Your Pitch</h3>
        <p className="text-sm text-muted-foreground">
          Choose audio or video recording, then get AI feedback on your performance
        </p>
      </div>

      <Tabs value={recordingType} onValueChange={(value) => setRecordingType(value as 'audio' | 'video')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="audio" className="flex items-center space-x-2">
            <Mic className="h-4 w-4" />
            <span>Audio Only</span>
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center space-x-2">
            <Video className="h-4 w-4" />
            <span>Video + Audio</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="audio" className="space-y-4">
          <div className="text-center text-sm text-muted-foreground">
            Record audio only for a quick pitch evaluation
          </div>
        </TabsContent>

        <TabsContent value="video" className="space-y-4">
          <div className="space-y-2">
            <div className="text-center text-sm text-muted-foreground">
              Record video to get feedback on both verbal and non-verbal communication
            </div>
            {isRecording && recordingType === 'video' && (
              <video
                ref={videoRef}
                className="w-full max-w-md mx-auto rounded-lg border"
                muted
                playsInline
              />
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Recording Controls */}
      <div className="space-y-4">
        {!isRecording && !mediaBlob && (
          <div className="flex justify-center">
            <Button 
              onClick={startRecording}
              disabled={disabled}
              size="lg"
              className="flex items-center space-x-2"
            >
              {recordingType === 'video' ? <Video className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              <span>Start Recording</span>
            </Button>
          </div>
        )}

        {isRecording && (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2 text-red-600">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
              <span className="font-medium">
                {isPaused ? 'PAUSED' : 'RECORDING'} - {formatTime(recordingDuration)}
              </span>
            </div>
            
            <div className="flex space-x-2">
              <Button 
                onClick={pauseRecording}
                variant="outline"
                size="sm"
              >
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                <span className="ml-1">{isPaused ? 'Resume' : 'Pause'}</span>
              </Button>
              
              <Button 
                onClick={stopRecording}
                variant="destructive"
                size="sm"
              >
                <Square className="h-4 w-4" />
                <span className="ml-1">Stop</span>
              </Button>
            </div>
          </div>
        )}

        {/* Media Playback */}
        {mediaUrl && (
          <div className="space-y-4">
            <div className="flex justify-center">
              {recordingType === 'video' ? (
                <video
                  ref={videoRef}
                  src={mediaUrl}
                  controls
                  className="w-full max-w-md rounded-lg border"
                />
              ) : (
                <audio
                  ref={audioRef}
                  src={mediaUrl}
                  controls
                  className="w-full max-w-md"
                />
              )}
            </div>

            <div className="flex justify-center space-x-2">
              <Button 
                onClick={evaluatePitch}
                disabled={isProcessing}
                className="flex items-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Evaluating...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span>Get AI Feedback</span>
                  </>
                )}
              </Button>

              <Button 
                onClick={resetRecording}
                variant="outline"
                disabled={isProcessing}
              >
                Record Again
              </Button>
            </div>
          </div>
        )}

        {/* Evaluation Results */}
        {evaluation && (
          <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold text-green-800">Pitch Evaluation Complete</h4>
                <Badge variant="secondary">Score: {evaluation.overall_score}/10</Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{evaluation.clarity}/10</div>
                  <div className="text-sm text-muted-foreground">Clarity</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{evaluation.confidence}/10</div>
                  <div className="text-sm text-muted-foreground">Confidence</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{evaluation.pacing}/10</div>
                  <div className="text-sm text-muted-foreground">Pacing</div>
                </div>
              </div>

              {evaluation.suggestions && evaluation.suggestions.length > 0 && (
                <div>
                  <h5 className="font-medium text-gray-700 mb-2">💡 Suggestions for Improvement:</h5>
                  <ul className="text-sm space-y-1">
                    {evaluation.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        )}
      </div>
    </Card>
  );
};

export default PitchRecorder;