import { createReducer, on } from "@ngrx/store";
import { CommentM } from "../../models/comment-m";
import { createCommentAction, deleteCommentAction, loadCommentAction } from "../actions/comment.action";


const initialState:CommentM[]=[]

export const commentReducer=createReducer(
    initialState,
    on(loadCommentAction.loadCommentSuccess,(state,action)=>{
        return action.payload
    }),
    on(
        createCommentAction.createCommentSuccess,(state,action)=>{
            return [...state,action.payload]
        }
    ),
    on(
        deleteCommentAction.deleteCommentSuccess,(state,action)=>{
            return state.filter((c)=>c._id!==action.id)
        }
    )
)