import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { UserService } from '../../services/user-service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';
import { selectUsers } from '../../selectors/user.selector';
import { Observable } from 'rxjs';
import { userAction } from '../../store/actions/user.action';

@Component({
  selector: 'app-users',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users {
  UserService = inject(UserService);
  users$!: Observable<User[]>;
  id: string = '';
  editMode: Boolean = false;
  cdr = inject(ChangeDetectorRef);
  fb = inject(FormBuilder);
  store = inject(Store<{ users: User[] }>);
  constructor() {}

  editForm = this.fb.group({
    name: '',
    email: '',
    role: '',
  });

  ngOnInit() {
    this.store.dispatch(userAction.loadUers())
    this.getAllUsers();
    this.cdr.detectChanges();
  }

  getAllUsers() {
    this.users$ = this.store.select(selectUsers);
  }

  setEditUser(id: string) {
    // console.log(id);
    this.id = id;
    this.UserService.getUserById(id).subscribe((res: User) => {
      // console.log(res);
      this.editForm.patchValue(res);
    });

    this.editMode = true;
  }
  updateForm() {
    const values: User = this.editForm.value;
    this.UserService.editUser(this.id, values).subscribe((res) => {
      alert('user updated successfully');
      this.getAllUsers();
      this.editMode = false;
      this.cdr.detectChanges();
    });
  }
  deleteUser(id: string) {
    this.UserService.deleteUser(id).subscribe(() => {
      alert('User deleted successfully!');
      this.getAllUsers();
    });
  }
}
