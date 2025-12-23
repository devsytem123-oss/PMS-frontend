import {  Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TaskM } from '../../models/task-m';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectTaskByMileId, selectTaskByProId, selectTaskByUserId, taskSelector } from '../../selectors/task.selecter';
import { mileSelector, selectMileByProId } from '../../selectors/milestone.selector';
import { MileM } from '../../models/mile-m';
import { ProjectM } from '../../models/project-m';
import { projectSelector } from '../../selectors/project.selecter';
import { roleSelecter } from '../../selectors/roleSelecter';
import { roleAction } from '../../store/actions/role.action';
import { deleteTaskActions, taskAction } from '../../store/actions/task.action';
import { projectAction } from '../../store/actions/project.action';
import { mileAction } from '../../store/actions/milestone.action';
import { profileSelecter } from '../../selectors/profile.selecter';
import { profileAction } from '../../store/actions/profile.action';
import { ProfileM } from '../../models/profile';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, RouterLink],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
})
export class Tasks {
  projects!: Observable<ProjectM[]>;
  milestones!: Observable<MileM[]>;
  tasks!: Observable<TaskM[]>;
  projectId!: string;
  milestoneId!: string;
  store = inject(Store<{ tasks: TaskM[] }>);
  Role!: Observable<string>;
  profile$!:Observable<ProfileM>
  userId?:string
  taskByUserId!:Observable<TaskM[] >
  getAllProjects() {
    this.projects = this.store.select(projectSelector);
  }

  getAllTasks() {
    this.tasks = this.store.select(taskSelector);
  }

  getMilestone() {
    this.milestones = this.store.select(mileSelector);
  }

  filterByProject(event: any) {
    this.projectId = event.target.value;
    if (!this.projectId) {
      this.milestones = this.store.select(mileSelector);
      this.tasks = this.store.select(taskSelector);
      return;
    }
    this.milestones = this.store.select(selectMileByProId(this.projectId));
    this.tasks = this.store.select(selectTaskByProId(this.projectId));
  }

  filterByMilestone(event: any) {
    this.milestoneId = event.target.value;
    if (!this.milestoneId) {
      this.tasks = this.store.select(taskSelector);
    }

    this.tasks = this.store.select(selectTaskByMileId(this.milestoneId));
  }

  ngOnInit() {
    this.store.dispatch(projectAction.loadProject())
    this.getAllProjects();
    this.store.dispatch(taskAction.loadTask())
    this.getAllTasks();
    this.store.dispatch(mileAction.loadMile())
    this.getMilestone();
    this.store.dispatch(roleAction.loadRole());
    this.Role = this.store.select(roleSelecter);
    this.store.dispatch(profileAction.loadProfile())
    this.profile()
    
  }

  profile(){
    this.profile$=this.store.select(profileSelecter)
    this.profile$.subscribe((res)=>{
      this.userId= res?.userId?._id ?? undefined
      if(this.userId){
      this.taskByUserId= this.store.select(selectTaskByUserId(this.userId))
      console.log('i',this.userId);
      
      }
    })
  }

  deleteTask(id: string) {
    this.store.dispatch(deleteTaskActions.deleteTask({id:id}))
    alert('Task Deleted')
    this.getAllTasks()
  }
}
