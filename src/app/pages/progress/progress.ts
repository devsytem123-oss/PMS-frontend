import { CommonModule } from '@angular/common';
import {  Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Observable } from 'rxjs';
import { ProjectM } from '../../models/project-m';
import { Store } from '@ngrx/store';
import { projectSelector } from '../../selectors/project.selecter';

@Component({
  selector: 'app-progress',
  imports: [RouterLink, CommonModule],
  templateUrl: './progress.html',
  styleUrl: './progress.css',
})
export class Progress {
   projects!:Observable<ProjectM[]>
   store=inject(Store)
   ngOnInit(){
     this.projects=this.store.select(projectSelector)
   }
}
