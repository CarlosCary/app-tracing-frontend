import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/accounts/log-in/log-in.component';
import { RegisterComponent } from './components/accounts/register/register.component';
import { HomeStudentComponent } from './components/student/home-student/home-student.component';
import { HomeProffesorComponent } from './components/proffesor/home-proffesor/home-proffesor.component';
import { SubjectFormComponent } from './components/proffesor/subject-form/subject-form.component';
import { EnrolledSubjectComponent } from './components/student/enrolled-subject/enrolled-subject.component';
import { ReviewFormComponent } from './components/proffesor/review-form/review-form.component';
import { TaskForStudentComponent } from './components/proffesor/task-for-student/task-for-student.component';
import { TaskFormComponent } from './components/student/task-form/task-form.component';
import { ListStudentsEnrolledComponent } from './components/proffesor/list-students-enrolled/list-students-enrolled.component';
import { ListTaskStudentSubjectComponent } from './components/proffesor/list-task-student-subject/list-task-student-subject.component';
import { ReviewTaskSubmittedComponent } from './components/proffesor/review-task-submitted/review-task-submitted.component';
import { ListStudentsTasksComponent } from './components/proffesor/list-students-tasks/list-students-tasks.component';
import { MyFormsTasksHomeComponent } from './components/proffesor/my-forms-tasks-home/my-forms-tasks-home.component';
import { MyFormTaskComponent } from './components/proffesor/my-form-task/my-form-task.component';
import { EditMyFormTaskComponent } from './components/proffesor/edit-my-form-task/edit-my-form-task.component';
import { MyFormReviewHomeComponent } from './components/proffesor/my-form-review-home/my-form-review-home.component';
import { MyFormReviewComponent } from './components/proffesor/my-form-review/my-form-review.component';
import { MyFormReviewEditComponent } from './components/proffesor/my-form-review-edit/my-form-review-edit.component';
import { ReviewersFormComponent } from './components/proffesor/reviewers-form/reviewers-form.component';
import { NewFeedbackDocumentReviewerComponent } from './components/proffesor/new-feedback-document-reviewer/new-feedback-document-reviewer.component';
import { ListFeedbackDocumentReviewerComponent } from './components/proffesor/list-feedback-document-reviewer/list-feedback-document-reviewer.component';
import { ProffesorsReviewComponent } from './components/proffesor/proffesors-review/proffesors-review.component';
import { NewAssignClassroomComponent } from './components/proffesor/new-assign-classroom/new-assign-classroom.component';
import { EditReviewersFormComponent } from './components/proffesor/edit-reviewers-form/edit-reviewers-form.component';
import { EditTaskDateComponent } from './components/proffesor/edit-task-date/edit-task-date.component';
import { AdministratorHomeComponent } from './components/administrator/administrator-home/administrator-home.component';
import { NewProffesorAccountComponent } from './components/administrator/new-proffesor-account/new-proffesor-account.component';
import { EditProffesorAccountComponent } from './components/administrator/edit-proffesor-account/edit-proffesor-account.component';
import { EditMyPersonalDataComponent } from './components/accounts/edit-my-personal-data/edit-my-personal-data.component';
import { ChangePasswordComponent } from './components/accounts/change-password/change-password.component';
import { DocumentsAssignedTutorComponent } from './components/proffesor/documents-assigned-tutor/documents-assigned-tutor.component';
import { DocumentsAssignedRapporteurComponent } from './components/proffesor/documents-assigned-rapporteur/documents-assigned-rapporteur.component';
import { ListSubjectFilesComponent } from './components/utils/list-subject-files/list-subject-files.component';
import { NewSubjectFileComponent } from './components/utils/new-subject-file/new-subject-file.component';
import { AssignReviewersComponent } from './components/proffesor/assign-reviewers/assign-reviewers.component';
import { EditReviewersComponent } from './components/proffesor/edit-reviewers/edit-reviewers.component';

import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'student/home', canActivate: [AuthGuard] },
  { path: 'login', component: LogInComponent, canActivate: [LoginGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoginGuard] },
  { path: 'student/home', component: HomeStudentComponent, canActivate: [AuthGuard], 
    data: { roles: ['student']} },
  { path: 'student/enrolled', component: EnrolledSubjectComponent, canActivate: [AuthGuard], 
    data: { roles: ['student']} },
  { path: 'proffesor/home', component: HomeProffesorComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'proffesor/subject/new', component: SubjectFormComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'proffesor/review/form', component: ReviewFormComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'proffesor/task/:idSubject', component: TaskForStudentComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'student/task/:idTask/:idSubject', component: TaskFormComponent, canActivate: [AuthGuard], 
    data: { roles: ['student']} },
  { path: 'proffesor/subject/students/:idSubject', component: ListStudentsEnrolledComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'proffesor/tasks/:idSubject/:idStudent', component: ListTaskStudentSubjectComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'proffesor/task/submitted/:idTask/:idTaskSubmitted/:idStudent', component: ReviewTaskSubmittedComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'proffesor/students/tasks/:idTask/:taskName', component: ListStudentsTasksComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'proffesor/forms/task', component: MyFormsTasksHomeComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'proffesor/new/form/task', component: MyFormTaskComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'proffesor/edit/form/task/:idFormTask', component: EditMyFormTaskComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'proffesor/forms/review', component: MyFormReviewHomeComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'proffesor/new/form/review', component: MyFormReviewComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'proffesor/edit/form/review/:idReviewForm', component: MyFormReviewEditComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'proffesor/reviewers/:idSubmittedTask/:idStudent', component: ReviewersFormComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'proffesor/new/review/:idReview/:taskName', component: NewFeedbackDocumentReviewerComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'proffesor/documents/review', component: ListFeedbackDocumentReviewerComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'proffesors/review/:idReview/:taskName', component: ProffesorsReviewComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'student', 'director']} },
  { path: 'proffesors/new/assign/classroom/:idTaskSubmitted', component: NewAssignClassroomComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'proffesor/reviewers/edit/:idSubmittedTask/:idTask/:idStudent', component: EditReviewersFormComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'proffesor/task/edit/:idTask', component: EditTaskDateComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'administrator/home', component: AdministratorHomeComponent, canActivate: [AuthGuard], 
  data: { roles: ['administrator']} },
  { path: 'administrator/new/account', component: NewProffesorAccountComponent, canActivate: [AuthGuard], 
  data: { roles: ['administrator']} },
  { path: 'administrator/edit/account/:idProffesorAccount', component: EditProffesorAccountComponent, canActivate: [AuthGuard], 
  data: { roles: ['administrator']} },
  { path: 'edit/account/:idAccount', component: EditMyPersonalDataComponent, canActivate: [AuthGuard], 
  data: { roles: ['student', 'proffesor', 'administrator', 'director']} },
  { path: 'edit/account/password/:idAccount', component: ChangePasswordComponent, canActivate: [AuthGuard], 
  data: { roles: ['student', 'proffesor', 'administrator', 'director']} },
  { path: 'proffesor/documents/review/tutor', component: DocumentsAssignedTutorComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'proffesor/documents/review/rapporteur', component: DocumentsAssignedRapporteurComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor', 'director']} },
  { path: 'subject/files/:idSubject', component: ListSubjectFilesComponent, canActivate: [AuthGuard], 
  data: { roles: ['proffesor', 'student']} },
  { path: 'subject/file/new/:idSubject', component: NewSubjectFileComponent, canActivate: [AuthGuard], 
    data: { roles: ['proffesor']} },
  { path: 'proffesor/assignReviewers/:idStudent', component: AssignReviewersComponent, canActivate: [AuthGuard], 
  data: { roles: ['proffesor']} },
  { path: 'proffesor/editReviewers/:idStudent', component: EditReviewersComponent, canActivate: [AuthGuard], 
  data: { roles: ['proffesor']} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
