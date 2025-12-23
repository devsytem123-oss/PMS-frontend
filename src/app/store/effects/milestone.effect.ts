import {  inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MilestoneService } from '../../services/milestone-service';
import { createMileAction, deleteMileAction, mileAction } from '../actions/milestone.action';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import { MileM } from '../../models/mile-m';

@Injectable()
export class mileEffects {
   actions$=inject(Actions)
   mileService=inject(MilestoneService)

   loadMilestones=createEffect(()=>
    {
    return this.actions$.pipe(
        ofType(mileAction.loadMile),
        exhaustMap(()=>this.mileService.getMilestones()
        .pipe(map((miles:MileM[])=>(mileAction.loadMileSuccess({payload:miles}))),
    catchError(()=>of(mileAction.loadMileFailure()))
)
    )
        
    )
   })

   createMile$=createEffect(()=>{
    return this.actions$.pipe(
        ofType(createMileAction.createMile),
        mergeMap((action)=>this.mileService.addMilestone(action.payload).pipe(
            mergeMap((data:MileM)=>[
                createMileAction.createMileSuccess({payload:data}),
                mileAction.loadMile()
            ]),
            catchError((error)=>of(createMileAction.createMileFailure({error:error})))
        ))
    )
   })

   deleteMile=createEffect(()=>{
    return this.actions$.pipe(
        ofType(deleteMileAction.deleteMile),
        mergeMap((action)=>this.mileService.deleteMileStone(action.id).pipe(
            mergeMap(()=>[
                deleteMileAction.deleteMileSuccess({id:action.id}),
                mileAction.loadMile()
            ]),
            catchError((error)=>of(deleteMileAction.deleteMileFailure({error:error})))
        ))
    )
   })
 
}