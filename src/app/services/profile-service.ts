import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProfileM } from '../models/profile';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http=inject(HttpClient)

  getProfile():Observable<ProfileM>{
   return this.http.get<ProfileM>(`${environment.apiUrl}profile`,{withCredentials:true})
  }

  creatProfile(data:ProfileM){
    console.log('d',data);
    return this.http.post<ProfileM>(`${environment.apiUrl}profile`,data,{withCredentials:true})
  }

  updateProfile(data:ProfileM):Observable<ProfileM>{
    return this.http.put<ProfileM>(`${environment.apiUrl}profile`,data,{withCredentials:true})
  }

  deleteProfile():Observable<ProfileM>{
    return this.http.delete<ProfileM>(`${environment.apiUrl}profile`,{withCredentials:true})
  }

  getProfileById(id:string):Observable<ProfileM>{
    return this.http.get<ProfileM>(`${environment.apiUrl}profile/${id}`,{withCredentials:true})
  }

  getRole():Observable<string>{
    return this.http.get<string>(`${environment.apiUrl}getRole`,{withCredentials:true})
  }
}
