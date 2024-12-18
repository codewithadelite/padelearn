"use client";

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import ErrorDisplayer from "@/components/ui/error";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Download, Eye, EllipsisVertical } from "lucide-react";

import useSWR from "swr";
import coursesService from "@/services/courses.service";
import { ICourseMaterial } from "@/models/courses";
import { MATERIALS_LIST } from "@/constants/fetch-keys";
import NoContent from "@/components/ui/no-content";
import MaterialsSkeleton from "@/components/shared/courses/materials/materials-skeleton";

import fileDownload from "js-file-download";

import DeleteMaterial from "./delete-material";
const MaterialsList = () => {
  const { id: courseId } = useParams();
  const {
    data: materials,
    isLoading: ismaterialLoading,
    error: materialsError,
  } = useSWR<ICourseMaterial[]>(MATERIALS_LIST(courseId as string), () =>
    coursesService.getCourseMaterials(courseId as string)
  );

  const viweDocument = async (id: number) => {
    try {
      const res = await coursesService.downloadDocument(id);

      // Create a Blob from the response data
      const blob = new Blob([res], { type: "application/pdf" });

      // Generate a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Open the URL in a new tab
      window.open(url, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  const downloadDocument = async (id: number, name: string) => {
    try {
      const res = await coursesService.downloadDocument(id);
      let filename = `${name}.pdf`;
      fileDownload(res, filename);
    } catch (error) {
      console.log(error);
    }
  };

  if (ismaterialLoading) {
    return <MaterialsSkeleton />;
  }

  if (materialsError) {
    return (
      <ErrorDisplayer
        title="Permission Denied"
        message={`${materialsError.detail} Please contact your administrator.`}
      />
    );
  }

  if (!materials?.length) {
    return <NoContent>No materials found</NoContent>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {materials?.map((material, indx) => (
        <div key={indx}>
          <div className="bg-gray-100 rounded-lg w-full h-[200px] flex justify-center items-center mb-2">
            <Image
              src={`/images/pdf-icon.png`}
              alt={material.name}
              width={50}
              height={50}
            />
          </div>
          <div className="flex justify-between items-center px-1">
            <h4 className="font-normal mt-4 text-gray-600">{material.name}</h4>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <EllipsisVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => viweDocument(material.id)}>
                      <Eye />
                      <span>View</span>
                      <DropdownMenuShortcut>⇧⌘V</DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() =>
                        downloadDocument(material.id, material.name)
                      }
                    >
                      <Download />
                      <span>Download</span>
                      <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              <DeleteMaterial documentId={material.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MaterialsList;
