import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeStudentComponent } from './components/home-student/home-student.component';
import { HomeProffesorComponent } from './components/home-proffesor/home-proffesor.component';
import { SubjectFormComponent } from './components/subject-form/subject-form.component';
import { EnrolledSubjectComponent } from './components/enrolled-subject/enrolled-subject.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { TaskForStudentComponent } from './components/task-for-student/task-for-student.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'student/home', component: HomeStudentComponent },
  { path: 'student/enrolled', component: EnrolledSubjectComponent },
  { path: 'proffesor/home', component: HomeProffesorComponent },
  { path: 'proffesor/subject/new', component: SubjectFormComponent },
  { path: 'proffesor/review/form', component: ReviewFormComponent },
  { path: 'proffesor/task', component: TaskForStudentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
