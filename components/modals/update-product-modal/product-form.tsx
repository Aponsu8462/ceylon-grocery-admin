"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProductModal } from "@/hooks/use-product-modal";
import { ProductType } from "@/types/productTypes";
import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const getChangedFields = <T extends Record<string, any>>(
  initial: T,
  current: T
): Partial<T> => {
  const changes: Partial<T> = {};
  for (const key in current) {
    if (current[key] !== initial[key]) {
      changes[key] = current[key];
    }
  }
  return changes;
};

const ProductForm = () => {
  const action = useProductModal((state) => state.action);
  const productData = useProductModal((state) => state.product);

  const queryClient = useQueryClient();
  const title = action === "update" ? "Update Product" : "Add Product";
  const { data: categories } = useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: () => fetcher({ url: "/fetch/category" }),
  });

  const [initialProduct, setInitialProduct] = useState<ProductType | null>(
    null
  );
  const [product, setProduct] = useState<ProductType>({
    name: "",
    price: 0.0,
    category: "",
    weight: "",
    inStock: false,
  });

  useEffect(() => {
    if (action === "update" && productData) {
      setProduct(productData);
      setInitialProduct(productData); // Track the initial state
    }
  }, [action, productData]);

  const addProductMutation = useMutation({
    mutationFn: () =>
      fetcher({
        url: "/create/product",
        method: "POST",
        data: {
          ...product,
        },
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products-all"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: () => {
      if (!initialProduct) {
        throw new Error("Initial product state is not set");
      }
      const changes = getChangedFields(initialProduct, product);
      return fetcher({
        url: "/update/product",
        method: "PATCH",
        data: {
          pId: product._id,
          fields: changes,
        },
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products-all"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (action === "create") {
      addProductMutation.mutate();
    } else if (action === "update") {
      updateProductMutation.mutate();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl text-neutral-800 font-semibold mb-6">{title}</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            name="name"
            type="text"
            id="name"
            className="w-full h-12 rounded-md border border-gray-300 px-4"
            placeholder="Product name"
            value={product.name}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            name="price"
            id="price"
            type="number"
            className="w-full h-12 rounded-md border border-gray-300 px-4"
            placeholder="Price"
            value={product.price}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                price: parseFloat(e.target.value),
              }))
            }
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            onValueChange={(value) =>
              setProduct((prevState) => ({ ...prevState, category: value }))
            }
            defaultValue={product.category}
          >
            <SelectTrigger className="w-full h-12 rounded-md border border-gray-300 px-4">
              <SelectValue
                id="category"
                placeholder={
                  product.category !== ""
                    ? product.category
                    : "Select a Category"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {categories &&
                categories.map((category, index) => (
                  <SelectItem key={index} value={category}>
                    {category}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="weight">Weight</Label>
          <Input
            name="weight"
            id="weight"
            type="text"
            className="w-full h-12 rounded-md border border-gray-300 px-4"
            placeholder="Weight"
            value={product.weight}
            onChange={(e) =>
              setProduct((prevState) => ({
                ...prevState,
                weight: e.target.value,
              }))
            }
          />
        </div>
        <div className="flex items-center space-x-4">
          <Label htmlFor="inStock">In Stock</Label>
          <RadioGroup
            onValueChange={(value) =>
              setProduct((prevState) => ({
                ...prevState,
                inStock: value === "yes",
              }))
            }
            value={product.inStock ? "yes" : "no"}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>
        </div>
        <Button type="submit" variant="default" className="w-full h-12">
          {title}
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;
