import { createReducer, on } from '@ngrx/store';

import { roleAction } from '../actions/role.action';

const initialState: string = '';

export const roleReducer = createReducer(
  initialState,
  on(roleAction.loadRoleSuccess, (state, action) => {
    return action.payload;
  }),
  on(roleAction.clearRole, () => '')
);
