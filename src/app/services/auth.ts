import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

/**
 * Auth service
 * - Exposes isLoggedIn$ and role$ as reactive streams (BehaviorSubject)
 * - Persists role to localStorage
 * - Keeps subjects in sync on login/logout/autoLogin
 *
 * Adjust API response shape handling (res?.user?.role, res?.role, res?.token) to match your backend.
 */
@Injectable({ providedIn: 'root' })
export class Auth {
  private http = inject(HttpClient);

  // Hydrate from storage so app components get initial values immediately
  private _isLoggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('accessToken'));
  public isLoggedIn$ = this._isLoggedIn.asObservable();

  private roleSubject = new BehaviorSubject<string>(localStorage.getItem('userRole') || '');
  public role$ = this.roleSubject.asObservable();

  constructor() {}

  // synchronous getters when needed
  get isLoggedIn(): boolean {
    return this._isLoggedIn.value;
  }

  get role(): string {
    return this.roleSubject.value;
  }

  // Update role reactively and persistently
  setRole(role: string) {
    const normalized = role || '';
    this.roleSubject.next(normalized);
    if (normalized) {
      localStorage.setItem('userRole', normalized);
    } else {
      localStorage.removeItem('userRole');
    }
  }

  // Register (no immediate reactive changes)
  register(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}register`, data);
  }

  // Login: update reactive state based on API response
  login(data: any): Observable<any> {
    return this.http
      .post<any>(`${environment.apiUrl}login`, data, { withCredentials: true })
      .pipe(
        tap((res) => {
          // Adjust the extraction based on your API's response structure
          const role = res?.user?.role || res?.role || '';
          const token = res?.token || res?.accessToken || '';

          if (token) {
            localStorage.setItem('accessToken', token);
          }

          this._isLoggedIn.next(true);
          this.setRole(role);
        })
      );
  }

  // Logout: call API and clear local state
  logout(): Observable<any> {
    return this.http
      .post(`${environment.apiUrl}logout`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this._isLoggedIn.next(false);
          this.setRole('');
          localStorage.removeItem('accessToken');
        })
      );
  }

  // autoLogin: hydrate state from server/session
  autoLogin(): Observable<any> {
    return this.http
      .get<any>(`${environment.apiUrl}autoLogin`, { withCredentials: true })
      .pipe(
        tap((res) => {
          if (res?.isAuthenticated) {
            this._isLoggedIn.next(true);
            const role = res?.user?.role || localStorage.getItem('userRole') || '';
            this.setRole(role);
          } else {
            this._isLoggedIn.next(false);
            this.setRole('');
          }
        })
      );
  }


  forgetPassword(data:{email:string}){
    console.log('d',data);
    
    return this.http.post(`${environment.apiUrl}forgotPassword`,data,{withCredentials:true})
  }
   verifyOtp(data:any){
    return this.http.post(`${environment.apiUrl}verifyOtp`,data,{withCredentials:true})
  }
   resetPassword(data:any){
    return this.http.post(`${environment.apiUrl}resetPassword`,data,{withCredentials:true})
  }
}