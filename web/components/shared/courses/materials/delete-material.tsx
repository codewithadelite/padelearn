import React, { useState } from "react";
import { useParams } from "next/navigation";
import withAuth from "@/hoc/with-auth";
import { ROLES } from "@/constants/authentication";
import { Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { mutate } from "swr";
import { MATERIALS_LIST } from "@/constants/fetch-keys";
import { ICourseMaterial } from "@/models/courses";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import coursesService from "@/services/courses.service";

interface IProps {
  documentId: number;
}

const DeleteMaterial = ({ documentId }: IProps) => {
  const [open, setOpen] = useState(false);
  const { id: courseId } = useParams();
  const { toast } = useToast();

  const handleDeleteDocument = async () => {
    try {
      await coursesService.deleteCourseMaterial(
        parseInt(courseId as string),
        documentId
      );
      mutate<ICourseMaterial[]>(
        MATERIALS_LIST(courseId as string),
        (prevData) => {
          if (!prevData) return;

          return prevData.filter((material) => material.id !== documentId);
        },
        false
      );
      toast({
        title: "Success",
        description: "Document deleted successfully.",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Error deleting document.",
      });
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        asChild
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <Button variant="destructive" className="mr-2">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            document.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteDocument()}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default withAuth(DeleteMaterial, ROLES.TRAINER);
