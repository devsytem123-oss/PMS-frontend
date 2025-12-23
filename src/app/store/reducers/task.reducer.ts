import { createReducer, on } from "@ngrx/store";
import { TaskM } from "../../models/task-m";
import { assignTaskActions, createTaskAction, deleteTaskActions, taskAction, updateTaskActions } from "../actions/task.action";

const initialState:TaskM[]=[]
export const taskReducer=createReducer(
 initialState,
 on(taskAction.loadTaskSuccess,(state,action)=>{
    return action.payload
 }),
 on(createTaskAction.createTaskSuccess,(state,action)=>{
   return [...state,action.payload]
 }),
 on(
   deleteTaskActions.deleteTaskSuccess,(state,action)=>{
      return state.filter((m)=>m._id!==action.id)
   }
 ),
 on(
  updateTaskActions.updateTaskSuccess,(state,action)=>{
    return [...state,action.payload]
  }
 ),
 on(assignTaskActions.assignTaskSuccess,(state,action)=>{
  return [...state,action.payload]
 })
)