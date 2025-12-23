import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { profileAction } from '../actions/profile.action';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { ProfileM } from '../../models/profile';
import { ProjectService } from '../../services/project-service';
import { progressAction } from '../actions/progress.action';

@Injectable()
export class progressEffects {
   actions$=inject(Actions)
   projectService=inject(ProjectService)

   loadProgress=createEffect(()=>{
    return this.actions$.pipe(
        ofType(progressAction.loadProgress),
        exhaustMap((action)=>this.projectService.progress(action.id).pipe(
            map((progress)=>progressAction.loadProgressSuccess({payload:progress})),
            catchError((error)=>of(progressAction.loadProgressFailure({error:error})))
        ))
    )
   })
 
}