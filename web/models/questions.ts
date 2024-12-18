export interface IQuestion {
  id: number;
  question: string;
  options: IOption[];
}

export interface IOption {
  id: number;
  label: string;
  text: string;
}

export interface IQuestionsResponse {
  quiz: number;
  questions: IQuestion[];
}
