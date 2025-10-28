import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@3rdparty/ui/dialog";
import { Button } from "@3rdparty/ui/button";
import { Label } from "@3rdparty/ui/label";
import { Input } from "@3rdparty/ui/input";
import { Textarea } from "@3rdparty/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@3rdparty/ui/select";
import { toast } from "@components/3rdparty/ui/use-toast";
import { CreateDisputeDto, DisputeType } from "./models";
import { useDisputeStore } from "./libs/useDisputeStore";
import { useDisputeQueries } from "./libs/useDisputeQueries";
import { useAuthStore } from "@components/user/auth/libs/useAuthStore";

export const RaiseDisputeModal = () => {
  const { newDisputeModalOpened, setNewDisputeModalOpened } = useDisputeStore();
  const { activeAuditor } = useAuthStore();
  const { useCreateDispute } = useDisputeQueries();

  const createDispute = useCreateDispute(activeAuditor?.id!);

  const [form, setForm] = useState({
    type: "" as DisputeType | "",
    relatedTxnId: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { type, description, relatedTxnId } = form;
    const trimmedDesc = description.trim();

    if (!type || !trimmedDesc) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (trimmedDesc.length > 300) {
      toast({
        title: "Description too long",
        description: "Please keep your description under 300 characters.",
        variant: "destructive",
      });
      return;
    }

    const newDispute: CreateDisputeDto = {
      type,
      related_tran_id: relatedTxnId.trim() || undefined,
      description: trimmedDesc,
    };

    setLoading(true);

    createDispute.mutate(newDispute, {
      onSuccess: () => {
        toast({
          title: "Dispute received",
          description: "Our team will review and respond within 48 hours.",
        });
        setForm({ type: "", relatedTxnId: "", description: "" });
        setNewDisputeModalOpened(false);
      },
      onError: (error) => {
        toast({
          title: "Error",
          description:
            error instanceof Error
              ? error.message
              : "Failed to submit dispute. Please try again.",
          variant: "destructive",
        });
      },
      onSettled: () => setLoading(false),
    });
  };

  return (
    <Dialog open={newDisputeModalOpened} onOpenChange={setNewDisputeModalOpened}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Raise a Dispute</DialogTitle>
          <DialogDescription>
            {"We'll help resolve issues quickly and fairly."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Dispute Type */}
          <div className="space-y-2">
            <Label htmlFor="type">
              Dispute Type <span className="text-destructive">*</span>
            </Label>
            <Select
              value={form.type}
              onValueChange={(v) => setForm((prev) => ({ ...prev, type: v as DisputeType }))}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {["Earning", "Referral", "Property", "Payment", "Other"].map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Related Transaction */}
          <div className="space-y-2">
            <Label htmlFor="txn">Related Transaction ID (Optional)</Label>
            <Input
              id="txn"
              placeholder="e.g., TXN-101"
              value={form.relatedTxnId}
              onChange={handleChange("relatedTxnId")}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Explain the issue in a few lines..."
              value={form.description}
              onChange={handleChange("description")}
              rows={5}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground text-right">
              {form.description.length}/300
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setNewDisputeModalOpened(false)}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !form.type || !form.description.trim()}
              className="flex-1"
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
