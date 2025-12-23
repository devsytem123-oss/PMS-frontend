import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { CommentService } from '../../services/comment-service';
import { createCommentAction, deleteCommentAction, loadCommentAction } from '../actions/comment.action';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';


@Injectable()
export class commentEffects {
  actions$ = inject(Actions);
  commentService=inject(CommentService)

  loadComment=createEffect(()=>{
    return this.actions$.pipe(
        ofType(loadCommentAction.loadComment),
        exhaustMap((action)=>this.commentService.getComments(action.id).pipe(
            map((data)=>loadCommentAction.loadCommentSuccess({payload:data})),
            catchError((error)=>of(loadCommentAction.loadCommentFailure({error:error})))
        ))
    )
  })


  createComment=createEffect(()=>{
    return this.actions$.pipe(
        ofType(createCommentAction.createComment),
        mergeMap((action)=>this.commentService.createComment(action.payload).pipe(
            mergeMap((data)=>[ createCommentAction.createCommentSuccess({payload:data})]
            ),
            catchError((error)=>of(createCommentAction.createCommentFailure({error:error})))
        ))
    )
  })

    deleteComment=createEffect(()=>{
    return this.actions$.pipe(
        ofType(deleteCommentAction.deleteComment),
        mergeMap((action)=>this.commentService.deleteComments(action.id).pipe(
            mergeMap(()=>[ deleteCommentAction.deleteCommentSuccess({id:action.id})]
            ),
            catchError((error)=>of(deleteCommentAction.deleteCommentFailure({error:error})))
        ))
    )
  })
}
