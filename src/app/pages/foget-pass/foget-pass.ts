import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foget-pass',
  imports: [CommonModule,FormsModule],
  templateUrl: './foget-pass.html',
  styleUrl: './foget-pass.css',
})
export class FogetPass {
  email=''
  router=inject(Router)
  authservice=inject(Auth)
 
  onSubmit(){
   console.log(this.email);
   this.authservice.forgetPassword({email:this.email}).subscribe(res=>{
    alert('sent otp')
    this.router.navigateByUrl('/verifyotp')
   })
   
  }



}
