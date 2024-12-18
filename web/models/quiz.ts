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
