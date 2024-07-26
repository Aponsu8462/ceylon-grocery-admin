import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
  } from "@/components/ui/dialog";
import { useProductModal } from "@/hooks/use-product-modal";
  import { X } from "lucide-react";
import ProductForm from "./product-form";


  
  export const ProductModal = () => {
    const isOpen = useProductModal((state) => state.isOpen);
    const handleClose = useProductModal((state) => state.onClose);
    
  
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="w-[800px] max-h-[900px] flex flex-col bg-zinc-900 border-none ">
          <DialogHeader>
            <DialogTitle className="text-lg text-white  font-semibold">
              
            </DialogTitle>
          </DialogHeader>
          <DialogDescription hidden></DialogDescription>
          <DialogClose onClick={handleClose} className="absolute right-4 top-4 ">
            <X className="h-4 w-4 text-slate-100 transition ease-linear hover:text-slate-300 hover:scale-[1.1]" />
          </DialogClose>
          <ProductForm />
          
        </DialogContent>
      </Dialog>
    );
  };