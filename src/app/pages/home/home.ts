import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Auth } from '../../services/auth';

import { Store } from '@ngrx/store';
import { roleSelecter } from '../../selectors/roleSelecter';
import { roleAction } from '../../store/actions/role.action';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgIf, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  private router = inject(Router);
  private auth = inject(Auth);

  private cdr = inject(ChangeDetectorRef);
  store = inject(Store);
  private destroy$ = new Subject<void>();

  isMenuOpen = false;
  isProfileMenuOpen = false;
  isLoggedIn = false;
  role$!: Observable<string>;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout() {
    this.auth
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          alert('User logged out');
          this.store.dispatch(roleAction.clearRole());
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          console.error('Logout failed', err);

          this.router.navigateByUrl('/login');
        },
      });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn;
    this.store.dispatch(roleAction.loadRole());
    this.role$ = this.store.select(roleSelecter);

    console.log('Current Role:', this.role$);

    this.auth.isLoggedIn$.pipe(takeUntil(this.destroy$)).subscribe((status) => {
      this.isLoggedIn = status;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
