import { Lock, Globe, Link } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface PrivacyIndicatorProps {
  visibility: 'public' | 'private' | 'link';
  className?: string;
  showText?: boolean;
}

export const PrivacyIndicator = ({ visibility, className, showText = false }: PrivacyIndicatorProps) => {
  const getIcon = () => {
    switch (visibility) {
      case 'public':
        return <Globe className="h-4 w-4" />;
      case 'link':
        return <Link className="h-4 w-4" />;
      case 'private':
      default:
        return <Lock className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    switch (visibility) {
      case 'public':
        return 'Public - Visible to all employers';
      case 'link':
        return 'Link sharing - Accessible via direct link only';
      case 'private':
      default:
        return 'Private - Only visible to you';
    }
  };

  const getColor = () => {
    switch (visibility) {
      case 'public':
        return 'text-green-600';
      case 'link':
        return 'text-blue-600';
      case 'private':
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn(
            "flex items-center gap-1.5",
            getColor(),
            className
          )}>
            {getIcon()}
            {showText && (
              <span className="text-xs font-medium capitalize">
                {visibility}
              </span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-xs">{getLabel()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};