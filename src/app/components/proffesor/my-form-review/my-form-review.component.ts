import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { InputsReviewFormComponent } from '../inputs-review-form/inputs-review-form.component';
import { FormsReviewsService } from 'src/app/services/forms-reviews.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-form-review',
  templateUrl: './my-form-review.component.html',
  styleUrls: ['./my-form-review.component.css']
})
export class MyFormReviewComponent implements OnInit {
  @ViewChild('section', {read: ViewContainerRef, static:false}) container: ViewContainerRef;
  components = [];
  private count:number = 0;
  inputsReviewFormComponent = InputsReviewFormComponent;
  dataTittles = [];
  dataDescriptions = [];
  formTittle = "";
  formDescription = "";

  tittleSection = "";
  descriptionSection = "";
  idProffesor:string;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private reviewFormService: FormsReviewsService,
              private router: Router) { 
  }

  ngOnInit() {
    this.idProffesor = (JSON.parse(localStorage.getItem("currentUser")))._id;
  }

  addSection() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.inputsReviewFormComponent);
    const component = <InputsReviewFormComponent>this.container.createComponent(componentFactory).instance;
    component.idNumber = ++this.count;

    this.components.push(component);
  }


  async saveForm() {
    this.dataTittles.push(this.tittleSection);
    this.dataDescriptions.push(this.descriptionSection);
    for(let i = 0; i < this.components.length; i ++) {
      if(this.components[i].isRemoved)
        continue;
      this.dataTittles.push(this.components[i].tittle);
      this.dataDescriptions.push(this.components[i].description);
    }
    
    await this.reviewFormService
    .createFormReview(this.formTittle, this.formDescription, this.dataTittles, this.dataDescriptions, this.idProffesor)
    .subscribe( taskForm => {
      this.router.navigate(['/proffesor/forms/review']);
    });
  }
}
