"use client";

import React, { useCallback, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { FilePlus, BrainCog, Check, CloudUpload } from "lucide-react";

import { mutate } from "swr";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { MATERIALS_LIST } from "@/constants/fetch-keys";
import { ICourseMaterial } from "@/models/courses";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

import { useToast } from "@/hooks/use-toast";
import { useDropzone } from "react-dropzone";
import { ROLES } from "@/constants/authentication";
import withAuth from "@/hoc/with-auth";

import LoadingSpinner from "@/components/ui/loading-spinner";

import coursesService from "@/services/courses.service";

function AddMaterialModal() {
  const params: { id: string } = useParams();

  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [generateQuiz, setGenerateQuiz] = useState(false);

  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: any) => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  const uploadDocument = async (e: any) => {
    e.preventDefault();

    if (!file) {
      toast({
        title: "Error",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    if (!name) {
      toast({
        title: "Error",
        description: "Please enter a name for the document.",
        variant: "destructive",
      });
      return;
    }

    let data = new FormData();
    data.append("name", name);
    data.append("document", file);
    data.append("generate_quiz", JSON.stringify(generateQuiz));

    try {
      setIsLoading(true);
      await coursesService.addCourseMaterial(parseInt(params.id), data);
      mutate<ICourseMaterial[]>(MATERIALS_LIST(params.id));
      toast({
        title: "Success",
        description: "Document added successfully.",
      });
      setIsLoading(false);
      setFile(null);
      setOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.detail,
      });
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span>New material</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-xs p-4 sm:max-w-sm sm:p-4 md:max-w-md md:p-6 lg:max-w-lg lg:p-8 xl:max-w-xl xl:p-10 2xl:max-w-2xl 2xl:p-12">
        <DialogHeader>
          <DialogTitle>Add material</DialogTitle>
        </DialogHeader>
        <div
          {...getRootProps()}
          className="w-100 h-32 flex justify-center items-center rounded-md border-dashed cursor-pointer border-gray-400 border-2"
        >
          <div>
            <input {...getInputProps()} />
            {isDragActive ? (
              <div className="flex flex-col items-center">
                <div className="bg-gray-200 flex justify-center items-center w-10 h-10 rounded-full">
                  <CloudUpload className="w-5 h-5 text-gray-800" />
                </div>
                <span className="font-bold text-sm text-gray-800 mt-2">
                  Drop the files here ...
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                {file ? (
                  <div className="flex flex-col items-center ">
                    <div className="bg-emerald-500 flex justify-center items-center w-10 h-10 rounded-full">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm text-dark">{file.name}</span>
                  </div>
                ) : (
                  <>
                    <div className="bg-gray-200 flex justify-center items-center w-10 h-10 rounded-md">
                      <FilePlus className="w-5 h-5 text-gray-800" />
                    </div>
                    <span className="font-bold text-sm text-gray-800 mt-2">
                      Upload Document
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <Input
          name="name"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="flex items-center space-x-3">
            {/* AI Icon */}
            <BrainCog className="h-6 w-6 text-emerald-500" />
            <div className="space-y-0.5">
              <label className="text-base font-semibold">Generate Quiz</label>
              <p className="text-sm text-muted-foreground">
                Generate multiple-choice quiz for this document with AI. <br />
                <span className="text-sm text-orange-500">
                  (This feature is currently in free)
                </span>
              </p>
            </div>
          </div>
          <Switch
            checked={generateQuiz}
            onCheckedChange={() => setGenerateQuiz(!generateQuiz)}
          />
        </div>

        <DialogFooter>
          <Button color="primary" type="submit" onClick={uploadDocument}>
            {isLoading ? <LoadingSpinner /> : "Add document"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default withAuth(AddMaterialModal, ROLES.TRAINER);
