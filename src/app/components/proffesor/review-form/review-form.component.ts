import { Component, ViewChild, ElementRef, Directive, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { InputsReviewFormComponent } from '../inputs-review-form/inputs-review-form.component';
import { Router, ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { FormsService } from 'src/app/services/forms.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})

export class ReviewFormComponent  {
  @ViewChild('section', {read: ViewContainerRef, static:false}) container: ViewContainerRef;
  taskForm: FormGroup;
  
  idSubject;
  components = [];
  idTask;
  selectedForm;
  formTasks;

  tittle;
  description;

  dataTittles = [];
  dataDescriptions = [];

  inputsReviewFormComponent = InputsReviewFormComponent;


  private count:number = 0;

  descriptionsId:number[] = [0];
  descriptionDetail:string[];
  
  constructor(private componentFactoryResolver: ComponentFactoryResolver, 
              private router: Router,
              private tasksService: TasksService,
              private taskFormService: FormsService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {
  }

  get form() { return this.taskForm.controls; }
  get titleSection() { return this.taskForm.get('titleSection').value };
  get descriptionSection() { return this.taskForm.get('descriptionSection').value };

  set titleSection(title) { this.form['titleSection'].setValue(title) };
  set descriptionSection(description) { this.form['descriptionSection'].setValue(description) };

  async ngOnInit() {
    this.idSubject = this.route.snapshot.params.idSubject;
    this.taskForm = this.formBuilder.group({
      titleSection: ['', Validators.required],
      descriptionSection: ['', Validators.required]
    });

    const idProffesor = (JSON.parse(localStorage.getItem("currentUser")))._id;
    await this.taskFormService
    .getFormsTasks(idProffesor)
    .subscribe( taskForms => {
      console.log(taskForms);
      this.formTasks = taskForms;
    });
  }

  addSection() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.inputsReviewFormComponent);
    const component = <InputsReviewFormComponent>this.container.createComponent(componentFactory).instance;
    component.idNumber = ++this.count;

    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }

  async addFormTask () {
    for(let i = 0; i < this.dataTittles.length; i++) { 
      if(this.dataTittles[i] != null ) {
        await this.tasksService.addFormTask(this.dataTittles[i], this.dataDescriptions[i],this.idTask).
        subscribe(form => {
          return form;
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
    
    await this.tasksService.createTask(taskName, 
                            idSubject, 
                            deadline, 
                            visibilityDate, 
                            documentsRequested, 
                            this.dataTittles, 
                            this.dataDescriptions).
    subscribe(task => {
      this.idTask = task;
    });
  }

  

  async createForm() {
    

    this.dataTittles = [];
    this.dataDescriptions = [];

    this.dataTittles.push(this.titleSection);
    this.dataDescriptions.push(this.descriptionSection);
    
    for(let i = 0; i < this.components.length; i++) {
      if(this.components[i].isRemoved)
        continue;
      
      if(this.components[i].title.invalid || this.components[i].description2.invalid)
        return;    

      this.dataTittles.push(this.components[i].tittle);
      this.dataDescriptions.push(this.components[i].description);
    }

    console.log(this.dataTittles);
    await this.createTask();

    this.router.navigate(['/proffesor/home']);
  }

  chargeForm(taskForm) {
    this.clearAllForm();
    const tittles = taskForm.tittles;
    const descriptions = taskForm.descriptions;

    console.log(tittles);
    console.log(descriptions);
    this.titleSection = tittles[0];
    this.descriptionSection = descriptions[0];
    for(let i = 1; i < tittles.length; i ++) {
      this.addSection();
      this.components[i-1].tittle = tittles[i];
      this.components[i-1].description = descriptions[i];
    }

  }

  async selectForm(selectedFormId) {
    if(selectedFormId != 'none') {
      await this.taskFormService
      .getFormTask(selectedFormId)
      .subscribe( taskForm => {
        this.chargeForm(taskForm);
      });
    }
    else {
      this.clearAllForm();
    }
  }

  clearAllForm() {
    this.tittle = "";
    this.description = ""; 
    this.container.clear();
    this.components = [];

    //Eliminar uno en concreto
    // this.components.splice(this.components[i], 1);
  }

}
