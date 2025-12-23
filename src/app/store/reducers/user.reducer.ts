import { createReducer, on } from "@ngrx/store";
import { User } from "../../models/user";
import { userAction } from "../actions/user.action";


const initialState:User[]=[]

export const userReducer=createReducer(
    initialState,
    on(userAction.loadUserSuccess,(state,action)=>{
       return action.payload
    })
)