import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/accounts/log-in/log-in.component';
import { RegisterComponent } from './components/accounts/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material'

import { HttpClientModule} from '@angular/common/http';
import { HomeStudentComponent } from './components/student/home-student/home-student.component';
import { ToolbarComponent } from './components/utils/toolbar/toolbar.component';
import { HomeStudentTableComponent } from './components/student/home-student-table/home-student-table.component';
import { HomeProffesorComponent } from './components/proffesor/home-proffesor/home-proffesor.component';
import { HomeProffesorTableComponent } from './components/proffesor/home-proffesor-table/home-proffesor-table.component';
import { SubjectFormComponent } from './components/proffesor/subject-form/subject-form.component';
import { EnrolledSubjectComponent } from './components/student/enrolled-subject/enrolled-subject.component';
import { ReviewFormComponent } from './components/proffesor/review-form/review-form.component';
import { InputsReviewFormComponent } from './components/proffesor/inputs-review-form/inputs-review-form.component';
import { TaskForStudentComponent } from './components/proffesor/task-for-student/task-for-student.component';
import { RequestedDocumentComponent } from './components/proffesor/requested-document/requested-document.component';
import { TaskFormComponent } from './components/student/task-form/task-form.component';
import { ListStudentsEnrolledComponent } from './components/proffesor/list-students-enrolled/list-students-enrolled.component';
import { ListTaskStudentSubjectComponent } from './components/proffesor/list-task-student-subject/list-task-student-subject.component';
import { ReviewTaskSubmittedComponent } from './components/proffesor/review-task-submitted/review-task-submitted.component';
import { ListStudentsTasksComponent } from './components/proffesor/list-students-tasks/list-students-tasks.component';
import { MyFormsTasksHomeComponent } from './components/proffesor/my-forms-tasks-home/my-forms-tasks-home.component';
import { MyFormTaskComponent } from './components/proffesor/my-form-task/my-form-task.component';
import { EditMyFormTaskComponent } from './components/proffesor/edit-my-form-task/edit-my-form-task.component';
import { MyFormReviewComponent } from './components/proffesor/my-form-review/my-form-review.component';
import { MyFormReviewHomeComponent } from './components/proffesor/my-form-review-home/my-form-review-home.component';
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
import { AddReviewerComponent } from './components/utils/add-reviewer/add-reviewer.component';
import { DocumentsAssignedTutorComponent } from './components/proffesor/documents-assigned-tutor/documents-assigned-tutor.component';
import { DocumentsAssignedRapporteurComponent } from './components/proffesor/documents-assigned-rapporteur/documents-assigned-rapporteur.component';
import {  RxReactiveFormsModule } from "@rxweb/reactive-form-validators";
import { ListSubjectFilesComponent } from './components/utils/list-subject-files/list-subject-files.component';
import { NewSubjectFileComponent } from './components/utils/new-subject-file/new-subject-file.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    HomeStudentComponent,
    ToolbarComponent,
    HomeStudentTableComponent,
    HomeProffesorComponent,
    HomeProffesorTableComponent,
    SubjectFormComponent,
    EnrolledSubjectComponent,
    ReviewFormComponent,
    InputsReviewFormComponent,
    TaskForStudentComponent,
    RequestedDocumentComponent,
    TaskFormComponent,
    ListStudentsEnrolledComponent,
    ListTaskStudentSubjectComponent,
    ReviewTaskSubmittedComponent,
    ListStudentsTasksComponent,
    MyFormsTasksHomeComponent,
    MyFormTaskComponent,
    EditMyFormTaskComponent,
    MyFormReviewComponent,
    MyFormReviewHomeComponent,
    MyFormReviewEditComponent,
    ReviewersFormComponent,
    NewFeedbackDocumentReviewerComponent,
    ListFeedbackDocumentReviewerComponent,
    ProffesorsReviewComponent,
    NewAssignClassroomComponent,
    EditReviewersFormComponent,
    EditTaskDateComponent,
    AdministratorHomeComponent,
    NewProffesorAccountComponent,
    EditProffesorAccountComponent,
    EditMyPersonalDataComponent,
    ChangePasswordComponent,
    AddReviewerComponent,
    DocumentsAssignedTutorComponent,
    DocumentsAssignedRapporteurComponent,
    ListSubjectFilesComponent,
    NewSubjectFileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    RxReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    SubjectFormComponent,
    HomeStudentTableComponent,
    InputsReviewFormComponent,
    RequestedDocumentComponent,
    AddReviewerComponent,
    ToolbarComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
