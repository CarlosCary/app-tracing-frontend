import { Component, OnInit, Renderer2, ViewChild, ElementRef, Directive, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { RequestedDocumentComponent } from '../requested-document/requested-document.component';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material';
import {FormControl} from '@angular/forms';

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

  
  constructor(private componentFactoryResolver: ComponentFactoryResolver, private router: Router) {
  }

  private documentIdCount:number = 0;

  // documentRequestedId:number[];
  documentRequestedDetail:string[] = [];
  
  taskName:string;
  deadline;
  visibilityDate;

  ngOnInit() {
  }


  addDocument() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.requestedDocumentComponent);
    const component = <RequestedDocumentComponent>this.container.createComponent(componentFactory).instance;
    component.documentIdCount = this.documentIdCount++;
  }

  getTaskData() {
    this.taskName = (<HTMLInputElement>document.getElementById("task-name")).value;
    this.deadline = (<HTMLInputElement>document.getElementById("deadline")).value;
    this.visibilityDate = (<HTMLInputElement>document.getElementById("visibility-date")).value;

    for(let i = 0; i < this.documentIdCount; i++) {
      this.documentRequestedDetail.push((<HTMLInputElement>document.getElementById("documentRequested["+i+"]")).value);
    }

    const taskData = {
      "taskName": this.taskName,
      "deadline": this.deadline,
      "visibilityDate": this.visibilityDate,
      "documentsRequested": this.documentRequestedDetail,
      "idSubject": localStorage.getItem("idSubject")
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
