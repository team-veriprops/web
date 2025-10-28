import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { Card } from "@3rdparty/ui/card";
import { Button } from "@3rdparty/ui/button";
import { Input } from "@3rdparty/ui/input";
import { toast } from "@components/3rdparty/ui/use-toast";
import { buildReferralLink, copyToClipboard } from "@lib/utils";
import ShareModal from "@components/ui/ShareModal";
import { useAuthStore } from "@components/user/auth/libs/useAuthStore";
import { useUI } from "@stores/useStore";

interface ReferralLinkCardComponentProps {
  className?: string;
  onShare?: () => void;
}

export default function ReferralLinkCardComponent({
  className,
  onShare: onShareExternal,
}: ReferralLinkCardComponentProps) {
  const [copied, setCopied] = useState(false);
  const { activeAuditor } = useAuthStore();
  const { setShareModalOpen } = useUI();
  const referralLink = buildReferralLink(activeAuditor?.referral_code!);
  const defaultMessage = `You can now safely handle all your real estate deals here: ${referralLink}`;

  const handleCopy = async () => {
    try {
      await copyToClipboard(referralLink);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    if (onShareExternal) {
      onShareExternal();
    } else if (navigator.share) {
      navigator
        .share({
          title: "Join Veriprops Trust Network",
          text: "Join me on Veriprops and help build a trusted property marketplace!",
          url: referralLink,
        })
        .catch(() => {
          // User cancelled or share failed
        });
    } else {
      handleCopy();
    }
  };

  return (
    <Card className={className}>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Your Referral Link
          </h3>
          <p className="text-sm text-muted-foreground">
            Share this link with people you trust to invite them to the network
          </p>
        </div>

        <div className="flex gap-2">
          <Input value={referralLink} readOnly className="flex-1" />
          {/* <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            className="shrink-0"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleShare}
            className="shrink-0"
          >
            <Share2 className="h-4 w-4" />
          </Button> */}
        </div>

        <div className="flex gap-2">
          <Button className="flex-1" onClick={handleCopy}>
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
            Copy Link
          </Button>
          <Button
            variant="secondary"
            className="flex-1"
            onClick={setShareModalOpen.bind(null, true)}
          >
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
      <ShareModal extLink={referralLink} defaultMessage={defaultMessage} />
    </Card>
  );
}
