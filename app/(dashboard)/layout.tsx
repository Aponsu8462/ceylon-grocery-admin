import { Toaster } from "sonner";
import ModalProvider from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";

interface DashBoardLayoutProps {
    children: React.ReactNode
}

const DashBoardLayout = async ({ children }: DashBoardLayoutProps) => {

  return (
  
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProvider>
   
  );
};

export default DashBoardLayout;