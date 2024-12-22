export interface IQuizSubimtResponse {
  score: string;
  result: "success" | "fail";
}

export interface IQuiz {
  id: number;
  title: string;
  score: number;
  total: number;
  result: "success" | "failed";
}

export interface IQuizReviewResponse {
  question: IQuizQuestion;
  answers: IQuizAnswer[];
}

export interface IQuizQuestion {
  id: number;
  text: string;
}

export interface IQuizAnswer {
  id: number;
  text: string;
  is_correct: boolean;
  is_the_answer: boolean;
}
