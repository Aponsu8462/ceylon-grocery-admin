"use client";

import { fetcher } from "@/lib/fetcher";
import { ProductType } from "@/types/productTypes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface RemoveProductProps {
  product: ProductType;
}

const RemoveProduct = ({ product }: RemoveProductProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () =>
      fetcher({
        url: "/delete/product",
        method: "DELETE",
        data: {
          pId: product._id,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products-all"] });
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="text-red-500 hover:text-red-700 focus:outline-none transition duration-150 ease-in-out transform hover:scale-110">
          <Trash2Icon size={16} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Product</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this product? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={() => mutation.mutate()}>
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveProduct;
