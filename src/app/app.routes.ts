import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { JobApplicationTrackerListComponent } from './job-application-tracker-list/job-application-tracker-list.component';
import { JobApplicationTrackerDetailComponent } from './job-application-tracker-detail/job-application-tracker-detail.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "jobList",
        component: JobApplicationTrackerListComponent
    },
    {
        path: "jobApplicationDetail",
        component: JobApplicationTrackerDetailComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }