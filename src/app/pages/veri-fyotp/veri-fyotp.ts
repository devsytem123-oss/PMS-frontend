import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-veri-fyotp',
  imports: [FormsModule, CommonModule],
  templateUrl: './veri-fyotp.html',
  styleUrl: './veri-fyotp.css',
})
export class VeriFyotp {
  otp:any
  auth=inject(Auth)
  router=inject(Router)
  

  resendOtp(){

  }
  verifyOtp(){
    this.auth.verifyOtp({otp:this.otp}).subscribe(res=>{
      alert('verified')
  this.router.navigateByUrl('/reset-paasword')
  
    })
    
  }




}