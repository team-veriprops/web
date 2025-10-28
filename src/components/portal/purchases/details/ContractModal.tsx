import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@3rdparty/ui/dialog';
import { Button } from '@3rdparty/ui/button';
import { ScrollArea } from '@3rdparty/ui/scroll-area';
import { Separator } from '@3rdparty/ui/separator';
import { PenTool, Download, CheckCircle, FileText } from 'lucide-react';
import { useToast } from '@hooks/use-toast';
import { useTransactionStore } from '@components/portal/transactions/libs/useTransactionStore';

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: any // Transaction;
}

const MOCK_CONTRACT_TEXT = `
PROPERTY PURCHASE AGREEMENT

This Property Purchase Agreement ("Agreement") is entered into on this day between:

SELLER: {{sellerName}}
Address: {{sellerAddress}}
Phone: {{sellerPhone}}
Email: {{sellerEmail}}

BUYER: {{buyerName}}  
Address: {{buyerAddress}}
Phone: {{buyerPhone}}
Email: {{buyerEmail}}

PROPERTY DESCRIPTION:
Property Title: {{propertyTitle}}
Location: {{propertyLocation}}
Property ID: {{propertyId}}

FINANCIAL TERMS:
Total Purchase Price: {{totalAmount}}
Escrow Deposit: {{escrowAmount}}
Platform Fee: {{platformFee}}

TERMS AND CONDITIONS:

1. PURCHASE PRICE AND PAYMENT
The total purchase price for the Property is {{totalAmount}} Nigerian Naira. The Buyer has deposited {{escrowAmount}} into the Veriprops escrow account (Reference: {{escrowRef}}) as earnest money.

2. ESCROW PROTECTION
All funds are held securely in escrow by Veriprops until all conditions of this agreement are satisfied. Funds will only be released upon successful completion of all verification processes and mutual agreement of both parties.

3. PROPERTY VERIFICATION
Veriprops will conduct thorough verification of all property documents including but not limited to:
- Certificate of Occupancy
- Survey Plans
- Building Approval
- Title Documents

4. CLOSING CONDITIONS
This agreement is contingent upon:
- Satisfactory property verification
- Clear title confirmation
- Building inspection (if applicable)
- Legal document review

5. DEFAULT AND REMEDIES
In case of default by either party, the matter shall be resolved according to Nigerian property law and this platform's dispute resolution process.

6. DISPUTE RESOLUTION
Any disputes arising from this agreement shall first be addressed through Veriprops mediation service. If unresolved, matters will proceed to arbitration under Nigerian law.

7. GOVERNING LAW
This agreement shall be governed by the laws of the Federal Republic of Nigeria.

By signing below, both parties acknowledge they have read, understood, and agree to be bound by the terms of this agreement.

SELLER SIGNATURE: _________________________ DATE: _____________
{{sellerName}}

BUYER SIGNATURE: _________________________ DATE: _____________  
{{buyerName}}

WITNESS: _________________________
Veriprops Platform Representative

Agreement ID: {{transactionId}}
Generated: {{currentDate}}
`;

export function ContractModal({ isOpen, onClose, transaction }: ContractModalProps) {
  const [isSigning, setIsSigning] = useState(false);
  // const { signContract } = useTransactionStore();
  const { toast } = useToast();

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getContractText = () => {
    return MOCK_CONTRACT_TEXT
      .replace(/{{sellerName}}/g, transaction.seller.name)
      .replace(/{{sellerPhone}}/g, transaction.seller.phone)
      .replace(/{{sellerEmail}}/g, transaction.seller.email)
      .replace(/{{sellerAddress}}/g, transaction.property.location)
      .replace(/{{buyerName}}/g, transaction.buyer.name)
      .replace(/{{buyerPhone}}/g, transaction.buyer.phone)
      .replace(/{{buyerEmail}}/g, transaction.buyer.email)
      .replace(/{{buyerAddress}}/g, 'Lagos, Nigeria')
      .replace(/{{propertyTitle}}/g, transaction.property.title)
      .replace(/{{propertyLocation}}/g, transaction.property.location)
      .replace(/{{propertyId}}/g, transaction.property.id)
      .replace(/{{totalAmount}}/g, formatAmount(transaction.amount.total))
      .replace(/{{escrowAmount}}/g, formatAmount(transaction.amount.escrow))
      .replace(/{{platformFee}}/g, formatAmount(transaction.amount.fees))
      .replace(/{{escrowRef}}/g, transaction.escrowRef)
      .replace(/{{transactionId}}/g, transaction.id)
      .replace(/{{currentDate}}/g, new Date().toLocaleDateString());
  };

  const handleSign = async () => {
    setIsSigning(true);
    
    // Simulate signing process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // signContract(transaction.id);
    setIsSigning(false);
    
    toast({
      title: "Contract Signed Successfully",
      description: "Your digital signature has been recorded and the contract is now legally binding.",
    });
    
    onClose();
  };

  const handleDownload = () => {
    // Simulate PDF download
    toast({
      title: "Contract Downloaded",
      description: "The contract has been saved to your downloads folder.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Property Purchase Agreement
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full">
          {/* Contract Status */}
          <div className="mb-4 p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {transaction.contractSigned ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="font-medium text-success">Contract Signed</span>
                  </>
                ) : (
                  <>
                    <PenTool className="w-5 h-5 text-warning" />
                    <span className="font-medium text-warning">Awaiting Signature</span>
                  </>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Contract Text */}
          <ScrollArea className="flex-1 border rounded-lg p-4 bg-background">
            <div className="font-mono text-sm whitespace-pre-line">
              {getContractText()}
            </div>
          </ScrollArea>

          {/* Actions */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              Transaction ID: {transaction.id}
            </div>
            
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              
              {!transaction.contractSigned && (
                <Button 
                  onClick={handleSign}
                  disabled={isSigning}
                  className="bg-gradient-primary hover:bg-primary-dark"
                >
                  {isSigning ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 mr-2"
                    >
                      ⚪
                    </motion.div>
                  ) : (
                    <PenTool className="w-4 h-4 mr-2" />
                  )}
                  {isSigning ? 'Signing...' : 'Sign Contract'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
