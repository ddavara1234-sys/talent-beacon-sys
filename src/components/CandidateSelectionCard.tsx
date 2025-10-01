import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Star, Briefcase, Clock } from 'lucide-react';
import type { CandidateSelection } from '@/hooks/useCandidateSelection';

interface CandidateSelectionCardProps {
  candidate: CandidateSelection;
  onAccept: (candidate: CandidateSelection) => void;
  onReject: (candidate: CandidateSelection) => void;
  onClick: (candidate: CandidateSelection) => void;
  isProcessing?: boolean;
}

export const CandidateSelectionCard: React.FC<CandidateSelectionCardProps> = ({
  candidate,
  onAccept,
  onReject,
  onClick,
  isProcessing = false
}) => {
  const name = candidate["Name "]?.trim() || "Unknown";
  const overallScore = candidate["Overall Score "] || 0;
  const skills = candidate["Technical skill"]?.split(',').slice(0, 3) || [];
  const experience = candidate["Years of relevent experience"] || "0yr";
  
  return (
    <Card 
      className="p-5 hover:shadow-lg transition-all duration-200 cursor-pointer bg-card border-border"
      onClick={() => onClick(candidate)}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground truncate">{name}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{candidate.Designation || "Not Mentioned"}</p>
          </div>
          <Badge className="bg-info/10 text-info hover:bg-info/20 gap-1.5 shrink-0 px-2.5 py-1">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="font-semibold">{overallScore}</span>
          </Badge>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4 shrink-0" />
            <span className="truncate">{candidate.Email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 shrink-0" />
            <span>{String(candidate["Mobile no"])}</span>
          </div>
        </div>

        {/* Experience */}
        <div className="flex items-center gap-4 text-sm flex-wrap">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Briefcase className="h-4 w-4 shrink-0" />
            <span className="truncate">{candidate["Current Organization\n"]?.trim() || "Not Mentioned"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-4 w-4 shrink-0" />
            <span>{experience} exp</span>
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <Badge 
                key={idx} 
                className="bg-accent/10 text-accent hover:bg-accent/20 text-xs font-medium px-2.5 py-0.5"
              >
                {skill.trim()}
              </Badge>
            ))}
            {candidate["Technical skill"]?.split(',').length > 3 && (
              <Badge className="bg-accent/10 text-accent hover:bg-accent/20 text-xs font-medium px-2.5 py-0.5">
                +{candidate["Technical skill"].split(',').length - 3} more
              </Badge>
            )}
          </div>
        )}

        {/* Summary */}
        <p className="text-sm text-muted-foreground line-clamp-2 italic leading-relaxed">
          "{candidate["Quick read"]}"
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onAccept(candidate);
            }}
            disabled={isProcessing}
            className="flex-1 bg-success hover:bg-success/90 text-success-foreground font-medium"
          >
            ✓ Accept
          </Button>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onReject(candidate);
            }}
            disabled={isProcessing}
            variant="destructive"
            className="flex-1 font-medium"
          >
            ✕ Reject
          </Button>
        </div>
      </div>
    </Card>
  );
};
