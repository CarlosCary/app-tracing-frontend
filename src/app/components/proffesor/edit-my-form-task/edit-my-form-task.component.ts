import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from 'src/app/services/forms.service';
import { InputsReviewFormComponent } from '../inputs-review-form/inputs-review-form.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-my-form-task',
  templateUrl: './edit-my-form-task.component.html',
  styleUrls: ['./edit-my-form-task.component.css']
})

export class EditMyFormTaskComponent implements OnInit {
  @ViewChild('section', {read: ViewContainerRef, static:false}) container: ViewContainerRef;
  
  taskForm: FormGroup;

  idFormTask;
  private count:number = 0;
  components = [];
  inputsReviewFormComponent = InputsReviewFormComponent;

  dataTittles = [];
  dataDescriptions = [];
  
  get form() { return this.taskForm.controls; }
  
  get titleSection() { return this.taskForm.get('titleSection').value };
  get descriptionSection() { return this.taskForm.get('descriptionSection').value };
  get formTitle() { return this.taskForm.get('formTitle').value}

  
  set titleSection(title) { this.form['titleSection'].setValue(title) };
  set descriptionSection(description) { this.form['descriptionSection'].setValue(description) };
  set formTitle(formTitle) { this.form['formTitle'].setValue(formTitle) };


  constructor(private route: ActivatedRoute,
              private componentFactoryResolver: ComponentFactoryResolver,
              private formTaskService: FormsService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.idFormTask = this.route.snapshot.params.idFormTask; 
    
  }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      titleSection: ['', Validators.required],
      descriptionSection: ['', Validators.required],
      formTitle: ['', Validators.required]
    });

    this.formTaskService.getFormTask(this.idFormTask).subscribe(taskForm => {
      this.chargeData(taskForm);
    });
  }

  addSection() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.inputsReviewFormComponent);
    const component = <InputsReviewFormComponent>this.container.createComponent(componentFactory).instance;
    component.idNumber = ++this.count;

    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }

  chargeData(taskForm) {
    this.formTitle = taskForm.formTittle;
    this.titleSection = taskForm.tittles[0];
    this.descriptionSection = taskForm.descriptions[0];
    
    for(let i = 1; i < taskForm.tittles.length; i++) {
      this.addSection();
      this.components[i - 1].tittle = taskForm.tittles[i];
      this.components[i - 1].description = taskForm.descriptions[i];
    }
  }

  async editForm() {
    if(this.taskForm.invalid)
      return;
    
    this.dataTittles = [];
    this.dataDescriptions = [];

    this.dataTittles.push(this.titleSection);
    this.dataDescriptions.push(this.descriptionSection);
    for(let i = 0; i < this.count; i++) {
      if(this.components[i].isRemoved)
        continue;

      if(this.components[i].title.invalid || this.components[i].description2.invalid)
        return;
      this.dataTittles.push(this.components[i].tittle);
      this.dataDescriptions.push(this.components[i].description);
    }

    await this.formTaskService.updateTaskForm(
        this.idFormTask,
        this.formTitle,
        " ",
        this.dataTittles,
        this.dataDescriptions
    )
    .subscribe( taskFormUpdated => {
      console.log(taskFormUpdated);
      this.router.navigate(['/proffesor/forms/task']);
      // this.router.navigate(['/proffesor/forms/task']);
    });
  }
}
