import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@3rdparty/ui/dialog";
import { Button } from "@3rdparty/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Shield,
  CheckCircle2,
} from "lucide-react";
import { ProfessionCard } from "./ProfessionCard";
import { ProfessionType } from "../../models";
import { SignupForm } from "./SignupForm";
import { useTrustNetworkStore } from "../../libs/useTrustNetworkStore";

const verifierProfessions = [
  {
    id: "lawyer",
    icon: "⚖️",
    title: "Land / Property Lawyer",
    bullets: [
      "Review titles & deeds",
      "Confirm ownership against registry",
      "Flag irregularities",
    ],
    persona:
      'Example: "I ensure documents are legally sound and ownership is verified."',
  },
  {
    id: "surveyor",
    icon: "📐",
    title: "Land / Property Surveyor",
    bullets: [
      "Verify boundaries & coordinates",
      "Compare to cadastral maps",
      "Confirm land size",
    ],
    persona:
      'Example: "I measure and validate property boundaries accurately."',
  },
  {
    id: "field",
    icon: "📍",
    title: "Field Agent & Property Guide",
    bullets: [
      "Visit & capture geotagged photos",
      "Verify nearby landmarks & conditions",
      "Escort clients to verified locations",
    ],
    persona: 'Example: "I visit sites and confirm what\'s really there."',
  },
];

const roleContent = {
  verifier: {
    step1: {
      title: "Why Verifiers matter",
      description:
        "Verifiers stop fake documents and protect buyers from fraud. Your expertise ensures every property is legitimate.",
    },
    step3: {
      title: "Your benefits",
      benefits: [
        "Build your professional reputation on Veriprops",
        "Earn recognition as a trusted verification expert",
        "Access exclusive verification opportunities",
        "Join a network of respected professionals",
      ],
    },
  },
  referrer: {
    step1: {
      title: "Why Referrers matter",
      description:
        "Referrers connect real buyers to verified opportunities, making the property market safer and more efficient.",
    },
    step2: {
      title: "How you help",
      bullets: [
        "Refer qualified buyers to verified listings",
        "Validate basic listing information",
        "Connect buyers with trusted property professionals",
        "Help grow the trusted property network",
      ],
    },
    step3: {
      title: "Your benefits",
      benefits: [
        "Earn referral rewards for successful connections",
        "Build a network of verified property contacts",
        "Access exclusive verified listings early",
        "Establish yourself as a trusted connector",
      ],
    },
  },
  both: {
    step1: {
      title: "Making an impact",
      description:
        "Whether verifying, referring, or both — you're helping rebuild trust in Nigerian real estate.",
    },
    step3: {
      title: "Your benefits",
      benefits: [
        "Multiple ways to contribute and earn recognition",
        "Build diverse professional connections",
        "Access all network opportunities",
        "Maximize your impact on the property ecosystem",
      ],
    },
  },
};

export function RoleStoryModal() {
  const {
    openOnboarding,
    setOpenOnboarding,
    currentOnboardingStage,
    setCurrentOnboardingStage,
    selectedRole,
    selectedProfession,
    setSelectedProfession,
  } = useTrustNetworkStore();
  const [open, setOpen] = useState(false);
  const [currentStage, setCurrentStage] = useState<number>(1);

  const content = roleContent[selectedRole!];
  const isVerifier = selectedRole === "verifier";

  const minStage = 4;
  const maxStage = 7;

  useEffect(() => {
    const openModal =
      openOnboarding &&
      currentOnboardingStage >= minStage &&
      currentOnboardingStage <= maxStage;

    setOpen(openModal);
    setCurrentStage(currentOnboardingStage - minStage + 1);
  }, [openOnboarding, currentOnboardingStage]);

  //   const handleStepChange = (newStep: number) => {
  //     onStepChange(newStep);
  //     analytics.track('trust_modal_step_viewed', { step: newStep, modal: 'story', role });
  //   };

  //   const handleClose = () => {
  //     analytics.track('trust_modal_closed', { step: currentStage, modal: 'story', role });
  //     onClose();
  //   };

  return (
    <Dialog open={open} onOpenChange={setOpenOnboarding}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <DialogTitle className="text-sm text-muted-foreground">
            Step {currentStage} of 4
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
                {content?.step1?.title}
              </h2>
              <p className="text-muted-foreground text-lg">
                {content?.step1?.description}
              </p>
            </div>
          )}

          {currentStage === 2 && isVerifier && (
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-center">
                How you help
              </h2>
              <p className="text-center text-muted-foreground">
                Select your profession to see how you can contribute
              </p>
              <div className="space-y-3">
                {verifierProfessions.map((prof) => (
                  <ProfessionCard
                    key={prof.id}
                    profession={prof}
                    isSelected={selectedProfession === prof.id}
                    onSelect={(id) =>
                      setSelectedProfession(id as ProfessionType)
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {currentStage === 2 && !isVerifier && (
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-heading font-semibold text-center">
                How you help
              </h2>
              <ul className="space-y-4">
                {roleContent.referrer.step2.bullets.map((bullet, idx) => (
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
                {content.step3.title}
              </h2>
              <ul className="space-y-4">
                {content.step3.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentStage === 4 && <SignupForm />}
        </div>

        {currentStage < 4 && (
          <>
            <div className="flex items-center justify-between pt-6 border-t">
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((step) => (
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
                    onClick={() => setCurrentOnboardingStage(currentOnboardingStage - 1)}
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                )}
                <Button
                  onClick={() => setCurrentOnboardingStage(currentOnboardingStage + 1)}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>

            <button
              onClick={() => setOpenOnboarding(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors text-center w-full pt-2"
            >
              Finish later
            </button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
