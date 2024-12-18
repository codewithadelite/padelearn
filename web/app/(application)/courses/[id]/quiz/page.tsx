"use client";
import React, { useState, useEffect } from "react";

import { useParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { IQuestion } from "@/models/questions";
import QuestionService from "@/services/question.service";
import NoContent from "@/components/ui/no-content";

import Quiz from "@/components/shared/quiz/quiz";
import DocumnetsQuizToggle from "@/components/shared/courses/documents-quiz-toggle";
import { IOption } from "@/models/questions";
import Score from "@/components/shared/quiz/score";
import QuizService from "@/services/quiz";

interface QuizData {
  id: number;
  question: string;
  options: IOption[];
  currentQuestion: number;
  totalQuestions: number;
}

const QuizPage = () => {
  const { id: courseId } = useParams();

  const [questionsAnswers, setQuestionsAnswers] = useState<
    { question: number; answer: number }[]
  >([]);
  const [score, setScore] = useState<string | null>(null);
  const [result, setResult] = useState<"success" | "fail">("fail");

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizId, setQuizId] = useState<number>(0);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quizData, setQuizData] = useState<QuizData>({
    id: 0,
    question: "",
    options: [],
    currentQuestion: 0,
    totalQuestions: 0,
  });

  const [progress, setProgress] = useState<number>(0);

  const handleAnswerSelect = (optionId: number) => {
    setSelectedAnswer(optionId);
  };

  const submitQuiz = async (payload: any) => {
    const response = await QuizService.submitQuiz(courseId as string, payload);
    setScore(response.score);
    setResult(response.result);
  };

  const handleAnswerSubmit = () => {
    console.log(selectedAnswer);
    const newData = [
      ...questionsAnswers,
      { question: quizData.id, answer: selectedAnswer ? selectedAnswer : 0 },
    ];

    if (quizData.currentQuestion >= quizData.totalQuestions) {
      setQuestionsAnswers(newData);
      let payload = {
        quiz: quizId,
        quiz_answers: newData,
      };
      submitQuiz(payload);
      return;
    }

    setQuestionsAnswers(newData);

    setQuizData({
      id: questions[quizData.currentQuestion].id,
      question: questions[quizData.currentQuestion].question,
      options: questions[quizData.currentQuestion].options,
      currentQuestion: quizData.currentQuestion + 1,
      totalQuestions: questions.length,
    });

    setSelectedAnswer(null);
    setProgress(0); // Reset progress bar
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const questionsResponse = await QuestionService.getQuestions(
          courseId as string
        );
        setQuizId(questionsResponse.quiz);
        setQuestions(questionsResponse.questions);
        setQuizData({
          id: questionsResponse.questions[0].id,
          question: questionsResponse.questions[0].question,
          options: questionsResponse.questions[0].options,
          currentQuestion: 1,
          totalQuestions: questionsResponse.questions.length,
        });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Timer Logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!score) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            handleAnswerSubmit(); // Auto-submit when time ends
            return 0;
          }
          return prev + 5; // Increase progress bar (100% / 20s = 5% per second)
        });
      }, 1000);
    }

    return () => clearInterval(timer); // Cleanup timer
  }, [quizData]);

  if (isLoading) {
    return "Questions loading";
  }

  if (!questions?.length) {
    return <NoContent>No questions found</NoContent>;
  }

  return (
    <>
      <header className="flex h-16 border-b shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Padelearn</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Quiz</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      {/* Timer Progress Bar */}
      <div className="w-full h-3 mb-4 overflow-hidden bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-4 lg:px-20 ">
        <div className="mb-6">
          <DocumnetsQuizToggle activeTab="quiz" />
        </div>

        {score && <Score score={score} result={result} />}

        {!score && (
          <>
            <Quiz
              question={quizData.question}
              options={quizData.options}
              currentQuestion={quizData.currentQuestion}
              totalQuestions={quizData.totalQuestions}
              onAnswerSelect={handleAnswerSelect}
              handleAnswerSubmit={handleAnswerSubmit}
              selectedAnswer={selectedAnswer}
            />
          </>
        )}
      </div>
    </>
  );
};

export default QuizPage;
