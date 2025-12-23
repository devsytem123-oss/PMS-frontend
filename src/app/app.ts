import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Auth } from './services/auth';
import { Store } from '@ngrx/store';
import { projectAction } from './store/actions/project.action';
import { mileAction } from './store/actions/milestone.action';
import { taskAction } from './store/actions/task.action';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('PMS');
  cdr = inject(ChangeDetectorRef);
  store = inject(Store);
  constructor(private authService: Auth) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.store.dispatch(projectAction.loadProject())
    this.store.dispatch(mileAction.loadMile())
    this.store.dispatch(taskAction.loadTask())
    this.store.dispatch(taskAction.loadTask())
  
  }
}
