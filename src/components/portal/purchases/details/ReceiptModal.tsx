import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@3rdparty/ui/dialog';
import { Button } from '@3rdparty/ui/button';
import { Separator } from '@3rdparty/ui/separator';
import { Download, Receipt, CheckCircle, Building } from 'lucide-react';
import { useToast } from '@hooks/use-toast';
import { QueryPurchaseDetailDto } from './models';
import { convertMoney, formatMoney } from '@lib/utils';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchaseDetail: QueryPurchaseDetailDto;
}

export function ReceiptModal({ isOpen, onClose, purchaseDetail }: ReceiptModalProps) {
  const { toast } = useToast();

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleDownload = () => {
    // Simulate PDF download
    toast({
      title: "Receipt Downloaded",
      description: "Transaction receipt has been saved to your downloads folder.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Transaction Receipt
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Building className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Veriprops</h2>
            </div>
            <p className="text-muted-foreground">Verified Property Transactions</p>
            <div className="flex items-center justify-center gap-2 text-success">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Transaction Completed</span>
            </div>
          </div>

          <Separator />

          {/* Transaction Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Transaction ID:</span>
                <div className="font-mono font-medium">{purchaseDetail.id}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Date Completed:</span>
                <div className="font-medium">{purchaseDetail.date_updated}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Escrow Reference:</span>
                <div className="font-mono font-medium">{purchaseDetail.escrow_ref}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <div className="font-medium text-success">COMPLETED</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Property Details */}
          <div className="space-y-3">
            <h3 className="font-semibold">Property Information</h3>
            <div className="bg-muted p-4 rounded-lg">
              <div className="font-medium">{purchaseDetail.property.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{purchaseDetail.property.location}</div>
              <div className="text-xs text-muted-foreground mt-2">Property ID: {purchaseDetail.property.id}</div>
            </div>
          </div>

          <Separator />

          {/* Participants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-primary mb-2">Buyer</h4>
              <div className="space-y-1">
                <div>{purchaseDetail.buyer.name}</div>
                <div className="text-muted-foreground">{purchaseDetail.buyer.email}</div>
                <div className="text-muted-foreground">{purchaseDetail.buyer.phone}</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-accent mb-2">Seller</h4>
              <div className="space-y-1">
                <div>{purchaseDetail.seller.name}</div>
                <div className="text-muted-foreground">{purchaseDetail.seller.email}</div>
                <div className="text-muted-foreground">{purchaseDetail.seller.phone}</div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Financial Summary */}
          <div className="space-y-3">
            <h3 className="font-semibold">Financial Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Property Price:</span>
                <span className="font-medium">{formatMoney(convertMoney(purchaseDetail.amount.total).minus(convertMoney(purchaseDetail.amount.fees)))}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform Fee:</span>
                <span className="font-medium">{formatMoney(purchaseDetail.amount.fees)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount:</span>
                <span className="text-primary">{formatMoney(purchaseDetail.amount.total)}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground space-y-1">
            <p>This receipt confirms the successful completion of your property purchaseDetail.</p>
            <p>All funds have been processed through our secure escrow system.</p>
            <p>For support, contact: support@veriprops.com | +234 (0) 1 234 5678</p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleDownload} className="bg-gradient-primary hover:bg-primary-dark">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
