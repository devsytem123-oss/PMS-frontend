import { CommentM } from "./comment-m";


export interface TaskM {

     _id: string ;
  title: string | null;
  description: string | null;

  milestoneId: any | null;

  status: 'pending' | 'in-progress' | 'completed' | null;
  comments: CommentM[] | null; 

  assignedBy: any;
  assignedTo: any;

  createdAt: string | null;
  updatedAt: string | null;
  __v: number | null;
}
