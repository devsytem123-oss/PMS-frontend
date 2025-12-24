import { ChangeDetectorRef, Component, ElementRef, inject, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProjectM } from '../../models/project-m';
import { MileM } from '../../models/mile-m';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { roleSelecter } from '../../selectors/roleSelecter';
import { roleAction } from '../../store/actions/role.action';
import { createMileAction } from '../../store/actions/milestone.action';
import { selectProjectById } from '../../selectors/project.selecter';
import { selectMileByProId } from '../../selectors/milestone.selector';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetail {
  project$!:Observable<ProjectM | undefined>;
 
  
  cdr = inject(ChangeDetectorRef);
  router = inject(Router);
  route = inject(ActivatedRoute);
  milestone$!:Observable<MileM[]>
  mile: Boolean = false;
  fb = inject(FormBuilder);
  Role!: Observable<string>;
  id: string = this.route.snapshot.params['id'];
  store = inject(Store);
  mileForm = this.fb.group({
    name: '',
    description: '',
    status: '',
    dueDate: null,
    projectId: this.id,
  });

  @ViewChild('mileFormSection') mileFormSection!: ElementRef;

  openProject() {
    console.log(this.id);
    this.project$= this.store.select(selectProjectById(this.id))
    this.milestone$=this.store.select(selectMileByProId(this.id))
  }

  viewProfile(id: string) {
    this.router.navigate(['users', id]);
  }
  setMile() {
    this.mile = true;
    setTimeout(() => {
      this.mileFormSection.nativeElement?.scrollIntoView({});
    });
  }

  createMilestone() {
    let v: MileM = {
      ...this.mileForm.value,
      projectId: this.id
    };

    this.store.dispatch(createMileAction.createMile({ payload: v }));
    alert('Milestone Created');
    this.mile = false;
    this.openProject();
    this.mileForm.reset();  
  }

  ngOnInit() {
    this.openProject();
    this.store.dispatch(roleAction.loadRole());
    this.Role = this.store.select(roleSelecter);
  }
}
