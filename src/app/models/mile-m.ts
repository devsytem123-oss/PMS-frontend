import { ProjectM } from "./project-m";
import { ProjectRef } from "./project-ref";
import { TaskM } from "./task-m";

export interface MileM {
    _id?: string | null;
  name?: string | null;
  description?: string | null;

  projectId?: any;

  dueDate?: string | null;
  status?: string | null;

  createdAt?: string | null;
  updatedAt?: string | null;
  __v?: number | null;

  tasks?: TaskM[] | null;
}
