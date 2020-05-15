import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { InputsReviewFormComponent } from '../inputs-review-form/inputs-review-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsReviewsService } from 'src/app/services/forms-reviews.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-form-review-edit',
  templateUrl: './my-form-review-edit.component.html',
  styleUrls: ['./my-form-review-edit.component.css']
})
export class MyFormReviewEditComponent implements OnInit {
  @ViewChild('section', {read: ViewContainerRef, static:false}) container: ViewContainerRef;
  inputsReviewFormComponent = InputsReviewFormComponent;

  reviewForm: FormGroup;


  idReviewForm;
  
  formDescription;

  sectionTittle;
  sectionDescription;
  private count:number = 0;
  components = [];

  dataTittles = [];
  dataDescriptions = [];


  get form() { return this.reviewForm.controls; }
  
  get titleSection() { return this.reviewForm.get('titleSection').value };
  get descriptionSection() { return this.reviewForm.get('descriptionSection').value };
  get formTitle() { return this.reviewForm.get('formTitle').value}


  set titleSection(title) { this.form['titleSection'].setValue(title) };
  set descriptionSection(description) { this.form['descriptionSection'].setValue(description) };
  set formTitle(formTitle) { this.form['formTitle'].setValue(formTitle) };

  constructor(private route: ActivatedRoute,
              private componentFactoryResolver: ComponentFactoryResolver,
              private reviewFormsService: FormsReviewsService,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.idReviewForm = this.route.snapshot.params.idReviewForm; 
  }

  ngOnInit() {
    this.reviewForm = this.formBuilder.group({
      titleSection: ['', Validators.required],
      descriptionSection: ['', Validators.required],
      formTitle: ['', Validators.required]
    });
    
    this.reviewFormsService.getReviewForm(this.idReviewForm).subscribe(taskForm => {
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
    console.log(taskForm);
    for(let i = 1; i < taskForm.tittles.length; i++) {
      this.addSection();
      this.components[i - 1].tittle = taskForm.tittles[i];
      this.components[i - 1].description = taskForm.descriptions[i];
    }
  }

  async editForm() {
    if(this.reviewForm.invalid)
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

    await this.reviewFormsService.updateTaskForm(
        this.idReviewForm,
        this.formTitle,
        " ",
        this.dataTittles,
        this.dataDescriptions
      ,
    )
    .subscribe( taskFormUpdated => {
      this.router.navigate(['/proffesor/forms/review']);
    });
  }

  

}
