"use client";
import React from "react";
import Link from "next/link";
import { Book, WandSparkles } from "lucide-react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

enum activeTabEnum {
  documents = "documents",
  quiz = "quiz",
}

interface IProps {
  activeTab: "documents" | "quiz";
}

const DocumnetsQuizToggle = ({ activeTab }: IProps) => {
  const { id: courseId } = useParams();
  return (
    <div className="flex gap-2 items-center">
      <Link href={`/courses/${courseId}/materials`}>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            activeTab === activeTabEnum.documents
              ? "bg-gray-800 text-white"
              : "",
            "text-sm py-5 px-14 rounded-3xl"
          )}
        >
          <Book className="h-4 w-4" />
          Documents
        </Button>
      </Link>
      <Link href={`/courses/${courseId}/quiz`}>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            activeTab === activeTabEnum.quiz ? "bg-gray-800 text-white" : "",
            "text-sm py-5 px-14 rounded-3xl"
          )}
        >
          <WandSparkles className="h-4 w-4" />
          Quiz
        </Button>
      </Link>
    </div>
  );
};

export default DocumnetsQuizToggle;
