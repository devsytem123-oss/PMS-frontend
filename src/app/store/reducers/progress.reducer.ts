import { createReducer, on } from "@ngrx/store"
import { progressAction } from "../actions/progress.action"


const initialState:any=[]

export const progressReducer= createReducer(
    initialState,

    on(
        progressAction.loadProgressSuccess,(state,action)=>{
            return action.payload
        }
    )
)