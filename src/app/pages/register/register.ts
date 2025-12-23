import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
 private fb=inject(FormBuilder)
AuthService=inject(Auth)
router=inject(Router)
 registerForm=this.fb.group({
   name:'',
   email:'',
   password:'',
   role:''

 })

 registerUser(){
  // console.log(this.registerForm.value);
  let values=this.registerForm.value;
this.AuthService.register(values).subscribe((result:any)=>{
  
})
alert('user registered successfully')
 this.router.navigateByUrl('/login')
  
 }

}
