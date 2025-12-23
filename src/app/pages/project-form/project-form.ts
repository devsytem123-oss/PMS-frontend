import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { ActivatedRoute, Router } from '@angular/router';
import { ProjectM } from '../../models/project-m';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { addProjectAction, updateProjectAction } from '../../store/actions/project.action';
import { Observable, of } from 'rxjs';
import { selectUserByRole } from '../../selectors/user.selector';
import { selectProjectById } from '../../selectors/project.selecter';

@Component({
  selector: 'app-project-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-form.html',
  styleUrl: './project-form.css',
})
export class ProjectForm {
  managers: Observable<User[]> = of([]);

  fb = inject(FormBuilder);

  router = inject(Router);
  isEdit = false;
  route = inject(ActivatedRoute);
  store = inject(Store);
  id = this.route.snapshot.params['id'];
  project$!: Observable<ProjectM | undefined>;
  projectForm = this.fb.group({
    name: '',
    description: '',
    assignedTo: '',
    startDate: '',
    endDate: '',
  });
  createProject() {
    let value: ProjectM = this.projectForm.value;
    this.store.dispatch(addProjectAction.addProject({ payload: value }));
    this.router.navigateByUrl('/projects');
  }

  ngOnInit() {
    if (this.id) {
      this.isEdit = true;
    }
    this.getProject();
    this.managers = this.store.select(selectUserByRole);
  }

  // edit Project
  formatDate(date?: string | null): string {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  }

  getProject() {
    this.project$ = this.store.select(selectProjectById(this.id));
    this.project$.subscribe((res) => {
      if (this.isEdit) {
        if (!res) return;

        const start = this.formatDate(res.startDate);
        const end = this.formatDate(res.endDate);
        this.projectForm.patchValue({
          name: res.name,
          description: res?.description,
          assignedTo: res.assignedTo,
          startDate: start,
          endDate: end,
        });
      }
    });
  }

  editProject() {
    let value: Partial<ProjectM> = this.projectForm.value;
    this.store.dispatch(updateProjectAction.updateProject({ id: this.id, payload: value }));
    alert('project Updated');
    this.router.navigateByUrl('/projects');
  }
}
