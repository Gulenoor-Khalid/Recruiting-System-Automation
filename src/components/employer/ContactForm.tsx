import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { X, Send } from "lucide-react";

interface ContactFormProps {
  candidate: {
    id: string;
    name: string;
    title?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export const ContactForm = ({ candidate, isOpen, onClose }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    employerEmail: "",
    employerCompany: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("intros")
        .insert({
          employer_email: formData.employerEmail,
          employer_company: formData.employerCompany,
          candidate_id: candidate.id,
          message: formData.message
        });

      if (error) throw error;

      toast.success(`Contact request sent to ${candidate.name}`);
      onClose();
      setFormData({ employerEmail: "", employerCompany: "", message: "" });
    } catch (error) {
      console.error("Error sending contact request:", error);
      toast.error("Failed to send contact request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Contact {candidate.name}
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="employerEmail">Your Email</Label>
            <Input
              id="employerEmail"
              type="email"
              required
              value={formData.employerEmail}
              onChange={(e) => setFormData({ ...formData, employerEmail: e.target.value })}
              placeholder="employer@company.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="employerCompany">Company</Label>
            <Input
              id="employerCompany"
              required
              value={formData.employerCompany}
              onChange={(e) => setFormData({ ...formData, employerCompany: e.target.value })}
              placeholder="Your Company Name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={`Hi ${candidate.name}, I'm interested in discussing opportunities with you...`}
              rows={4}
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? "Sending..." : "Send Contact Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};