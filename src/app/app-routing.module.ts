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
import { TaskFormComponent } from './components/task-form/task-form.component';
import { ListStudentsEnrolledComponent } from './components/list-students-enrolled/list-students-enrolled.component';
import { ListTaskStudentSubjectComponent } from './components/list-task-student-subject/list-task-student-subject.component';
import { ReviewTaskSubmittedComponent } from './components/review-task-submitted/review-task-submitted.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LogInComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'student/home', component: HomeStudentComponent },
  { path: 'student/enrolled', component: EnrolledSubjectComponent },
  { path: 'proffesor/home', component: HomeProffesorComponent },
  { path: 'proffesor/subject/new', component: SubjectFormComponent },
  { path: 'proffesor/review/form', component: ReviewFormComponent },
  { path: 'proffesor/task', component: TaskForStudentComponent },
  { path: 'student/task', component: TaskFormComponent },
  { path: 'proffesor/subject/students/:idSubject', component: ListStudentsEnrolledComponent },
  { path: 'proffesor/tasks/:idSubject/:idStudent', component: ListTaskStudentSubjectComponent },
  { path: 'proffesor/task/submitted/:idTask', component: ReviewTaskSubmittedComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
