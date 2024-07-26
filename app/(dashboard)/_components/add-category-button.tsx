// "use client";

// import { Button } from "@/components/ui/button";
// import { useCategoryModal } from "@/hooks/use-category-modal";
// import { PlusIcon } from "lucide-react";

// const AddCategoryButton = () => {
//   const categoryModal = useCategoryModal();

//   return (
//     <Button
//       className="flex items-center space-x-2 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
//       variant="default"
//       size="lg"
//       onClick={() => categoryModal.onOpen("create")}
//     >
//       <PlusIcon className="w-5 h-5" />
//       <span>Add New Category</span>
//     </Button>
//   );
// };

// export default AddCategoryButton;

"use client";

import { Button } from "@/components/ui/button";
import { useCategoryModal } from "@/hooks/use-category-modal";
import { PlusIcon } from "lucide-react";

const AddCategoryButton = () => {
  const categoryModal = useCategoryModal();

  return (
    <Button
      className="flex items-center space-x-2 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105"
      variant="default"
      size="lg"
      onClick={() => categoryModal.onOpen("create")}
    >
      <PlusIcon className="w-5 h-5" />
      <span>Add New Category</span>
    </Button>
  );
};

export default AddCategoryButton;
