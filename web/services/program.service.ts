import APIService from "@/services/api.service";
import { IProgram, IProgramCreate } from "@/models/programs";
import { IUser } from "@/models/authentication";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class ProgramService extends APIService {
  constructor() {
    const BASE_URL = API_BASE_URL + "programs/";

    super(BASE_URL as string);
  }

  async createProgram(data: IProgramCreate): Promise<IProgram> {
    return this.post("", data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getPrograms(): Promise<IProgram[]> {
    return this.get("")
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getProgram(id: string): Promise<IProgram> {
    return this.get(`${id}`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async updateProgram(id: number, data: IProgramCreate): Promise<IProgram> {
    return this.put(`${id}`, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async deleteProgram(id: number): Promise<any> {
    return this.delete(`${id}`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getStudentsInProgram(id: number): Promise<IUser[]> {
    return this.get(`${id}/students`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async addStudentToProgram(id: number, data: { user: number }): Promise<any> {
    return this.post(`${id}/students`, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default new ProgramService();
