"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Blocks } from "lucide-react";
import Link from "next/link";

import useSWR from "swr";
import programService from "@/services/program.service";
import { IProgram } from "@/models/programs";
import { PROGRAMS_LIST } from "@/constants/fetch-keys";
import { Badge } from "@/components/ui/badge";

import ProgramsSkeleton from "./programs-skeleton";
import NoContent from "@/components/ui/no-content";

const ProgramsList = () => {
  const {
    data: programs,
    isLoading: isProgramsLoading,
    error: programsError,
  } = useSWR<IProgram[]>(PROGRAMS_LIST, () => programService.getPrograms());

  const isProgramActive = (program: IProgram): boolean => {
    let today = new Date();
    let startDate = new Date(program.start_date);
    let endDate = new Date(program.end_date);

    return today >= startDate && today <= endDate;
  };

  if (isProgramsLoading) {
    return <ProgramsSkeleton />;
  }

  if (programsError) {
    return <div>Error: {programsError.message}</div>;
  }

  if (programs?.length === 0) {
    return <NoContent>No programs found</NoContent>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {programs?.map((program, indx) => (
        <Link href={`/programs/${program.id}/courses`} key={indx}>
          <Card className="shadow-none rounded-md">
            <CardHeader
              style={{
                backgroundImage: `url(${program.image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className=" flex flex-col justify-end h-20">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-sidebar-primary-foreground shadow-md">
                  <Blocks className="size-4 " />
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-2">
              <h4 className="font-normal mt-4">{program.name}</h4>
              {isProgramActive(program) ? (
                <Badge className="mt-2">Active</Badge>
              ) : (
                <Badge variant="destructive" className="mt-2">
                  Inactive
                </Badge>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ProgramsList;
