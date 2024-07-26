import { ProductType } from "@/types/productTypes";
import { create } from "zustand";

type ProductModalStore = {
  
  product?: ProductType;
  isOpen: boolean;
  action?: "update" | "create"; 
  onOpen: (action: "update" | "create", product?: ProductType) => void;
  onClose: () => void;
};

export const useProductModal = create<ProductModalStore>((set) => ({
  isOpen: false,
  action: undefined,
  product: undefined,
  onOpen: (action: "update" | "create", product?: ProductType) => {
    set({ isOpen: true, action, product });
  },
  onClose: () => set({ isOpen: false, product: undefined, action: undefined }),
}));
