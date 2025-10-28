import { useState } from 'react';
import { CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface ProfessionDetail {
  id: string;
  icon: string;
  title: string;
  bullets: string[];
  persona: string;
}

interface ProfessionCardProps {
  profession: ProfessionDetail;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function ProfessionCard({ profession, isSelected, onSelect }: ProfessionCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    onSelect(profession.id);
    if (!isExpanded) setIsExpanded(true);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-md'
          : 'border-border hover:border-primary/30'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <span className="text-2xl mt-1">{profession.icon}</span>
          <div className="flex-1">
            <h3 className="font-heading font-semibold mb-1 flex items-center gap-2">
              {profession.title}
              {isSelected && <CheckCircle2 className="h-4 w-4 text-primary" />}
            </h3>
            {isExpanded && (
              <div className="mt-3 space-y-2 animate-fade-in">
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {profession.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs italic text-primary/80 mt-3 pt-3 border-t">
                  {profession.persona}
                </p>
              </div>
            )}
          </div>
        </div>
        {isSelected && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-1 hover:bg-muted rounded-md transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    </button>
  );
}
