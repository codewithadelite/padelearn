"use client";

import * as React from "react";
import { Eye, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import useSWR from "swr";

import { QUIZ_REVIEW } from "@/constants/fetch-keys";
import { IQuizReviewResponse } from "@/models/quiz";
import QuizService from "@/services/quiz";

interface QuizCorrectionProps {
  quizId: number;
}

export function QuizCorrection({ quizId }: QuizCorrectionProps) {
  const {
    data: quizReview,
    error,
    isLoading,
  } = useSWR<IQuizReviewResponse[]>(QUIZ_REVIEW(quizId), () =>
    QuizService.getQuizReview(quizId)
  );
  if (error) {
    console.error("Error fetching quiz review:", error);
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="default" size={"sm"}>
          <Eye className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[75vh] lg:h-[90vh] w-full p-4 bg-white shadow-md rounded-lg">
        <div className="w-full">
          <DrawerHeader className="sticky top-0 z-10 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <DrawerTitle>Correction</DrawerTitle>
                <DrawerDescription>Your quiz correction.</DrawerDescription>
              </div>
              <DrawerClose asChild>
                <button className="p-1 text-gray-500 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300">
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </button>
              </DrawerClose>
            </div>
          </DrawerHeader>
          <div className="p-4 sm:p-6 md:p-8 pb-4 sm:pb-6 md:pb-8">
            {isLoading ? (
              <div>Loading review...</div>
            ) : quizReview ? (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {quizReview.map((questionItem, index) => (
                  <div key={index} className="p-4 border rounded-lg mb-4">
                    <div className="font-semibold text-lg mb-2">
                      Question {index + 1}: {questionItem.question.text}
                    </div>
                    <div className="space-y-2">
                      {questionItem.answers.map((answer, idx) => (
                        <div
                          key={answer.id}
                          className={`p-2 border rounded-lg transition-all ${
                            answer.is_correct
                              ? "bg-green-50 border-green-600"
                              : answer.is_the_answer
                              ? "bg-red-50 border-red-600"
                              : ""
                          }`}
                        >
                          <div className="flex justify-between">
                            <span>{answer.text}</span>
                            <span
                              className={`font-medium ${
                                answer.is_the_answer && answer.is_correct
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {answer.is_the_answer ? "Your answer" : ""}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>No review available.</div>
            )}
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
