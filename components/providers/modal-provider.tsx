"use client";

import { useEffect, useState } from "react";
import { ProductModal } from "../modals/update-product-modal";
import { CategoryModal } from "../modals/update-category-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }
  return (
    <>
      <ProductModal />
      <CategoryModal />
    </>
  );
};

export default ModalProvider;
