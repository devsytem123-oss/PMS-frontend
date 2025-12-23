import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Users } from '../../pages/users/users';
import { UserService } from '../../services/user-service';
import { userAction } from '../actions/user.action';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class userEffects {
    private actions$=inject(Actions)
    private userServive=inject(UserService)

    loadUsers$=createEffect(()=>{
        return this.actions$.pipe(
            ofType(userAction.loadUers),
            exhaustMap(()=>this.userServive.getAllUsers()
            .pipe( map((users)=>(userAction.loadUserSuccess({payload:users}))),
            catchError(()=> of (userAction.loadUserFailure()))
            )
        )
    )
    })
 
}