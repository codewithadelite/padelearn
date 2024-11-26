"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

import { Button } from "@/components/ui/button";

import useSWR from "swr";
import coursesService from "@/services/courses.service";
import { ICourseMaterial } from "@/models/courses";
import { MATERIALS_LIST } from "@/constants/fetch-keys";
import NoContent from "@/components/ui/no-content";
import MaterialsSkeleton from "@/components/shared/courses/materials/materials-skeleton";

import fileDownload from "js-file-download";

import { Download } from "lucide-react";
const MaterialsList = () => {
  const { id: courseId } = useParams();
  const {
    data: materials,
    isLoading: ismaterialLoading,
    error: materialsError,
  } = useSWR<ICourseMaterial[]>(MATERIALS_LIST(courseId as string), () =>
    coursesService.getCourseMaterials(courseId as string)
  );

  const downloadDocument = async (id: number) => {
    try {
      const res = await coursesService.downloadDocument(id);
      let filename = "download.pdf";
      fileDownload(res, filename);
    } catch (error) {
      console.log(error);
    }
  };

  if (ismaterialLoading) {
    return <MaterialsSkeleton />;
  }

  if (materialsError) {
    return <div>Error: {materialsError.detail}</div>;
  }

  if (!materials?.length) {
    return <NoContent>No materials found</NoContent>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {materials?.map((material, indx) => (
        <Link href="#" key={indx}>
          <div className="bg-gray-100 rounded-md w-full h-[200px] flex justify-center items-center mb-2">
            <Image
              src={`/images/file-icon.png`}
              alt={material.name}
              width={50}
              height={50}
            />
          </div>
          <div className="flex justify-between items-center px-1">
            <h4 className="font-normal mt-4 text-gray-600">{material.name}</h4>
            <div>
              <Button
                variant="outline"
                className="text-xs"
                onClick={() => downloadDocument(material.id)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MaterialsList;
