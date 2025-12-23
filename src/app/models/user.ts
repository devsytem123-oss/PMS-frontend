 import { ProfileM } from "./profile";
export interface User {
  
  _id?: string | null;
  name?: string  | null;
  email?: string | null;
  password?: string | null;
  role?: string | null;
  isDeleted?: boolean | null;
  deletedAt?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  __v?: number | null;
  profile?: ProfileM | null;



}
