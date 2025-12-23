import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideStore}  from '@ngrx/store'
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import {provideEffects} from '@ngrx/effects'
import {provideStoreDevtools} from '@ngrx/store-devtools'
import { userReducer } from './store/reducers/user.reducer';
import { userEffects } from './store/effects/user.effect';
import { projectReducer } from './store/reducers/project.reducer';
import { projectEffects } from './store/effects/project.effect';
import { mileEffects } from './store/effects/milestone.effect';
import { mileReducer } from './store/reducers/milestone.reducer';
import { taskEffects } from './store/effects/task.effect';
import { taskReducer } from './store/reducers/task.reducer';
import { profileReducer } from './store/reducers/profile.reducer';
import { profileEffects } from './store/effects/profile.effect';
import { roleReducer } from './store/reducers/role.reducer';
import { RoleEffects } from './store/effects/role';
import { commentReducer } from './store/reducers/comment.reducer';
import { commentEffects } from './store/effects/comment.effect';
import { progressReducer } from './store/reducers/progress.reducer';
import { progressEffects } from './store/effects/progress.effect';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      users:userReducer,
      projects:projectReducer,
      miles:mileReducer,
      tasks:taskReducer,
      profile:profileReducer,
      role:roleReducer,
      comments:commentReducer,
      progress:progressReducer
    }),
    provideEffects(
      [userEffects,
      projectEffects,
      mileEffects,
      taskEffects,
      profileEffects,
      RoleEffects,
      commentEffects,
      progressEffects
    ]
    ),
    provideStoreDevtools({
       maxAge:10, 
      logOnly:!isDevMode(), 
      autoPause:true, 
      trace:false, 
      traceLimit:75, 
      connectInZone:true 
    })
    
  ]
};
