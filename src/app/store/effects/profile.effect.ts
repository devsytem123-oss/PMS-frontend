import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../../services/profile-service';
import { profileAction } from '../actions/profile.action';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { ProfileM } from '../../models/profile';

@Injectable()
export class profileEffects {
   actions$=inject(Actions)
   profileService=inject(ProfileService)

   loadProfile=createEffect(()=>{
    return this.actions$.pipe(
        ofType(profileAction.loadProfile),
        exhaustMap(()=>this.profileService.getProfile().pipe(
            map((profile:ProfileM)=>profileAction.loadProfileSuccess({payload:profile})),
            catchError(()=>of(profileAction.loadProfileFailure()))
        ))
    )
   })
 
}