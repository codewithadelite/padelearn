import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import MaterialsList from "@/components/shared/courses/materials/materials-list";
import AddMaterialModal from "@/components/shared/courses/materials/add-material-modal";
import DocumnetsQuizToggle from "@/components/shared/courses/documents-quiz-toggle";

export default function Materials() {
  return (
    <>
      <header className="flex h-16 border-b mb-4 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center justify-between w-full gap-2 px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h3 className="text-md font-bold">Materials</h3>
          </div>
          <AddMaterialModal />
        </div>
      </header>
      <div className="w-full px-4 sm:px-6 md:px-4 lg:px-20 ">
        <div className="mb-6">
          <DocumnetsQuizToggle activeTab="documents" />
        </div>
        <MaterialsList />
      </div>
    </>
  );
}
