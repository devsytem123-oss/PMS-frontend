import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MileM } from '../models/mile-m';

@Injectable({
  providedIn: 'root',
})
export class MilestoneService {
  http=inject(HttpClient)

  getMilestones(){
   return this.http.get<MileM[]>(`${environment.apiUrl}milestone`,{withCredentials:true})
  }

  addMilestone(data:any){
  return this.http.post(`${environment.apiUrl}milestone`,data,{withCredentials:true})
  }

  deleteMileStone(id:any){
    return this.http.delete(`${environment.apiUrl}milestone/${id}`,{withCredentials:true})
  }
  getMilestoneById(id:any){
    return this.http.get(`${environment.apiUrl}milestone/${id}`,{withCredentials:true})
  }
}

