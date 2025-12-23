import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ProjectM } from "../../models/project-m";



export const projectAction=createActionGroup({
    source:'Project API',
    events:{
        'Load Project':emptyProps(),
        'Load Project Success':props<{payload:ProjectM[]}>(),
        'Load Project Failure':emptyProps()
    }
})


export const addProjectAction=createActionGroup({
    source:'Project API',
    events:{
        'Add Project':props<{payload:ProjectM}>(),
        'Add Project Success':props<{payload:ProjectM}>(),
        'Add Project Failure':props<{error:any}>()
    }
})


export const updateProjectAction=createActionGroup({
    source:'Project API',
    events:{
        'Update Project':props<{id:string,payload:ProjectM}>(),
        'Update Project Success':props<{payload:ProjectM}>(),
        'Update Project Failure':props<{error:any}>()
    }
})


export const deleteProjectAction=createActionGroup({
    source:'Project API',
    events:{
        'delete Project':props<{id:string}>(),
        'delete Project Success':props<{id:string}>(),
        'delete Project Failure':props<{error:any}>()
    }
})