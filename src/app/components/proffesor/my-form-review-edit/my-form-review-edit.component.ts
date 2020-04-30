import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { InputsReviewFormComponent } from '../inputs-review-form/inputs-review-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsReviewsService } from 'src/app/services/forms-reviews.service';

@Component({
  selector: 'app-my-form-review-edit',
  templateUrl: './my-form-review-edit.component.html',
  styleUrls: ['./my-form-review-edit.component.css']
})
export class MyFormReviewEditComponent implements OnInit {
  @ViewChild('section', {read: ViewContainerRef, static:false}) container: ViewContainerRef;
  inputsReviewFormComponent = InputsReviewFormComponent;

  idReviewForm;
  formTittle;
  formDescription;

  sectionTittle;
  sectionDescription;
  private count:number = 0;
  components = [];

  dataTittles = [];
  dataDescriptions = [];



  constructor(private route: ActivatedRoute,
              private componentFactoryResolver: ComponentFactoryResolver,
              private reviewFormsService: FormsReviewsService,
              private router: Router) {
    this.idReviewForm = this.route.snapshot.params.idReviewForm; 
  }

  addSection() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.inputsReviewFormComponent);
    const component = <InputsReviewFormComponent>this.container.createComponent(componentFactory).instance;
    component.idNumber = ++this.count;

    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }

  chargeData(taskForm) {
    this.formTittle = taskForm.formTittle;
    this.formDescription = taskForm.formDescription;
    this.sectionTittle = taskForm.tittles[0];
    this.sectionDescription = taskForm.descriptions[0];
    
    for(let i = 1; i < taskForm.tittles.length; i++) {
      this.addSection();
      this.components[i - 1].tittle = taskForm.tittles[i];
      this.components[i - 1].description = taskForm.descriptions[i];
    }
  }

  async editForm() {
    this.dataTittles.push(this.sectionTittle);
    this.dataDescriptions.push(this.sectionDescription);
    for(let i = 0; i < this.count; i++) {
      this.dataTittles.push(this.components[i].tittle);
      this.dataDescriptions.push(this.components[i].description);
    }

    await this.reviewFormsService.updateTaskForm(
        this.idReviewForm,
        this.formTittle,
        this.formDescription,
        this.dataTittles,
        this.dataDescriptions
      ,
    )
    .subscribe( taskFormUpdated => {
      this.router.navigate(['/proffesor/forms/review']);
    });
  }

  ngOnInit() {
    this.reviewFormsService.getReviewForm(this.idReviewForm).subscribe(taskForm => {
      this.chargeData(taskForm);
    });
  }

}
