import { CommonModule } from '@angular/common';
import {  Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';
import { MileM } from '../../models/mile-m';
import { Store } from '@ngrx/store';
import { mileSelector, selectMileByProName } from '../../selectors/milestone.selector';
import { deleteMileAction, mileAction } from '../../store/actions/milestone.action';
import { roleSelecter } from '../../selectors/roleSelecter';
import { roleAction } from '../../store/actions/role.action';

@Component({
  selector: 'app-milestones',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './milestones.html',
  styleUrl: './milestones.css',
})
export class Milestones {
  selectedProject!: string;
  projectList$!: Observable<string[]>;
  filteredMilestones$!: Observable<MileM[]>;
  milestones!: Observable<MileM[]>;
  store = inject(Store<{ miles: MileM[] }>);
  Role!:Observable<string>;

  getAllMile() {
    this.milestones = this.store.select(mileSelector);

    this.projectList$ = this.milestones.pipe(
      map((milestone) => {
        const names = milestone
          .map((m) => {
            return m.projectId?.name;
          })
          .filter((name): name is string => !!name);
        return [...new Set(names)].sort();
      })
    );
  }

  ngOnInit() {
    this.store.dispatch(mileAction.loadMile())
    this.getAllMile();
    this.store.dispatch(roleAction.loadRole())
    this.Role=this.store.select(roleSelecter)
  }

  filterMilestones() {
    if (!this.selectedProject) {
      this.filteredMilestones$ = this.store.select(mileSelector);
    } else {
      this.filteredMilestones$ = this.store.select(selectMileByProName(this.selectedProject));
    }
  }

  deleteMile(id: any) {
    this.store.dispatch(deleteMileAction.deleteMile({ id: id }));
    alert('Milestone Deleted');
    this.getAllMile();
  }
}
