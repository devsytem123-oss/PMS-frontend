import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MilestoneService } from '../../services/milestone-service';
import { TaskService } from '../../services/task-service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProfileService } from '../../services/profile-service';
import { Store } from '@ngrx/store';
import { createTaskAction } from '../../store/actions/task.action';
import { TaskM } from '../../models/task-m';
import { Observable } from 'rxjs';
import { selectTaskByMileId, taskSelector } from '../../selectors/task.selecter';
import { roleSelecter } from '../../selectors/roleSelecter';
import { roleAction } from '../../store/actions/role.action';
import { MileM } from '../../models/mile-m';
import { selectMileById } from '../../selectors/milestone.selector';

@Component({
  selector: 'app-milestone-detail',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './milestone-detail.html',
  styleUrl: './milestone-detail.css',
})
export class MilestoneDetail {
  milestone$!:Observable<MileM | undefined>;
  Tasks$!:Observable<TaskM[]>

 
  route = inject(ActivatedRoute);
 
  store = inject(Store);
  id: any = this.route.snapshot.params['id'];
  task: boolean = false;
  fb = inject(FormBuilder);
  Role!: Observable<string>;
  @ViewChild('taskFormSection') taskFormSection!: ElementRef;

  getMileStone() {
    this.milestone$=this.store.select(selectMileById(this.id))
    this.Tasks$=this.store.select(selectTaskByMileId(this.id))
  }
  setTask() {
    this.task = true;

    setTimeout(() => {
      this.taskFormSection?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 0);
  }
  unSet() {
    this.task = false;
  }

  ngOnInit() {
    this.store.dispatch(roleAction.loadRole());
    this.Role = this.store.select(roleSelecter);
    this.getMileStone();
  }

  taskForm = this.fb.group({
    title: '',
    description: '',
    milestoneId: this.id,
  });

  createTask() {
    let value: Partial<TaskM> = this.taskForm.value;
    this.store.dispatch(createTaskAction.createTask({ payload: value }));
    this.getMileStone();
    this.task = false;
  }
}
