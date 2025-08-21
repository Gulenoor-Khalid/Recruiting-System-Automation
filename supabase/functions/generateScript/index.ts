import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { candidateData } = await req.json();

    if (!candidateData) {
      throw new Error('Candidate data is required');
    }

    console.log('Generating script for candidate:', candidateData.name);

    // Create a personalized prompt based on candidate data
    const prompt = `Create a compelling 60-second elevator pitch for the following candidate. Make it natural, confident, and engaging. Focus on their unique value proposition.

Candidate Details:
- Name: ${candidateData.name}
- Experience: ${candidateData.experience}
- Skills: ${candidateData.skills.join(', ')}
- Interests: ${candidateData.interests.join(', ')}
- Career Goals: ${candidateData.goals}
- Availability: ${candidateData.availability}

Requirements:
- Keep it to 150-200 words (60 seconds when spoken)
- Start with a strong introduction
- Highlight 2-3 key strengths or achievements
- Connect their skills to potential value for employers
- Include their career aspirations
- End with enthusiasm and a call to action
- Make it sound natural and conversational, not robotic
- Use "I" statements throughout

Return only the pitch script without any additional formatting or explanations.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert career coach who specializes in creating compelling elevator pitches. Generate natural, confident, and engaging pitch scripts.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    const generatedScript = data.choices[0].message.content.trim();

    console.log('Script generated successfully');

    return new Response(
      JSON.stringify({ 
        success: true, 
        script: generatedScript 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in generate-script function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});