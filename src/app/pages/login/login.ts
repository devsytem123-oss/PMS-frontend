import { ChangeDetectorRef, Component, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { Store } from '@ngrx/store';
import { roleAction } from '../../store/actions/role.action';
@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  router = inject(Router);
  fb = inject(FormBuilder);
  AuthService = inject(Auth);
  showPassword: Boolean = false;
  loginForm = this.fb.group({ email: '', password: '', rememberMe: '' });
  cdr = inject(ChangeDetectorRef);
  store = inject(Store<{ role: string }>);
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  login() {
    console.log(this.loginForm.value);
    let values = this.loginForm.value;
    this.AuthService.login(values).subscribe((res: any) => {
      this.store.dispatch(roleAction.loadRole());
      alert('you are logged in');

      console.log('y', res);
      if (res?.role) {
        localStorage.setItem('userRole', res.role); // ← Store role
      }
      // localStorage.setItem('token',res.token)
      this.cdr.detectChanges();
    });
    this.router.navigateByUrl('/');
  }
}
