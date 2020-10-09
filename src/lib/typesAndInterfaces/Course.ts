export interface ICourse {
  name: string;
  id?: number;
  mode?: "create" | "edit" | undefined;
  data?: string;
  err?: string;
}
