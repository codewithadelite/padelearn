"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Blocks } from "lucide-react";

import useSWR from "swr";
import coursesService from "@/services/courses.service";
import { ICourse } from "@/models/courses";
import { COURSES_LIST } from "@/constants/fetch-keys";
import CoursesSkeleton from "./courses-skeleton";

import NoContent from "@/components/ui/no-content";

const CoursesList = () => {
  const params: { id: string } = useParams();

  const {
    data: courses,
    isLoading: isCoursesLoading,
    error: coursesError,
  } = useSWR<ICourse[]>(COURSES_LIST(params.id), () =>
    coursesService.getProgramCourses(params.id)
  );

  if (isCoursesLoading) {
    return <CoursesSkeleton />;
  }

  if (coursesError) {
    return <div>Error: {coursesError.message}</div>;
  }

  if (courses?.length === 0) {
    return <NoContent>No courses found</NoContent>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {courses?.map((course, indx) => (
        <Link href={`/courses/${course.id}/materials`} key={indx}>
          <Card className="shadow-none rounded-md">
            <CardHeader
              style={{
                backgroundImage: `url(${course.image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className=" flex flex-col justify-end h-32">
                <div className="flex items-center justify-center w-8 h-8 rounded-md bg-primary text-sidebar-primary-foreground">
                  <Blocks className="size-4" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-2">
              <h4 className="font-normal mt-4">{course.name}</h4>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CoursesList;
