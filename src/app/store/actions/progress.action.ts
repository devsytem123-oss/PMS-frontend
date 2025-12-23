import { createActionGroup, props } from "@ngrx/store";


export const progressAction=createActionGroup(
    {
        source:'Progress API',
        events:{
            'Load Progress':props<{id:string}>(),
            'Load Progress Success':props<{payload:any}>(),
            'Load Progress Failure':props<{error:string}>()
        }
    }
)
