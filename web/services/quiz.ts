import APIService from "@/services/api.service";
import { IQuiz, IQuizSubimtResponse, IQuizReviewResponse } from "@/models/quiz";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class QuizService extends APIService {
  constructor() {
    const BASE_URL = API_BASE_URL + "quizes/";

    super(BASE_URL as string);
  }

  async submitQuiz(
    courseId: string,
    payload: any
  ): Promise<IQuizSubimtResponse> {
    return this.post(`${courseId}/submit`, payload)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getQuizes(): Promise<IQuiz[]> {
    return this.get("")
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getQuizReview(quizId: number): Promise<IQuizReviewResponse[]> {
    return this.get(`${quizId}/review`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default new QuizService();
