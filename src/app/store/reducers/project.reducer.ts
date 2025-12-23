import { createReducer, on } from "@ngrx/store";
import { ProjectM } from "../../models/project-m";
import { addProjectAction, deleteProjectAction, projectAction, updateProjectAction } from "../actions/project.action";



const initialState:ProjectM[]=[]

export const projectReducer=createReducer(
    initialState,
    on(projectAction.loadProjectSuccess,(state,action)=>{
        return action.payload
    }),
    on(addProjectAction.addProjectSuccess,(state,action)=>{
        return [...state,action.payload]
    }),
    on(updateProjectAction.updateProjectSuccess,(state,action)=>{
        return [...state, action.payload]
    }),
    on(deleteProjectAction.deleteProjectSuccess,(state,action)=>{
        return state.filter((p)=>p._id!==action.id)
    }

    )
)