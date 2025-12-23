import { MileM } from "./mile-m";
import { User } from "./user";

export interface ProjectGetM {
      _id?: string | null;
  name?: string | null;
  description?: string | null;

  createdBy?:  User |  null;
  assignedTo?: User |  null;

  milestones?: MileM[] | null;

  status?: string | null;
  startDate?: string | null;
  endDate?: string | null;

  createdAt?: string | null;
  updatedAt?: string | null;
  __v?: number | null;
}
