import { Button } from "@components/3rdparty/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/3rdparty/ui/dialog";
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { useTrustNetworkStore } from "../../libs/useTrustNetworkStore";
import { useEffect, useState } from "react";
import { RoleType } from "../../models";

const steps = [
  {
    title: "Rebuilding trust in Nigerian real estate — together.",
    description:
      "Join a community that verifies properties and protects buyers.",
    icon: Shield,
  },
  {
    title: "Why join?",
    bullets: [
      "Prevent fake land sales and protect buyers.",
      "Be part of a trusted network of professionals.",
      "Earn recognition on Veriprops.",
    ],
    icon: Users,
  },
];

const roles = [
  {
    id: "verifier" as RoleType,
    icon: UserCheck,
    title: "Verifier",
    description: "Verify property documents and site conditions",
  },
  {
    id: "referrer" as RoleType,
    icon: Users,
    title: "Referrer",
    description: "Connect buyers to verified opportunities",
  },
  {
    id: "both" as RoleType,
    icon: Shield,
    title: "Both / Other",
    description: "Multiple roles or custom contribution",
  },
];

export function IntroModal() {
  const {
    openOnboarding,
    setOpenOnboarding,
    currentOnboardingStage,
    setCurrentOnboardingStage,
    selectedRole,
    setSelectedRole,
  } = useTrustNetworkStore();
  const [open, setOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState<number>(1);

  const maxStage = 3;

  useEffect(() => {
    const openModal = openOnboarding && currentOnboardingStage <= maxStage;
    setOpen(openModal);
    setCurrentStage(currentOnboardingStage);
  }, [openOnboarding, currentOnboardingStage]);

  //   const handleStepChange = (newStep: number) => {
  //     onStepChange(newStep);
  //     analytics.track('trust_modal_step_viewed', { step: newStep, modal: 'intro' });
  //   };

  //   const handleContinue = () => {
  //     if (selectedRole) {
  //       analytics.track('trust_role_selected', { role: selectedRole });
  //       onRoleSelect(selectedRole);
  //     }
  //   };

  //   const handleClose = () => {
  //     analytics.track('trust_modal_closed', { step: currentStep, modal: 'intro' });
  //     onClose();
  //   };

  return (
    <Dialog open={open} onOpenChange={setOpenOnboarding}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          {/* <button
            onClick={handleClose}
            className="absolute right-0 top-0 p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button> */}
          <DialogTitle className="text-sm text-muted-foreground">
            Step {currentStage} of 3
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4 animate-fade-in">
          {currentStage === 1 && (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Shield className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold">
                {steps[0].title}
              </h2>
              <p className="text-muted-foreground text-lg">
                {steps[0].description}
              </p>
            </div>
          )}

          {currentStage === 2 && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Users className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-center">
                {steps[1].title}
              </h2>
              <ul className="space-y-4">
                {steps[1].bullets?.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-1 h-5 w-5 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-success" />
                    </div>
                    <span className="text-foreground">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentStage === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-center">
                Choose your role
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      onClick={() => setSelectedRole(role.id)}
                      className={`p-6 rounded-xl border-2 transition-all text-left hover:scale-105 ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-lg"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <Icon
                        className={`h-8 w-8 mb-3 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                      />
                      <h3 className="font-heading font-semibold mb-1">
                        {role.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {role.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex gap-1">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2 w-8 rounded-full transition-colors ${
                  step === currentStage ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {currentStage > 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentOnboardingStage(currentStage - 1)}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
            {currentStage < 3 ? (
              <Button
                onClick={() => setCurrentOnboardingStage(currentStage + 1)}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                onClick={() => setCurrentOnboardingStage(currentStage + 1)}
                disabled={!selectedRole}
                className="trust-gradient"
              >
                Continue
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
          </div>
        </div>

        <button
          onClick={() => setOpenOnboarding(false)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors text-center w-full pt-2"
        >
          Finish later
        </button>
      </DialogContent>
    </Dialog>
  );
}
