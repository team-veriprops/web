import { IntroModal } from "./modals/IntroModal";
import LearnMoreModal from "./modals/LearnMoreModal";
import { RoleStoryModal } from "./modals/RoleStoryModal";

export default function TrustNetworkOnboardingComponent() {
  return (
    <>
      <LearnMoreModal />
      <IntroModal />
      <RoleStoryModal />
    </>
  );
}
