//Fetch keys

export const PROGRAMS_LIST = `PROGRAMS_LIST`;
export const PROGRAM = (programId: string) => `PROGRAM/${programId}`;

export const COURSES_LIST = (programId: string) => `COURSES_LIST/${programId}`;
export const MATERIALS_LIST = (courseId: string) =>
  `COURSES_MATERIALS/${courseId}`;

export const QUIZES_LIST = `QUIZES_LIST`;

export const QUIZ_REVIEW = (quizId: number) => `QUIZ_REVIEW/${quizId}`;
