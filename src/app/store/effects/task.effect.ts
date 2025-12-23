import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TaskService } from '../../services/task-service';
import { assignTaskActions, createTaskAction, deleteTaskActions, taskAction, updateTaskActions } from '../actions/task.action';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import { TaskM } from '../../models/task-m';

@Injectable()
export class taskEffects {
  actions$ = inject(Actions);
  taskService = inject(TaskService);

  loadTasks = createEffect(() => {
    return this.actions$.pipe(
      ofType(taskAction.loadTask),
      exhaustMap(() =>
        this.taskService.getAllTasks().pipe(
          map((tasks: TaskM[]) => taskAction.loadTaskSuccess({ payload: tasks })),

          catchError(() => of(taskAction.loadTaskFailure()))
        )
      )
    );
  });

  createTask=createEffect(()=>{
    return this.actions$.pipe(
      ofType(createTaskAction.createTask),
      mergeMap((action)=>this.taskService.createTask(action.payload).pipe(
        mergeMap((data)=>[
          createTaskAction.createTaskSuccess({payload:data}),
          taskAction.loadTask()
        ]),
        catchError((error)=>of(createTaskAction.createTaskFailure({error:error})))
      ))
    )
  })


  updateTask=createEffect(()=>{
    return this.actions$.pipe(
      ofType(updateTaskActions.updateTask),
      mergeMap((action)=>this.taskService.updateStatus(action.payload).pipe(
        mergeMap((data)=>[
          updateTaskActions.updateTaskSuccess({payload:data}),
          taskAction.loadTask()
        ]),
        catchError((error)=>of(updateTaskActions.updateTaskFailure({error:error})))
      ))
    )
  })

  assignTask=createEffect(()=>{
    return this.actions$.pipe(
      ofType(assignTaskActions.assignTask),
      mergeMap((action)=>this.taskService.assignTask(action.payload).pipe(
        mergeMap((data)=>[
          assignTaskActions.assignTaskSuccess({payload:data}),
          taskAction.loadTask()
        ]),
        catchError((error)=>of(assignTaskActions.assignTaskFailure({error:error})))
      ))
    )
  })

  deleteTask=createEffect(()=>{
    return this.actions$.pipe(
      ofType(deleteTaskActions.deleteTask),
      mergeMap((action)=>this.taskService.delete(action.id).pipe(
        mergeMap(()=>[
          deleteTaskActions.deleteTaskSuccess({id:action.id}),
          taskAction.loadTask()
        ]),
        catchError((error)=>of(deleteTaskActions.deleteTaskFailure({error:error})))
      ))
    )
  })
}
