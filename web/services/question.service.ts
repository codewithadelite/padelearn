import APIService from "@/services/api.service";
import { IQuestionsResponse } from "@/models/questions";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class QuestionService extends APIService {
  constructor() {
    const BASE_URL = API_BASE_URL + "questions/";

    super(BASE_URL as string);
  }

  async getQuestions(courseId: string): Promise<IQuestionsResponse> {
    return this.get(`courses/${courseId}`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default new QuestionService();
