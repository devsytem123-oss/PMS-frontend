import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../../services/profile-service';
import { addProfileAction, deleteProfileAction, profileAction, updateProfileAction } from '../actions/profile.action';
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

   addProfile=createEffect(()=>{
    return this.actions$.pipe(
        ofType(addProfileAction.addProfile),
        exhaustMap((action)=>this.profileService.creatProfile(action.payload).pipe(
            exhaustMap((profile:ProfileM)=>[addProfileAction.addProfileSuccess({payload:profile}),
                profileAction.loadProfile()
            ]),
            catchError((error)=>of(addProfileAction.addProfileFailure({error:error.message})))
        ))
    )
   }
)
 
updateProfile=createEffect(()=>{
    return this.actions$.pipe(
        ofType(updateProfileAction.updateProfile),
        exhaustMap((action)=>this.profileService.updateProfile(action.payload).pipe(
            exhaustMap((profile)=>[updateProfileAction.updateProfileSuccess({payload:profile}),
                profileAction.loadProfile()
            ]),
            catchError((error)=>of(updateProfileAction.updateProfileFailure({error:error.message})))
        ))
    )
})

deleteProfile=createEffect(()=>{
    return this.actions$.pipe(
        ofType(deleteProfileAction.deleteProfile),
        exhaustMap(()=>{
            return this.profileService.deleteProfile().pipe(
                exhaustMap(()=>{
                    return [
                        deleteProfileAction.deleteProfileSuccess(),
                        profileAction.loadProfile()
                    ]
                }),
                catchError((error)=>of(deleteProfileAction.deleteProfileFailure({error:error.message})))
            )
        })
    )   
})
}