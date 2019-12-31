import { Component, OnInit, Renderer2, ViewChild, ElementRef, Directive, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import {MDCTextField} from '@material/textfield';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { HomeStudentTableComponent } from '../home-student-table/home-student-table.component';
import { InputsReviewFormComponent } from '../inputs-review-form/inputs-review-form.component';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})

export class ReviewFormComponent  {
  @ViewChild('section', {read: ViewContainerRef, static:false}) container: ViewContainerRef;
  components = [];
  idTask;

  dataTittles = [];
  dataDescriptions = [];

  inputsReviewFormComponent = InputsReviewFormComponent;


  private count:number = 0;

  descriptionsId:number[] = [0];
  descriptionDetail:string[];
  // descriptionDetail:string[];
  // descriptionDetail:string[] = ["000"];
  constructor(private componentFactoryResolver: ComponentFactoryResolver, 
              private router: Router,
              private tasksService: TasksService) {
  }

  ngOnInit() {
  }

  addSection() {
    const containerForm = document.getElementById("section");

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.inputsReviewFormComponent);
    const component = <InputsReviewFormComponent>this.container.createComponent(componentFactory).instance;
    component.idNumber = ++this.count;

    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }
  
  getSection () {}

  async addFormTask () {
    for(let i = 0; i < this.dataTittles.length; i++) { 
      if(this.dataTittles[i] != null ) {
        await this.tasksService.addFormTask(this.dataTittles[i], this.dataDescriptions[i],this.idTask).
        subscribe(form => {
          return form;
          // this.router.navigate(['/proffesor/home']);
        });
      }
    }
  }

  async addDocumentsTask() {
    const documentsName = JSON.parse(localStorage.getItem("taskData")).documentsRequested; 
    for(let i = 0; i < documentsName.length; i++) {
      
      await this.tasksService.addDocumentTask(documentsName[i], this.idTask).
        subscribe(document => {
        
        return document;
        // this.router.navigate(['/proffesor/home']);
      });
    }
  }

  async assignTaskAllStudentsSubject() {
    const idSubject = JSON.parse(localStorage.getItem("taskData")).idSubject;
    await this.tasksService.assignTaskAllStudentsSubject(idSubject, this.idTask).
        subscribe(res => {
        return res;
      });
  }

  async createTask() {
    const taskName = JSON.parse(localStorage.getItem("taskData")).taskName;
    const idSubject = JSON.parse(localStorage.getItem("taskData")).idSubject;
    const deadline = JSON.parse(localStorage.getItem("taskData")).deadline;
    const visibilityDate = JSON.parse(localStorage.getItem("taskData")).visibilityDate;
    const documentsRequested = JSON.parse(localStorage.getItem("taskData")).documentsRequested;
    // let formTittles = [];
    // let formDescriptions = [];
    // for(let i = 0; i < this.dataTittles.length; i++) { 
    //   if(this.dataTittles[i] != null ) {
    //     formTittles.push(this.dataTittles[i]) 
    //     formDescriptions.push(this.dataDescriptions[i]);
    //   }
    // }
    await this.tasksService.createTask(taskName, idSubject, deadline, visibilityDate, documentsRequested, this.dataTittles, this.dataDescriptions).
    subscribe(task => {
      this.idTask = task;
      // this.addDocumentsTask();
      // this.addFormTask();
      // this.assignTaskAllStudentsSubject();
      // this.router.navigate(['/proffesor/home']);
    });
  }

  

  async createForm() {
    for(let i = 0; i <= this.count; i++) {
      this.dataTittles.push((<HTMLInputElement>document.getElementById("descriptionTittle["+i+"]")).value);
      this.dataDescriptions.push((<HTMLInputElement>document.getElementById("descriptionDetail["+i+"]")).value);
    }

    await this.createTask();

    this.router.navigate(['/proffesor/home']);
  }

}
