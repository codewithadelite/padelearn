import { IProgram } from "./programs";
import { ICourse } from "./courses";
import exp from "constants";

export interface ITrainerCreate {
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: string;
}

export interface ITrainerPermission {
  id: number;
  program: IProgram | null;
  course: ICourse | null;
}

export interface ITrainerPermissionCreate {
  program: number | null;
  course: number | null;
}
