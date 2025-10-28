"use client";

import { Sheet, SheetContent, SheetTitle } from "@components/3rdparty/ui/sheet";
import { usePurchaseStore } from "../libs/usePurchaseStore";
import { Badge } from "@components/3rdparty/ui/badge";
import {
  CreditCard,
  Download,
  ExternalLink,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { usePurchaseDetailQueries } from "./libs/usePurchaseDetailQueries";
import { motion } from "framer-motion";
import { Button } from "@components/3rdparty/ui/button";
import { Card } from "@components/3rdparty/ui/card";
import { TransactionTimeline } from "./TransactionTimeline";
import { ReceiptModal } from "./ReceiptModal";
import { formatMoney } from "@lib/utils";
import { usePurchaseDetailStore } from "./libs/usePurchaseDetailStore";
import { TransactionStatus, EscrowStatus } from "./models";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AsyncStateComponent } from "@components/ui/AsyncStateComponent";
import DetailDrawer, { DetailDrawerWidth } from "@components/ui/DetailDrawer";
import Image from "next/image";

/** Helpers */
const getStatusColor = (status: TransactionStatus): string => {
  const colors: Record<TransactionStatus, string> = {
    initiated: "bg-muted text-muted-foreground",
    pending: "bg-warning text-warning-foreground",
    contract_signed: "bg-accent text-accent-foreground",
    completed: "bg-success text-success-foreground",
    cancelled: "bg-destructive text-destructive-foreground",
    failed: "bg-destructive text-destructive-foreground",
  };
  return colors[status];
};

const getEscrowStatusColor = (status: EscrowStatus): string => {
  const colors: Record<EscrowStatus, string> = {
    awaiting_funding: "text-warning border-warning bg-warning/10",
    funds_secured:
      "text-escrow-secured border-escrow-secured bg-escrow-secured/10",
    released: "text-primary border-primary bg-primary/10",
    refunded: "text-muted-foreground border-muted bg-muted/10",
  };
  return colors[status];
};

/** Main Component */
export default function PurchaseDetailComponent() {
  const {
    viewPurchaseDetail,
    setViewPurchaseDetail,
    currentPurchase,
    setCurrentPurchase,
  } = usePurchaseStore();
  const { showReceipt, setShowReceipt } = usePurchaseDetailStore();
  const { useGetPurchaseDetail } = usePurchaseDetailQueries();

  const {
    data: purchaseDetail,
    isLoading,
    isError,
  } = useGetPurchaseDetail(currentPurchase?.id!);

  return (
    <DetailDrawer
          open={viewPurchaseDetail}
          onOpenChange={(open) => {
            setViewPurchaseDetail(false);
            if (!open) {
              // Delay clearing until AFTER exit animation finishes
              setTimeout(() => setCurrentPurchase(null), 300);
            }
          }}
          title="Purchase Details"
          reference={currentPurchase?.id!}
          drawerWidth={DetailDrawerWidth.LARGE}
        >
        <AsyncStateComponent
          isLoading={isLoading}
          isError={isError}
          data={purchaseDetail}
          loadingText="Loading purchase details..."
          errorText="Failed to load purchase details, please try again later."
          emptyText="No purchase details found."
        >
          {() => (
            <div className="min-h-screen bg-background p-4 md:p-8">
              <div className="max-w-5xl mx-auto space-y-8">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* ===== Main Content ===== */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* --- Property Information --- */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Card className="overflow-hidden">
                        <div className="relative h-48 md:h-64">
                          <Image
                            src={purchaseDetail?.property.thumbnail!}
                            alt={purchaseDetail?.property.title!}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <h2 className="text-xl font-bold mb-2">
                              {purchaseDetail?.property.title}
                            </h2>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{purchaseDetail?.property.location}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Property details */}
                            <div>
                              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                Property Details
                              </h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    Property ID:
                                  </span>
                                  <span className="font-medium">
                                    {purchaseDetail?.property.id}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    Type:
                                  </span>
                                  <span className="font-medium">
                                    Residential
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Financial details */}
                            <div>
                              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                                <CreditCard className="w-4 h-4" />
                                Financial Details
                              </h3>
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    Total:
                                  </span>
                                  <span className="font-bold text-lg">
                                    {formatMoney(purchaseDetail?.amount.total!)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    Escrow:
                                  </span>
                                  <span className="font-medium">
                                    {formatMoney(purchaseDetail?.amount.escrow!)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-muted-foreground">
                                    Fees:
                                  </span>
                                  <span className="font-medium">
                                    {formatMoney(purchaseDetail?.amount.fees!)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>

                    {/* --- Participants --- */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Card className="p-6">
                        <h3 className="font-semibold text-foreground mb-4">
                          Transaction Participants
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Buyer */}
                          <div className="space-y-3">
                            <h4 className="font-medium text-primary flex items-center gap-2">
                              <User className="w-4 h-4" /> Buyer
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="font-medium">
                                {purchaseDetail?.buyer.name}
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="w-3 h-3" />
                                <span>{purchaseDetail?.buyer.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="w-3 h-3" />
                                <span>{purchaseDetail?.buyer.phone}</span>
                              </div>
                            </div>
                          </div>

                          {/* Seller */}
                          <div className="space-y-3">
                            <h4 className="font-medium text-accent flex items-center gap-2">
                              <User className="w-4 h-4" /> Seller
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="font-medium">
                                {purchaseDetail?.seller.name}
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Mail className="w-3 h-3" />
                                <span>{purchaseDetail?.seller.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Phone className="w-3 h-3" />
                                <span>{purchaseDetail?.seller.phone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>

                    {/* --- Timeline --- */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Card className="p-6">
                        <TransactionTimeline purchaseDetail={purchaseDetail!} />
                      </Card>
                    </motion.div>
                  </div>

                  {/* ===== Sidebar ===== */}
                  <div className="space-y-6">
                    {/* Escrow */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Card className="p-6 text-center space-y-4">
                        <Shield className="w-12 h-12 mx-auto text-escrow-secured" />
                        <h3 className="font-semibold text-foreground">
                          Escrow Protection
                        </h3>
                        <Badge
                          variant="outline"
                          className={`${getEscrowStatusColor(purchaseDetail?.escrow_status!)} font-medium`}
                        >
                          {purchaseDetail?.escrow_status
                            .replace("_", " ")
                            .toUpperCase()}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          <p>Reference: {purchaseDetail?.escrow_ref}</p>
                          <p className="mt-2">
                            Your funds are securely held in escrow until all
                            conditions are met.
                          </p>
                        </div>
                      </Card>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Card className="p-6 space-y-3">
                        <h3 className="font-semibold text-foreground mb-4">
                          Quick Actions
                        </h3>
                        {purchaseDetail?.status ===
                          TransactionStatus.COMPLETED && (
                          <Button
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => setShowReceipt(true)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Receipt
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Property Listing
                        </Button>
                      </Card>
                    </motion.div>

                    {/* Documents */}
                    {purchaseDetail?.documents?.length! > 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Card className="p-6 space-y-2">
                          <h3 className="font-semibold text-foreground mb-4">
                            Documents
                          </h3>
                          {purchaseDetail?.documents.map((doc, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 bg-muted rounded-lg"
                            >
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                  {doc}
                                </span>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Download className="w-3 h-3" />
                              </Button>
                            </div>
                          ))}
                        </Card>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>

              {/* ===== Modals ===== */}
              <ReceiptModal
                isOpen={showReceipt}
                onClose={() => setShowReceipt(false)}
                purchaseDetail={purchaseDetail!}
              />
              <div className="pb-8"></div>
            </div>
          )}
        </AsyncStateComponent>
    </DetailDrawer>
  );
}
