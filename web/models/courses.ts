export interface ICourse {
  id: number;
  created_at: string;
  updated_at: string;
  image: string;
  name: string;
  program: number;
}

export interface ICourseCreate {
  name: string;
  program: number;
}

export interface ICourseMaterial {
  id: number;
  name: string;
  document: string;
  generate_quiz: boolean;
  course: ICourse;
}

export interface ICourseMaterialCreate {
  name: string;
  document: string;
  generate_quiz: boolean;
  course: ICourse;
}
