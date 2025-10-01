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
  const overallScore = candidate["Overall Score"] || "N/A";
  const skills = candidate["Technical skill"]?.split(',').slice(0, 3) || [];
  
  return (
    <Card 
      className="p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(candidate)}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{candidate.Name}</h3>
            <p className="text-sm text-muted-foreground">{candidate.Designation || "Not Mentioned"}</p>
          </div>
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 gap-1">
            <Star className="h-3 w-3 fill-current" />
            {overallScore}
          </Badge>
        </div>

        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span className="truncate">{candidate.Email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{candidate["Mobile no"]}</span>
          </div>
        </div>

        {/* Experience */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Briefcase className="h-4 w-4" />
            <span>{candidate["Current Organization"] || "ByteXL"}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{candidate["Years of relevent experience"] || "0"} months</span>
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <Badge key={idx} variant="secondary" className="text-xs">
                {skill.trim()}
              </Badge>
            ))}
            {skills.length >= 3 && (
              <Badge variant="secondary" className="text-xs">
                +10 more
              </Badge>
            )}
          </div>
        )}

        {/* Summary */}
        <p className="text-sm text-muted-foreground line-clamp-3 italic">
          "{candidate["Quick read"]}"
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onAccept(candidate);
            }}
            disabled={isProcessing}
            className="flex-1 bg-success hover:bg-success/90 text-success-foreground"
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
            className="flex-1"
          >
            ✕ Reject
          </Button>
        </div>
      </div>
    </Card>
  );
};
