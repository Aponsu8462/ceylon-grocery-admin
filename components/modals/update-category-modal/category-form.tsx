"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { toast } from "sonner";

const CategoryForm = () => {
  const action = useCategoryModal((state) => state.action);
  const categoryData = useCategoryModal((state) => state.category);
  const queryClient = useQueryClient();

  const title = action === "update" ? "Update Category" : "Add Category";
  const [category, setCategory] = useState<string>("");

  useEffect(() => {
    if (action === "update" && categoryData) {
      setCategory(categoryData);
    }
  }, []);

  const addCategoryMutation = useMutation({
    mutationFn: () =>
      fetcher({
        url: "/create/category",
        method: "POST",
        data: {
          name: category,
        },
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories-all"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (action === "create") {
      addCategoryMutation.mutate();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl text-neutral-800 font-semibold mb-6">{title}</h1>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Category Name</Label>
          <Input
            name="name"
            type="text"
            id="name"
            className="w-full h-12 rounded-md border border-gray-300 px-4"
            placeholder="Category name"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <Button type="submit" variant="default" className="w-full h-12">
          {title}
        </Button>
      </form>
    </div>
  );
};

export default CategoryForm;
