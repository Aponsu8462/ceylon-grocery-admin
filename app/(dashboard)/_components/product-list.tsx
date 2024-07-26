"use client";

import Loader from "@/components/Loader";
import ProductTable from "@/components/ProductTable";
import { ProductType } from "@/types/productTypes";
import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import AddProductButton from "./add-product-button";

const ProductList = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["products-all"],
    });
  }, []);
  const { data: products, isLoading } = useQuery<ProductType[]>({
    queryKey: ["products-all"],
    queryFn: () => fetcher({ url: "/fetch/product" }),
  });

  return (
    <div className="flex flex-col items-center mt-5 sm:mt-10 space-y-5 w-full">
      <AddProductButton />
      {isLoading && <Loader />}
      {products && !isLoading && <ProductTable products={products} />}
    </div>
  );
};

export default ProductList;
