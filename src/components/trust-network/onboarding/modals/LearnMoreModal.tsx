import { Dialog, DialogContent } from "@components/3rdparty/ui/dialog";
import { useTrustNetworkStore } from "../../libs/useTrustNetworkStore";

export default function LearnMoreModal() {
  const { openLearnMore, setOpenLearnMore } = useTrustNetworkStore();

  return (
    <Dialog open={openLearnMore} onOpenChange={setOpenLearnMore}>
      <DialogContent className="sm:max-w-2xl">
        <div className="space-y-4 pt-4">
          <h2 className="text-2xl font-heading font-semibold">
            About Trust Network
          </h2>
          <p className="text-muted-foreground">
            The Veriprops Trust Network connects property professionals to
            verify listings, prevent fraud, and build confidence in Nigerian
            real estate transactions.
          </p>
          <div className="space-y-3">
            <h3 className="font-semibold">How it works:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>Verifiers check documents and visit properties</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>Referrers connect buyers to verified opportunities</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">→</span>
                <span>Everyone earns recognition and builds their network</span>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
