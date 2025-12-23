import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { MileM } from "../../models/mile-m";


export const mileAction=createActionGroup(
    {
        source:'Mile API',
        events:{
            'Load Mile':emptyProps(),
            'Load Mile Success':props<{payload:MileM[]}>(),
            'Load Mile Failure':emptyProps()
        }
    }
)


export const createMileAction=createActionGroup(
    {
        source:'Mile API',
        events:{
            'Create Mile':props<{payload:MileM}>(),
            'Create Mile Success':props<{payload:MileM}>(),
            'Create Mile Failure':props<{error:any}>()
        }
    }
)

export const deleteMileAction=createActionGroup({
    source:'Mile API',
    events:{
        'Delete Mile':props<{id:string}>(),
            'Delete Mile Success':props<{id:string}>(),
            'Delete Mile Failure':props<{error:any}>()
    }
})