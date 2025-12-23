import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { progressAction } from '../../store/actions/progress.action';
import { Observable } from 'rxjs';
import { progressSelecter } from '../../selectors/progress.selecter';

@Component({
  selector: 'app-progress-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './progress-detail.html',
  styleUrl: './progress-detail.css',
})
export class ProgressDetail {
  project$!: Observable<any>;
  route = inject(ActivatedRoute);
  id: string = this.route.snapshot.params['id'];
  store = inject(Store);

  ngOnInit() {
    this.store.dispatch(progressAction.loadProgress({ id: this.id }));
    this.project$ = this.store.select(progressSelecter);
  }
}
