import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { userAction } from '../../store/actions/user.action';
import { selectUserById } from '../../selectors/user.selector';

@Component({
  selector: 'app-user-detail',
  imports: [CommonModule,RouterLink],
  templateUrl: './user-detail.html',
  styleUrl: './user-detail.css',
})
export class UserDetail {
user$!:Observable<User | undefined>;
store=inject(Store)
  constructor(
    private route: ActivatedRoute,
    
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(userAction.loadUers())
    if (id) {
      // this.fetchUser(id);
      this.user$=this.store.select(selectUserById(id))

    }
  }

  // fetchUser(id: string) {
  //   this.userService.getUserById(id).subscribe(res => {
  //     this.user = res;
  //       this.cdr.detectChanges()
  //   });
  // }
}
