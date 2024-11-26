//Fetch keys

export const PROGRAMS_LIST = `PROGRAMS_LIST`;
export const PROGRAM = (programId: string) => `PROGRAM/${programId}`;

export const COURSES_LIST = (programId: string) => `COURSES_LIST/${programId}`;
export const MATERIALS_LIST = (courseId: string) =>
  `COURSES_MATERIALS/${courseId}`;
