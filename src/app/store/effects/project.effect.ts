import {  inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProjectService } from '../../services/project-service';
import { catchError, exhaustMap, map, mergeMap, of, pipe } from 'rxjs';
import { addProjectAction, deleteProjectAction, projectAction, updateProjectAction } from '../actions/project.action';
import { ProjectM } from '../../models/project-m';
import { Store } from '@ngrx/store';



@Injectable()
export class projectEffects {
   actions$=inject(Actions)
   projectService=inject(ProjectService)
  store=inject(Store)
   loadProjects=createEffect(()=>{
      return this.actions$.pipe(
        ofType(projectAction.loadProject),
        exhaustMap(()=>this.projectService.getProjects()
       .pipe(map((projects:ProjectM[])=>(projectAction.loadProjectSuccess({payload:projects}))),
       catchError(()=>of(projectAction.loadProjectFailure()))
    )
)
      )
   })



   createProject$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProjectAction.addProject),
      mergeMap(action =>
        this.projectService.createProjects(action.payload).pipe(
          mergeMap(project => [
            addProjectAction.addProjectSuccess({ payload: project }),
            projectAction.loadProject()
          ]),
          catchError(error =>
            of(addProjectAction.addProjectFailure({ error }))
          )
        )
      )
    )
  );

  updateProject$ = createEffect(() =>
  this.actions$.pipe(
    ofType(updateProjectAction.updateProject),
    mergeMap(action =>
      this.projectService.updateProject(action.id, action.payload).pipe(
        mergeMap(project => [
          updateProjectAction.updateProjectSuccess({ payload: project }),
          projectAction.loadProject()
        ]),
        catchError(error =>
          of(updateProjectAction.updateProjectFailure({ error }))
        )
      )
    )
  )
);

deleteProject$=createEffect(()=>{
  return this.actions$.pipe(
    ofType(deleteProjectAction.deleteProject),
    mergeMap(action=>this.projectService.deleteProject(action.id).pipe(
      mergeMap(()=>[
        deleteProjectAction.deleteProjectSuccess({id:action.id}),
        projectAction.loadProject()
      ]),
      catchError((error)=>of(deleteProjectAction.deleteProjectFailure(error)))
    )
  
  )
  )
})
 
}