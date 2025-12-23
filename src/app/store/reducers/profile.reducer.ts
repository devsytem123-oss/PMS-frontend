import { createReducer, on } from "@ngrx/store";
import { ProfileM } from "../../models/profile";
import { profileAction } from "../actions/profile.action";


const initialState:ProfileM={}

export const profileReducer=createReducer(
    initialState,
    on(profileAction.loadProfileSuccess,(state,action)=>{
        return action.payload
    })
)

