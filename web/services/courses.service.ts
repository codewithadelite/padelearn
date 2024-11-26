import APIService from "@/services/api.service";
import {
  ICourse,
  ICourseCreate,
  ICourseMaterial,
  ICourseMaterialCreate,
} from "@/models/courses";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

class CourseService extends APIService {
  constructor() {
    const BASE_URL = API_BASE_URL + "courses/";

    super(BASE_URL as string);
  }

  async createCourse(data: ICourseCreate): Promise<ICourse> {
    return this.post("", data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getCourses(): Promise<ICourse[]> {
    return this.get("")
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getCourse(id: number): Promise<ICourse> {
    return this.get(`${id}`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async updateCourse(id: number, data: ICourseCreate): Promise<ICourse> {
    return this.put(`${id}`, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async deleteCourse(id: number): Promise<any> {
    return this.delete(`${id}`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getCourseMaterials(id: string): Promise<ICourseMaterial[]> {
    return this.get(`${id}/materials`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async addCourseMaterial(
    id: number,
    data: ICourseMaterialCreate
  ): Promise<any> {
    return this.mediaUpload(`${id}/materials`, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getProgramCourses(programId: string): Promise<ICourse[]> {
    return this.get(`?program_id=${programId}`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async downloadDocument(materialId: number): Promise<any> {
    return this.get(`materials/${materialId}/document`, {
      responseType: "blob",
    })
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

export default new CourseService();
