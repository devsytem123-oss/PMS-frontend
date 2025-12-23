import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { CommentM } from "../../models/comment-m";



export  const loadCommentAction=createActionGroup({
    source:'Comment API',
    events:{
        'load Comment':props<{id:string}>(),
        'load Comment Success':props<{payload:CommentM[]}>(),
        'load Comment Failure':props<{error:string}>()
    }
})

export  const createCommentAction=createActionGroup({
    source:'Comment API',
    events:{
        'Create Comment':props<{payload:Partial<CommentM>}>(),
        'Create Comment Success':props<{payload:CommentM}>(),
        'Create Comment Failure':props<{error:string}>()
    }
})

export  const deleteCommentAction=createActionGroup({
    source:'Comment API',
    events:{
        'Delete Comment':props<{id:string}>(),
        'Delete Comment Success':props<{id:string}>(),
        'Delete Comment Failure':props<{error:string}>()
    }
})