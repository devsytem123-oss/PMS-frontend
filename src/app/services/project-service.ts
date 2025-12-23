import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ProjectM } from '../models/project-m';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  http=inject(HttpClient)


  getProjects():Observable<ProjectM[]>{
   return this.http.get<ProjectM[]>(`${environment.apiUrl}project`,{withCredentials:true})
  }

  getProjectByid(id:string):Observable<ProjectM>{
   return this.http.get<ProjectM>(`${environment.apiUrl}project/${id}`,{withCredentials:true})
  }

  createProjects(data:ProjectM):Observable<ProjectM>{
   return this.http.post<ProjectM>(`${environment.apiUrl}project`,data,{withCredentials:true})
  }

  updateProject(id:any,data:ProjectM):Observable<ProjectM>{
     return this.http.put<ProjectM>(`${environment.apiUrl}project/${id}`,data,{withCredentials:true})
  }

  deleteProject(id:string):Observable<ProjectM>{
     return this.http.delete<ProjectM>(`${environment.apiUrl}project/${id}`,{withCredentials:true})
  }

  progress(id:string):Observable<ProjectM>{
     return this.http.get(`${environment.apiUrl}progress/${id}`,{withCredentials:true})
  }
}
