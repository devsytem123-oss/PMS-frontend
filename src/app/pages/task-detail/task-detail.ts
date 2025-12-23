import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { createCommentAction, deleteCommentAction, loadCommentAction } from '../../store/actions/comment.action';
import { Observable } from 'rxjs';
import { CommentM } from '../../models/comment-m';
import { commentSelecter } from '../../selectors/comment.selecter';
import { roleSelecter } from '../../selectors/roleSelecter';
import { roleAction } from '../../store/actions/role.action';
import { TaskM } from '../../models/task-m';
import { selectTaskById } from '../../selectors/task.selecter';
import { User } from '../../models/user';
import { selectUserByRoleEmp } from '../../selectors/user.selector';
import { assignTaskActions, updateTaskActions } from '../../store/actions/task.action';

@Component({
  selector: 'app-task-detail',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './task-detail.html',
  styleUrl: './task-detail.css',
})
export class TaskDetail {
  task$!: Observable<TaskM | undefined>;
  cdr = inject(ChangeDetectorRef);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  id: any = this.route.snapshot.params['id'];
  comm = false;
  comments$!: Observable<CommentM[]>;
  user: Boolean = false;
  selectedUsers$!: Observable<User[]>;
  Role!: Observable<string>;
  store = inject(Store);
  status: Boolean = false;
  setComment() {
    this.comm = true;
  }
  unSet() {
    this.comm = false;
  }
  getTask() {
    this.task$ = this.store.select(selectTaskById(this.id));
  }

  commForm = this.fb.group({
    text: '',
    taskId: this.id,
  });
  addComment() {
    let value: Partial<CommentM> = this.commForm.value;
    this.store.dispatch(createCommentAction.createComment({ payload: value }));
    alert('Comment Added');
    this.comm = false;
    this.getTask();
    this.getComments()
    this.commForm.reset()
  }

  getComments() {
    this.store.dispatch(loadCommentAction.loadComment({ id: this.id }));
    this.comments$ = this.store.select(commentSelecter);
    this.getTask();
  }

  deleteComment(id: string) {
    this.store.dispatch(deleteCommentAction.deleteComment({id:id}))
    this.getComments()
  }
  ngOnInit() {
    this.getTask();
    this.getComments();
    this.getUsers();
    this.store.dispatch(roleAction.loadRole());
    this.Role = this.store.select(roleSelecter);

  }

  //assign user

  setUser() {
    this.user = true;
  }
  unSetUser() {
    this.user = false;
  }
  userForm = this.fb.group({
    assignedTo: '',
    taskId: this.id,
  });

  getUsers() {
    this.selectedUsers$ = this.store.select(selectUserByRoleEmp);
  }

  assignTask() {
    let value = this.userForm.value;
    this.store.dispatch(assignTaskActions.assignTask({payload:value}))
    alert('Task Assigned Successfully')
    this.user = false;
  }

  //update task status
  setStatus() {
    this.status = true;
  }
  unSetStatus() {
    this.status = false;
  }
  statusForm = this.fb.group({
    status: '',
    taskId: this.id,
  });

  updateStatus() {
    let value:any = this.statusForm.value;
     this.store.dispatch(updateTaskActions.updateTask({payload:value}))
     alert('status updated successfully')
     this.status=false
     this.getTask()
  }
}
