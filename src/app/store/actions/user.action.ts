import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../models/user";



export const userAction =createActionGroup({
    source:'User API',
    events:{
        'loadUers':emptyProps(),
        'load User Success':props<{payload:User[]}>(),
        'load User Failure':emptyProps()
    }
})