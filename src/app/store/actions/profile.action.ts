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
