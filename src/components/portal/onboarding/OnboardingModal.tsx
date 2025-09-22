"use client";

import { Dialog, DialogContent } from "@3rdparty/ui/dialog";
import { OnboardingFlow } from "./OnboardingFlow";
import { useUI } from "@stores/useStore";
import { useBodyOverflowHidden } from "@hooks/useBodyOverflowHidden";

export default function OnboardingModal() {
  
  const { isOnBoardingModalOpen, setOnBoardingModalOpen } = useUI();
  
  // Lock body scroll when modal is open
  useBodyOverflowHidden(isOnBoardingModalOpen);

  return (
    <Dialog open={isOnBoardingModalOpen} onOpenChange={() => setOnBoardingModalOpen(false)}>
      <DialogContent className="max-w-none w-full h-full p-0 border-0 bg-transparent overflow-y-auto">
        <div className="w-full min-h-full">
          <OnboardingFlow />
        </div>
      </DialogContent>
    </Dialog>
  );
}
