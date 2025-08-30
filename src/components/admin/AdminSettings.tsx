import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Mail, 
  Shield, 
  Database, 
  Bell, 
  Globe,
  Save,
  RefreshCw
} from "lucide-react";

export const AdminSettings = () => {
  return (
    <div className="space-y-6">
      {/* Platform Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Platform Settings
          </CardTitle>
          <CardDescription>
            Configure general platform settings and behavior
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="platform-name">Platform Name</Label>
              <Input id="platform-name" defaultValue="EntryPath Career" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform-url">Platform URL</Label>
              <Input id="platform-url" defaultValue="https://entrypath.career" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="platform-description">Platform Description</Label>
            <Textarea 
              id="platform-description" 
              defaultValue="AI-powered career matching platform connecting candidates with perfect opportunities."
              rows={3}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Feature Toggles</h4>
            <div className="space-y-3">
              {[
                { label: "User Registration", description: "Allow new users to register" },
                { label: "Job Posting", description: "Enable employers to post jobs" },
                { label: "AI Matching", description: "Use AI for candidate-job matching" },
                { label: "Video Pitches", description: "Allow video pitch recordings" },
                { label: "Public Profiles", description: "Make candidate profiles publicly visible" }
              ].map((feature, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{feature.label}</div>
                    <div className="text-xs text-muted-foreground">{feature.description}</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            Configure system notifications and alerts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {[
              { label: "New User Registrations", description: "Notify admins of new user signups" },
              { label: "Job Applications", description: "Notify employers of new applications" },
              { label: "Profile Completions", description: "Notify when candidates complete profiles" },
              { label: "System Errors", description: "Alert admins of system issues" },
              { label: "Weekly Reports", description: "Send weekly platform statistics" }
            ].map((notification, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">{notification.label}</div>
                  <div className="text-xs text-muted-foreground">{notification.description}</div>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Configure security and access control settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
              <Input id="session-timeout" type="number" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-login-attempts">Max Login Attempts</Label>
              <Input id="max-login-attempts" type="number" defaultValue="5" />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Security Features</h4>
            <div className="space-y-3">
              {[
                { label: "Two-Factor Authentication", description: "Require 2FA for admin accounts" },
                { label: "Password Complexity", description: "Enforce strong password requirements" },
                { label: "IP Whitelist", description: "Restrict admin access to specific IPs" },
                { label: "Audit Logging", description: "Log all administrative actions" }
              ].map((security, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{security.label}</div>
                    <div className="text-xs text-muted-foreground">{security.description}</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Configuration
          </CardTitle>
          <CardDescription>
            Configure SMTP settings for system emails
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <Input id="smtp-host" defaultValue="smtp.entrypath.career" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-port">SMTP Port</Label>
              <Input id="smtp-port" type="number" defaultValue="587" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="smtp-username">Username</Label>
              <Input id="smtp-username" defaultValue="noreply@entrypath.career" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from-email">From Email</Label>
              <Input id="from-email" defaultValue="EntryPath <noreply@entrypath.career>" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Test Connection
            </Button>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Connected
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4">
        <Button variant="outline">
          Cancel Changes
        </Button>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save All Settings
        </Button>
      </div>
    </div>
  );
};