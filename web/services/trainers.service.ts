import APIService from "@/services/api.service";
import {
  ITrainerCreate,
  ITrainerPermission,
  ITrainerPermissionCreate,
} from "@/models/trainers";
import { IUser } from "@/models/authentication";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class TrainerService extends APIService {
  constructor() {
    const BASE_URL = API_BASE_URL + "trainers/";

    super(BASE_URL as string);
  }

  async getTrainers(): Promise<IUser[]> {
    return this.get("")
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async createTrainer(data: ITrainerCreate): Promise<IUser> {
    return this.post("", data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getTrainer(id: number): Promise<IUser> {
    return this.get(`${id}`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async deleteTrainer(id: number): Promise<any> {
    return this.delete(`${id}`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getTrainerPermissions(id: number): Promise<ITrainerPermission[]> {
    return this.get(`${id}/permissions`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async addTrainerPermission(
    id: number,
    data: ITrainerPermissionCreate
  ): Promise<ITrainerPermission> {
    return this.post(`${id}/permissions`, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default new TrainerService();
