import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const roleAction = createActionGroup({
  source: 'Role API',
  events: {
    'load Role': emptyProps(),
    'load Role Success': props<{ payload: string }>(),
    'load Role Failure': emptyProps(),
    clearRole: emptyProps(),
  },
});
