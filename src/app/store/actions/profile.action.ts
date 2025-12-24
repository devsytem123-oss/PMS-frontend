import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { ProfileM } from "../../models/profile";


export const profileAction=createActionGroup(
    {
        source:'Profile API',
        events:{
            'Load Profile':emptyProps(),
            'Load Profile Success':props<{payload:ProfileM}>(),
            'Load Profile Failure':emptyProps()
        }
    }
)

export const addProfileAction=createActionGroup(
    {
        source:'Profile API',
        events:{
            'Add Profile':props<{payload:ProfileM}>(),
            'Add Profile Success':props<{payload:ProfileM}>(),
            'Add Profile Failure':props<{error:string}>()
        }
    }
)

export const updateProfileAction=createActionGroup(
    {
        source:'Profile API',
        events:{
            'Update Profile':props<{payload:ProfileM}>(),
            'Update Profile Success':props<{payload:ProfileM}>(),
            'Update Profile Failure':props<{error:string}>()
        }
    }
)

export const deleteProfileAction=createActionGroup(
    {
        source:'Profile API',
        events:{
            'delete Profile':emptyProps,
            'delete Profile Success':emptyProps,
            'delete Profile Failure':props<{error:string}>()
        }
    }
)