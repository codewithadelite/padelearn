import APIService from "@/services/api.service";
import { IStudentCreate } from "@/models/students";
import { IUser } from "@/models/authentication";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class StudentService extends APIService {
  constructor() {
    const BASE_URL = API_BASE_URL + "students/";

    super(BASE_URL as string);
  }

  async createStudent(data: IStudentCreate): Promise<IUser> {
    return this.post("", data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default new StudentService();
