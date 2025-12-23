import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TaskM } from '../models/task-m';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {


  constructor(private http:HttpClient){

  }
    
  createTask(data:any):Observable<TaskM>{
    return this.http.post<TaskM>(`${environment.apiUrl}task`,data,{withCredentials:true})
  }

  getAllTasks():Observable<TaskM[]>{
     return this.http.get<TaskM[]>(`${environment.apiUrl}task`,{withCredentials:true})
  }

  getTaskById(id:any){
   return this.http.get(`${environment.apiUrl}task/${id}`,{withCredentials:true})
  }


  assignTask(data:any):Observable<TaskM>{
    return this.http.put<TaskM>(`${environment.apiUrl}task`,data,{withCredentials:true})
  }

  updateStatus(data:any):Observable<TaskM>{
    return this.http.patch<TaskM>(`${environment.apiUrl}task/status`,data,{withCredentials:true})
  }
  delete(id:string){
    return this.http.delete(`${environment.apiUrl}task/${id}`,{withCredentials:true})
  }
}
