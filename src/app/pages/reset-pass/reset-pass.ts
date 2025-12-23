import { CommonModule } from '@angular/common';
import { Component,inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-pass',
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './reset-pass.html',
  styleUrl: './reset-pass.css',
})
export class ResetPass {
  
  fb=inject(FormBuilder)
  authService=inject(Auth)
  router=inject(Router)
  resetForm=this.fb.group({
  email:'',
  password:'',
  confirmPassword:'',
  
  })



  resetPassword() {
   
   let pass1=this.resetForm.value.password
   let pass2=this.resetForm.value.confirmPassword
   let email=this.resetForm.value.email
   if (pass1 !== pass2) {
      alert("Passwords do not match!");
      return;
    }
    
  this.authService.resetPassword({email:email,newPassword:pass2}).subscribe(res=>{
    alert('Password Changed Successfully')
  })
    console.log("New Password:", pass2);
    this.router.navigateByUrl('/login')
  }
}
