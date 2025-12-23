import { User } from "./user";

export interface ProfileM {
     _id?: string | null;
  userId?: User | null;
  phone?: number | null;
  address?: string | null;
  skills?: string | null;
  __v?: number | null;
}
