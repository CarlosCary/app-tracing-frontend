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
    
    console.log(this.dataTittles);
    console.log(this.dataDescriptions);
    // console.log(this.idTask);

    for(let i = 0; i <= this.dataTittles.length; i++) { 
      await this.tasksService.addFormTask(this.dataTittles[i], this.dataDescriptions[i],this.idTask).
        subscribe(form => {
        
        // console.log("dentro del suscribe");
        // console.log(this.idTask);
        return form;
        // this.router.navigate(['/proffesor/home']);
      });
    }
  }

  async addDocumentsTask() {
    const documentsName = JSON.parse(localStorage.getItem("taskData")).documentsRequested; 
    for(let i = 0; i < documentsName.length; i++) {
      
      await this.tasksService.addDocumentTask(documentsName[i], this.idTask).
        subscribe(document => {
        
        // console.log("dentro del suscribe");
        // console.log(this.idTask);
        return document;
        // this.router.navigate(['/proffesor/home']);
      });
    }
    console.log(this.idTask);
  }

  async createTask() {
    const taskName = JSON.parse(localStorage.getItem("taskData")).taskName;
    const idSubject = JSON.parse(localStorage.getItem("taskData")).idSubject;
    const deadline = JSON.parse(localStorage.getItem("taskData")).deadline;
    const visibilityDate = JSON.parse(localStorage.getItem("taskData")).visibilityDate;
    await this.tasksService.createTask(taskName, idSubject, deadline, visibilityDate).
    subscribe(task => {
      this.idTask = task;
      // console.log("dentro del suscribe");
      // console.log(this.idTask);
      this.addDocumentsTask();
      this.addFormTask();
      // this.router.navigate(['/proffesor/home']);
    });
  }

  

  async createForm(myForm: NgForm) {
    // let dataTittles = [];
    // let dataDescriptions = [];
    // for(let i = 0; i <= this.count; i++) {
    //   dataTittles.push((<HTMLInputElement>document.getElementById("descriptionTittle["+i+"]")).value);
    //   dataDescriptions.push((<HTMLInputElement>document.getElementById("descriptionDetail["+i+"]")).value);
    // }
    // console.log(dataTittles);
    // console.log(dataDescriptions);
    console.log(localStorage.getItem("taskData"));
    for(let i = 0; i <= this.count; i++) {
      this.dataTittles.push((<HTMLInputElement>document.getElementById("descriptionTittle["+i+"]")).value);
      this.dataDescriptions.push((<HTMLInputElement>document.getElementById("descriptionDetail["+i+"]")).value);
    }

    await this.createTask();
    // await this.createDocuments();

    this.router.navigate(['/proffesor/home']);
  }

}
