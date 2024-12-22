"use client";

import { useParams } from "next/navigation";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import useSWR from "swr";
import programService from "@/services/program.service";
import { IProgram } from "@/models/programs";
import { PROGRAM } from "@/constants/fetch-keys";

import BackButton from "@/components/ui/back-button";
import CoursesList from "@/components/shared/courses/courses-list";
import AddCourseModal from "@/components/shared/courses/add-course-modal";

import { Skeleton } from "@/components/ui/skeleton";

export default function Programs() {
  const params: { id: string } = useParams();

  const {
    data: program,
    isLoading: isProgramLoading,
    error: programsError,
  } = useSWR<IProgram>(PROGRAM(params.id), () =>
    programService.getProgram(params.id)
  );

  return (
    <>
      <header className="flex h-16 border-b mb-4 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center justify-between w-full gap-2 px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h3 className="text-md font-bold">Courses</h3>
          </div>
        </div>
      </header>
      <div className="w-full px-4 mb-4">
        <div className="flex flex-row items-center">
          <BackButton href="/programs" />
          <Separator orientation="vertical" className="mx-2 h-4" />
          {isProgramLoading ? (
            <Skeleton className="h-4 w-[250px]" />
          ) : (
            <h4 className="text-2xl py-6 font-bold">{program?.name}</h4>
          )}
        </div>
      </div>
      <div className="w-full px-4 sm:px-6 md:px-4 lg:px-20">
        <CoursesList />
      </div>
    </>
  );
}
