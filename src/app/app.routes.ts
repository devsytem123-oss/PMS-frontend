import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { Profile } from './pages/profile/profile';
import { Dashboard } from './pages/dashboard/dashboard';
import { Project } from './pages/project/project';
import { Milestones } from './pages/milestones/milestones';
import { Tasks } from './pages/tasks/tasks';

import { Users } from './pages/users/users';
import { UserDetail } from './pages/user-detail/user-detail';
import { ProjectDetail } from './pages/project-detail/project-detail';
import { ProjectForm } from './pages/project-form/project-form';
import { MilestoneDetail } from './pages/milestone-detail/milestone-detail';
import { TaskDetail } from './pages/task-detail/task-detail';
import { Progress } from './pages/progress/progress';
import { ProgressDetail } from './pages/progress-detail/progress-detail';
import { FogetPass } from './pages/foget-pass/foget-pass';
import { VeriFyotp } from './pages/veri-fyotp/veri-fyotp';
import { ResetPass } from './pages/reset-pass/reset-pass';


export const routes: Routes = [
    {path:'',component:Home},
    {path:'register',component:Register},
    {path:'login',component:Login},
    {path:'profile',component:Profile},
    {path:'dashboard',component:Dashboard},
    {path:'projects',component:Project},
    {path:'milestones',component:Milestones},
     {path:'milestones/:id',component:MilestoneDetail},
    {path:'tasks',component:Tasks},
     {path:'tasks/:id',component:TaskDetail},
     {path:'progress',component:Progress},
   {path:'progress/:id',component:ProgressDetail},
   
    {path:'users',component:Users},
    {path:'users/:id',component:UserDetail},
     {path:'projects/:id',component:ProjectDetail},
     {path:'project',component:ProjectForm},
     {path:'project/:id',component:ProjectForm},
     {path:'forget-password',component:FogetPass},
     {path:'verifyotp',component:VeriFyotp},
     {path:'reset-paasword',component:ResetPass}
     
];
