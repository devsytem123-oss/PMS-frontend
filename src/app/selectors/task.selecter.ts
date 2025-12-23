import { createFeatureSelector, createSelector, on } from "@ngrx/store";
import { TaskM } from "../models/task-m";


export const taskSelector=createFeatureSelector<TaskM[]>("tasks")

export const selectTaskById=(id:string)=>createSelector(
    taskSelector,
    (task)=>task.find((t)=>t._id===id)
)

export const selectTaskByProId=(id:string)=>createSelector(
    taskSelector,
    (task)=>task.filter((t)=>t.milestoneId.projectId===id)
)



export const selectTaskByMileId=(id:string)=>createSelector(
    taskSelector,
    (task)=>task.filter((t)=>t.milestoneId._id===id)
)


export const selectTaskByUserId = (id: string) =>
  createSelector(
    taskSelector,
    (tasks) => tasks.filter(t => t.assignedTo === id)
  );
