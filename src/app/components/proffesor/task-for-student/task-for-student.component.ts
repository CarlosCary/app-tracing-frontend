import { Component, OnInit, Renderer2, ViewChild, ElementRef, Directive, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestedDocumentComponent } from '../requested-document/requested-document.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export const DATE_FORMAT = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-task-for-student',
  templateUrl: './task-for-student.component.html',
  styleUrls: ['./task-for-student.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
  ],
})
export class TaskForStudentComponent implements OnInit {
  @ViewChild('requestedDocuments', {read: ViewContainerRef, static:false}) container: ViewContainerRef;
  requestedDocumentComponent = RequestedDocumentComponent;
  newTaskForm: FormGroup;
  idSubject;
  constructor(private componentFactoryResolver: ComponentFactoryResolver, 
              private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
  }
  
  private documentIdCount:number = 0;

  documentRequestedDetail:string[] = [];

  ngOnInit() {
    this.idSubject = this.route.snapshot.params.idSubject;
    this.newTaskForm = this.formBuilder.group({
      taskName: ['', Validators.required],
      visibilityDate: ['', Validators.required],
      deadline: ['', Validators.required]
    });
  }

  get form() { return this.newTaskForm.controls; }

  get taskName() { return this.newTaskForm.get('taskName').value };
  get visibilityDate() { return this.newTaskForm.get('visibilityDate').value };
  get deadline() { return this.newTaskForm.get('deadline').value };
  
  addDocument() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.requestedDocumentComponent);
    const component = <RequestedDocumentComponent>this.container.createComponent(componentFactory).instance;
    component.documentIdCount = this.documentIdCount++;
  }

  getTaskData() {
    for(let i = 0; i < this.documentIdCount; i++) {
      this.documentRequestedDetail.push((<HTMLInputElement>document.getElementById("documentRequested["+i+"]")).value);
    }

    const taskData = {
      "taskName": this.taskName,
      "deadline": this.deadline.format("DD-MM-YYYY"),
      "visibilityDate": this.visibilityDate.format("DD-MM-YYYY"),
      "documentsRequested": this.documentRequestedDetail,
      "idSubject": this.idSubject
    }

    return taskData;
  }

  next() {
    const taskData = this.getTaskData();
    let taskDataStorage = JSON.stringify(taskData);
    localStorage.setItem("taskData", taskDataStorage);
    this.router.navigate(['/proffesor/review/form']);
  }
}
