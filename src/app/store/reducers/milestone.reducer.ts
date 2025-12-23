import { createReducer, on } from "@ngrx/store";
import { MileM } from "../../models/mile-m";
import { createMileAction, deleteMileAction, mileAction } from "../actions/milestone.action";


const initialState:MileM[]=[]
export const mileReducer=createReducer(
    initialState,
    on(mileAction.loadMileSuccess,(state,action)=>{
        return action.payload
    }),
    on(
        createMileAction.createMileSuccess,(state,action)=>{
            return [...state,action.payload]
        }
    ),
    on(deleteMileAction.deleteMileSuccess,(state,action)=>{
        return state.filter((m)=>m._id!==action.id)
    })
)