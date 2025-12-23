import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { TaskM } from "../../models/task-m";


export const taskAction=createActionGroup(
    {
        source:'Task API',
        events:{
            'Load Task':emptyProps(),
            'Load Task Success':props<{payload:TaskM[]}>(),
            'Load Task Failure':emptyProps()
        }
    }
)


export const createTaskAction=createActionGroup(
    {
        source:'Task API ',
        events:{
            'create Task':props<{payload:Partial<TaskM>}>(),
            'Create Task Success':props<({payload:TaskM})>(),
            'Create Task Failure':props<{error:string}>()
        }
    }
)

export const updateTaskActions=createActionGroup(
    {
       source:'Task API',
       events:{
        'Update Task':props<{payload:Partial<TaskM>}>(),
        'Update Task Success':props<{payload:TaskM}>(),
        'Update Task Failure':props<{error:string}>()
       }
    }
)

export const assignTaskActions=createActionGroup(
    {
       source:'Task API',
       events:{
        'Assign Task':props<{payload:Partial<TaskM>}>(),
        'Assign Task Success':props<{payload:TaskM}>(),
        'Assign Task Failure':props<{error:string}>()
       }
    }
)

export const deleteTaskActions=createActionGroup(
    {
       source:'Task API',
       events:{
        'Delete Task':props<{id:string}>(),
        'Delete Task Success':props<{id:string}>(),
        'Delete Task Failure':props<{error:string}>()
       }
    }
)