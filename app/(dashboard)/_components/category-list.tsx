// "use client";

// import Loader from "@/components/Loader";
// import React from "react";

// import { useQuery } from "@tanstack/react-query";
// import { fetcher } from "@/lib/fetcher";
// import AddCategoryButton from "./add-category-button";
// import CategoryTable from "./category-table";

// const CategoryList = () => {
//   const { data: categories, isLoading } = useQuery<string[]>({
//     queryKey: ["categories-all"],
//     queryFn: () => fetcher({ url: "/fetch/category" }),
//   });

//   return (
//     <div className="flex flex-col items-center mt-5 sm:mt-10 space-y-5 w-full">
//       <AddCategoryButton />
//       {isLoading && <Loader />}
//       {categories && !isLoading && <CategoryTable categories={categories} />}
//     </div>
//   );
// };

// export default CategoryList;

"use client";

import Loader from "@/components/Loader";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import AddCategoryButton from "./add-category-button";
import CategoryTable from "./category-table";

const CategoryList = () => {
  const { data: categories, isLoading } = useQuery<string[]>({
    queryKey: ["categories-all"],
    queryFn: () => fetcher({ url: "/fetch/category" }),
  });

  return (
    <div className="flex flex-col items-center mt-5 sm:mt-10 space-y-5 w-full">
      <AddCategoryButton />
      {isLoading && <Loader />}
      {categories && !isLoading && <CategoryTable categories={categories} />}
    </div>
  );
};

export default CategoryList;
