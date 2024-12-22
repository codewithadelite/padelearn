"use client";
import React from "react";
import useSWR from "swr";

import NoContent from "@/components/ui/no-content";
import { IQuiz } from "@/models/quiz";
import QuizService from "@/services/quiz";
import { QUIZES_LIST } from "@/constants/fetch-keys";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuizCorrection } from "@/components/shared/quiz/correction";

import { Trophy, ListChecks, CheckCircle, XCircle } from "lucide-react";

const QuizPage = () => {
  const { data: quizzes, isLoading } = useSWR<IQuiz[]>(QUIZES_LIST, () =>
    QuizService.getQuizes()
  );

  if (isLoading) {
    return "Quizes loading...";
  }

  if (!quizzes?.length) {
    return <NoContent>No quizes found</NoContent>;
  }

  return (
    <>
      <header className="flex bg-white dark:bg-slate-900 sticky top-0 h-16 border-b mb-4 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center justify-between w-full gap-2 px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h3 className="text-md font-bold">Quizzes</h3>
          </div>
        </div>
      </header>
      <div className="w-full px-4 sm:px-6 md:px-4 lg:px-20 grid gap-4">
        {quizzes.map((quiz) => (
          <Card
            key={quiz.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <CardHeader className="p-0 sm:w-1/3 flex items-start gap-2">
              <CardTitle className="text-sm font-normal">
                {quiz.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-wrap items-center gap-4 p-0 sm:pl-4">
              <div className="ml-auto flex gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <ListChecks className="w-5 h-5 text-gray-500" />
                  <span className="font-semibold">Score:</span>{" "}
                  <span className="font-extrabold">
                    {quiz.total === 0
                      ? "Not taken"
                      : ((quiz.score / quiz.total) * 100).toFixed(2) + "%"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  {quiz.result === "success" ? (
                    <>
                      <CheckCircle className="text-green-500 w-5 h-5" />
                      <Badge variant="default">Success</Badge>
                    </>
                  ) : (
                    <>
                      <XCircle className="text-red-500 w-5 h-5" />
                      <Badge variant="destructive">Failed</Badge>
                    </>
                  )}
                </div>
                <QuizCorrection quizId={quiz.id} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default QuizPage;
