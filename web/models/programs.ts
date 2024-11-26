export interface IProgram {
  id: number;
  created_at: string;
  updated_at: string;
  image: string;
  name: string;
  start_date: string;
  end_date: string;
}

export interface IProgramCreate {
  name: string;
  start_date: Date;
  end_date: Date;
}
