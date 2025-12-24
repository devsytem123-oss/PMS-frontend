import { createReducer, on } from "@ngrx/store";
import { ProfileM } from "../../models/profile";
import { addProfileAction, deleteProfileAction, profileAction, updateProfileAction } from "../actions/profile.action";


const initialState:ProfileM | null=null

export const profileReducer=createReducer<ProfileM | null> (
    initialState,
    on(profileAction.loadProfileSuccess,(state,action)=>{
        return action.payload
    }),
    on(addProfileAction.addProfileSuccess,(state,action)=>{
        return action.payload
    }),
    on(updateProfileAction.updateProfileSuccess,(state,action)=>{
        return action.payload
    }),
    on(deleteProfileAction.deleteProfileSuccess,()=>{
        return null
    }   )
)

