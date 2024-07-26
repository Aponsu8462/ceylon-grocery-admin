"use client";

import { Button } from "@/components/ui/button";
import { useProductModal } from "@/hooks/use-product-modal";
import { PlusIcon } from "lucide-react";

const AddProductButton = () => {
  const productModal = useProductModal();

  return (
    <Button
      className="flex items-center space-x-2 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
      variant="default"
      size="lg"
      onClick={() => productModal.onOpen("create")}
    >
      <PlusIcon className="w-5 h-5" />
      <span>Add New Product</span>
    </Button>
  );
};

export default AddProductButton;
