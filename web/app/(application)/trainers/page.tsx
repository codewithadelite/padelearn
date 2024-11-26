import { AppSidebar } from "@/components/shared/navigation/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import TrainersList from "@/components/shared/trainers/trainers-list";
import AddTrainerModal from "@/components/shared/trainers/add-trainers-modal";

export default function Trainers() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 border-b mb-4 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center justify-between w-full gap-2 px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <h3 className="text-md font-bold">Programs</h3>
            </div>
            <AddTrainerModal />
          </div>
        </header>
        <div className=" w-full px-4">
          <TrainersList />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
