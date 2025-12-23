import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { roleSelecter } from '../../selectors/roleSelecter';
import { roleAction } from '../../store/actions/role.action';
import { ProfileM } from '../../models/profile';
import { profileSelecter } from '../../selectors/profile.selecter';
import { profileAction } from '../../store/actions/profile.action';
import { ProjectM } from '../../models/project-m';
import { projectAction } from '../../store/actions/project.action';
import { projectSelector } from '../../selectors/project.selecter';
import { taskAction } from '../../store/actions/task.action';
import { TaskM } from '../../models/task-m';
import { taskSelector } from '../../selectors/task.selecter';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  cdr = inject(ChangeDetectorRef);
  currentUser!: Observable<ProfileM>;
  totalProjects: any;
  activeTasks: any;
  completedTasks: any;
  upcomingMilestones: any;
  Role!: Observable<string>;
  project$!: Observable<ProjectM[]>;
  task$!: Observable<TaskM[]>;
  recentProjects: any[] = [];
  recentTasks: any[] = [];
  loading = true;
  store = inject(Store);
  Project = {
    title: 'Projects',
    icon: '📊',
    description: 'Manage and track all your projects',
    route: '/projects',
    color: 'gradient-blue',
    stats: 'View all projects',
  };

  Task = {
    title: 'Tasks',
    icon: '✅',
    description: 'Organize and complete your tasks',
    route: '/tasks',
    color: 'gradient-green',
    stats: 'Manage tasks',
  };

  Mile = {
    title: 'Milestones',
    icon: '🎯',
    description: 'Track important project milestones',
    route: '/milestones',
    color: 'gradient-purple',
    stats: 'View milestones',
  };

  Progress = {
    title: 'Project Project',

    description: 'View Project Progress',
    route: '/progress',
    color: 'gradient-pink',
    stats: 'View Progress',
  };

  constructor(private router: Router, private authService: Auth) {}

  ngOnInit(): void {
    this.loadDashboardData();
    console.log(this.totalProjects);
    this.store.dispatch(roleAction.loadRole());
    this.Role = this.store.select(roleSelecter);
    this.store.dispatch(profileAction.loadProfile());
    this.currentUser = this.store.select(profileSelecter);
    this.cdr.detectChanges();
  }

  loadDashboardData() {
    this.store.dispatch(projectAction.loadProject());
    this.project$ = this.store.select(projectSelector);
    this.project$.subscribe({
      next: (projects: any) => {
        console.log('p', projects);

        const count = projects.length;

        if (count) {
          this.totalProjects = count;
        } else {
          this.totalProjects = 0;
        }
        this.recentProjects = projects.slice(0, 3);
      },
      error: (error) => console.error('Error loading projects:', error),
    });

    // Load tasks
    this.store.dispatch(taskAction.loadTask());
    this.task$ = this.store.select(taskSelector);
    this.task$.subscribe({
      next: (tasks: any) => {
        this.activeTasks = tasks.filter(
          (t: any) => t.status === 'pending' || t.status === 'in-progress'
        ).length;
        this.completedTasks = tasks.filter((t: any) => t.status === 'completed').length;
        this.recentTasks = tasks.slice(0, 5);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.loading = false;
      },
    });

    // Simulate milestones data
    this.upcomingMilestones = 3;
  }

  navigateToPage(route: string): void {
    this.router.navigate([route]);
  }

  logout() {
    this.authService.logout().subscribe((res) => {
      localStorage.clear();
      alert('user logged out');
      this.router.navigateByUrl('/');
    });
  }
}
