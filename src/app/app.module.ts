import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule} from '@angular/common/http';
import { HomeStudentComponent } from './components/home-student/home-student.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomeStudentTableComponent } from './components/home-student-table/home-student-table.component';
import { HomeProffesorComponent } from './components/home-proffesor/home-proffesor.component';
import { HomeProffesorTableComponent } from './components/home-proffesor-table/home-proffesor-table.component';
import { SubjectFormComponent } from './components/subject-form/subject-form.component';
import { EnrolledSubjectComponent } from './components/enrolled-subject/enrolled-subject.component';
import { ReviewFormComponent } from './components/review-form/review-form.component';
import { InputsReviewFormComponent } from './components/inputs-review-form/inputs-review-form.component';
import { TaskForStudentComponent } from './components/task-for-student/task-for-student.component';
import { RequestedDocumentComponent } from './components/requested-document/requested-document.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskFormRequestedComponent } from './components/task-form-requested/task-form-requested.component';
import { TaskDocumentsRequestedComponent } from './components/task-documents-requested/task-documents-requested.component';
import { ListStudentsEnrolledComponent } from './components/list-students-enrolled/list-students-enrolled.component';
import { ListTaskStudentSubjectComponent } from './components/list-task-student-subject/list-task-student-subject.component';
import { ReviewTaskSubmittedComponent } from './components/review-task-submitted/review-task-submitted.component';



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
    TaskFormRequestedComponent,
    TaskDocumentsRequestedComponent,
    ListStudentsEnrolledComponent,
    ListTaskStudentSubjectComponent,
    ReviewTaskSubmittedComponent
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
  ],
  entryComponents: [
    SubjectFormComponent,
    HomeStudentTableComponent,
    InputsReviewFormComponent,
    RequestedDocumentComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
