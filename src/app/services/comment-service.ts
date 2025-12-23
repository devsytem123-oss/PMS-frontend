import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CommentM } from '../models/comment-m';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  http=inject(HttpClient)


   createComment(data:any):Observable<CommentM>{
   return this.http.post<CommentM>(`${environment.apiUrl}comment`,data,{withCredentials:true})
   }


   getComments(id:string):Observable<CommentM[]>{
    return this.http.get<CommentM[]>(`${environment.apiUrl}comment/${id}`,{withCredentials:true})
   }

   deleteComments(id:any){
    return this.http.delete(`${environment.apiUrl}comment/${id}`,{withCredentials:true})
   }
}
