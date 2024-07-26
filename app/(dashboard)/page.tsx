"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductList from "./_components/product-list";
import CategoryList from "./_components/category-list";

const DashboardPage = () => {
  return (
    <div className="p-5 sm:p-10 bg-neutral-700 min-h-screen">
      <Tabs defaultValue="products" className="w-full">
        <TabsList className="flex justify-center mb-4">
          <TabsTrigger
            value="products"
            className="px-4 py-2 mx-2 bg-white text-gray-800 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-blue-50 transition"
          >
            Products
          </TabsTrigger>
          <TabsTrigger
            value="categories"
            className="px-4 py-2 mx-2 bg-white text-gray-800 rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 hover:bg-blue-50 transition"
          >
            Categories
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="products"
          className="bg-white p-5 rounded-b-lg shadow"
        >
          <ProductList />
        </TabsContent>
        <TabsContent
          value="categories"
          className="bg-white p-5 rounded-b-lg shadow"
        >
          <CategoryList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
