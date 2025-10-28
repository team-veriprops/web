import { create } from "zustand";
import { PurchaseDetailService } from "./purchase-detail-service";
import { httpClient } from "containers";
import { createJSONStorage, persist } from "zustand/middleware";

interface PurchaseDetailStore {
  service: PurchaseDetailService; // runtime only (not persisted)
  showReceipt: boolean;
  setShowReceipt: (showReceipt: boolean) => void
}

// runtime service instance (not persisted)
const service = new PurchaseDetailService(httpClient);

export const usePurchaseDetailStore = create<PurchaseDetailStore>()(
  persist(
    (set) => ({
      service,
      showReceipt: false,
      setShowReceipt: (showReceipt: boolean) => set({ showReceipt }),
    }),
    {
      name: "veriprops-purchase_details", // localStorage key
      storage: createJSONStorage(() => localStorage), // hydration-safe
      // Persist skips service
      partialize: (state: { showReceipt: boolean }) => ({
        showReceipt: state.showReceipt,
      }),
    }
  )
);
