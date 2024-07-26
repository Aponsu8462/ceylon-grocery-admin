import { create } from "zustand";

type CategoryModalStore = {
  category?: string;
  isOpen: boolean;
  action?: "update" | "create";
  onOpen: (action: "update" | "create", category?: string) => void;
  onClose: () => void;
};

export const useCategoryModal = create<CategoryModalStore>((set) => ({
  isOpen: false,
  action: undefined,
  category: undefined,
  onOpen: (action: "update" | "create", category?: string) => {
    set({ isOpen: true, action, category });
  },
  onClose: () => set({ isOpen: false, category: undefined, action: undefined }),
}));
