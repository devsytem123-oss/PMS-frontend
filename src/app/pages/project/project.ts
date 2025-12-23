import {  Component, inject } from '@angular/core';
import { ProjectService } from '../../services/project-service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectM } from '../../models/project-m';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { projectSelector } from '../../selectors/project.selecter';
import { deleteProjectAction, projectAction } from '../../store/actions/project.action';
import { roleAction } from '../../store/actions/role.action';
import { roleSelecter } from '../../selectors/roleSelecter';

@Component({
  selector: 'app-project',
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project {
  project!: ProjectM;
  projects!: Observable<ProjectM[]>;
  showDeleteModel: Boolean = false;
  
  deleteId: string = '';
  router = inject(Router);
  Role!:Observable<string>;
  constructor(private PService: ProjectService, private store: Store<{ projects: ProjectM[] }>) {}

  getAllProjects() {
    this.projects = this.store.select(projectSelector);
  }

  ngOnInit() {
    this.store.dispatch(projectAction.loadProject())
    this.getAllProjects();
    this.store.dispatch(roleAction.loadRole())
    this.Role=this.store.select(roleSelecter)
  }

  openDeleteModel(id: string) {
    this.deleteId = id;
    this.showDeleteModel = true;
  }
 
  deleteProject() {
    this.store.dispatch(deleteProjectAction.deleteProject({ id: this.deleteId }));
    alert('Project Deleted Successfully');
    this.getAllProjects();
    this.showDeleteModel = false;
  }
}
