import { AppSidebar } from "@/components/shared/navigation/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

import MaterialsList from "@/components/shared/courses/materials/materials-list";
import AddProgramModal from "@/components/shared/programs/add-program-modal";

export default function Materials() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 border-b mb-4 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-between w-full gap-2 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <h3 className="text-md font-bold">Materials</h3>
            </div>
            <AddProgramModal />
          </div>
        </header>
        <div className="w-full px-4 sm:px-6 md:px-4 lg:px-20 ">
          <MaterialsList />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
