import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ProfileService } from '../../services/profile-service';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { routes } from '../../app.routes';
import { Router } from '@angular/router';
import { ProfileM } from '../../models/profile';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { profileSelecter } from '../../selectors/profile.selecter';
import { profileAction } from '../../store/actions/profile.action';
@Component({
  selector: 'app-profile',
  imports: [NgIf, ReactiveFormsModule, CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile {
  profileService = inject(ProfileService);
  cdr = inject(ChangeDetectorRef);
  fb = inject(FormBuilder);
  router = inject(Router);
  profileData$!: Observable<ProfileM>;
  store = inject(Store<{ profile: ProfileM }>);
 
  editMode = false;
  constructor() {}

  profileForm = this.fb.group({
    phone: null as number | null,
    address: '',
    skills: '',
  });

  ngOnInit() {
    this.store.dispatch(profileAction.loadProfile());
    
    this.loadProfile();
  }

   updateStatus(){
    this.editMode=false
   }
  loadProfile() {
    this.profileData$ = this.store.select(profileSelecter);
    this.profileData$.subscribe((res)=>{
      if(res ){
       
        this.profileForm.patchValue(res)
      }
    })
   
  }

  addProfile() {
    console.log('p', this.profileForm.value);
    let values: ProfileM = this.profileForm.value;
    this.profileService.creatProfile(values).subscribe((res) => {
      alert('profile created');
      this.loadProfile();
    });
  }
  update() {
    let values: ProfileM = this.profileForm.value;
    this.profileService.updateProfile(values).subscribe((res) => {
      alert('profile updated');
      this.editMode = false;
      this.loadProfile();
      this.cdr.detectChanges()
    });
  }
  deleteProfile() {
    this.profileService.deleteProfile().subscribe((res) => {
      alert('profile deleted successfully');
      this.router.navigateByUrl('/');
    });
  }
}
