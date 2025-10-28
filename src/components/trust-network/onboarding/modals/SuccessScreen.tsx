import { Button } from '@3rdparty/ui/button';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { RoleType } from '../../models';

interface SuccessScreenProps {
  firstName: string;
  role: RoleType;
  onContinue: () => void;
}

export function SuccessScreen({ firstName, role, onContinue }: SuccessScreenProps) {
  const roleLabel = role === 'verifier' ? 'Verifier' : role === 'referrer' ? 'Referrer' : 'Member';

  return (
    <div className="text-center space-y-6 py-8 animate-fade-in">
      <div className="flex justify-center">
        <div className="p-6 bg-success/10 rounded-full">
          <CheckCircle2 className="h-16 w-16 text-success" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h2 className="text-3xl md:text-4xl font-heading font-bold">
          🎉 Welcome aboard, {firstName}!
        </h2>
        <p className="text-lg text-muted-foreground">
          {"You've joined the Trust Network as a"} <span className="text-primary font-semibold">{roleLabel}</span>.
        </p>
      </div>

      <div className="bg-muted/50 rounded-xl p-6 space-y-3">
        <p className="text-sm text-foreground">
          {"You're now part of a community rebuilding trust in Nigerian real estate."}
        </p>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            Profile created successfully
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            Access to Trust Network features
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            Ready to start making an impact
          </li>
        </ul>
      </div>

      <Button 
        onClick={onContinue}
        size="lg"
        className="trust-gradient shadow-lg hover:shadow-xl transition-all"
      >
        Go to Trust Dashboard
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
}
