import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProfileService } from '../../services/profile-service';

import { catchError, exhaustMap, map, of } from 'rxjs';

import { roleAction } from '../actions/role.action';

@Injectable()
export class RoleEffects {
  actions$ = inject(Actions);
  profileService = inject(ProfileService);

  loadRole = createEffect(() => {
    return this.actions$.pipe(
      ofType(roleAction.loadRole),
      exhaustMap(() =>
        this.profileService.getRole().pipe(
          map((role: string) => roleAction.loadRoleSuccess({ payload: role })),
          catchError(() => of(roleAction.loadRoleFailure()))
        )
      )
    );
  });
}
