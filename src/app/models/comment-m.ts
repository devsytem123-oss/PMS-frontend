import { TaskM } from "./task-m";

export interface CommentM {

      _id: string;

  taskId: any ;      
  authorId: any;    
  text: string | null;

  createdAt: string | null;
  updatedAt: string | null;
}
