import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http=inject(HttpClient)

  getAllUsers():Observable<User[]>{
   return this.http.get<User[]>(`${environment.apiUrl}user`,{withCredentials:true})
  }

   getUserById(id:string):Observable<User>{
    return this.http.get<User>(`${environment.apiUrl}user/${id}`,{withCredentials:true})
   }
 
  createUser(data:User):Observable<User>{
    return this.http.post<User>(`${environment.apiUrl}user`,data,{withCredentials:true})
  }

  editUser(id:string,data:User):Observable<User>{
    return this.http.put<User>(`${environment.apiUrl}user/${id}`,data,{withCredentials:true})
  }

   deleteUser(id:string):Observable<User>{
    return this.http.delete(`${environment.apiUrl}user/${id}`,{withCredentials:true})
   }
}
