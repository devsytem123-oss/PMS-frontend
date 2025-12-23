import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProjectM } from '../models/project-m';


export const projectSelector =createFeatureSelector<ProjectM[]>('projects');

export const selectProjectById = (id: string) =>
  createSelector(
    projectSelector,
    (projects): ProjectM| undefined =>
      projects.find(project => project._id === id)
  );
