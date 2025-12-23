import { createFeatureSelector } from "@ngrx/store";
import { CommentM } from "../models/comment-m";

export const commentSelecter=createFeatureSelector<CommentM[]>('comments')