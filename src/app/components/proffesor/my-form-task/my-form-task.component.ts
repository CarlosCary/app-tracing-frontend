import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, ViewChild } from '@angular/core';
import { InputsReviewFormComponent } from '../inputs-review-form/inputs-review-form.component';
import { FormsService } from 'src/app/services/forms.service';
import { Router } from '@angular/router';
import { BREAKPOINT } from '@angular/flex-layout';

@Component({
  selector: 'app-my-form-task',
  templateUrl: './my-form-task.component.html',
  styleUrls: ['./my-form-task.component.css']
})

export class MyFormTaskComponent {
  @ViewChild('section', {read: ViewContainerRef, static:false}) container: ViewContainerRef;
  components = [];
  private count:number = 0;
  inputsReviewFormComponent = InputsReviewFormComponent;
  dataTittles = [];
  dataDescriptions = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private formsService: FormsService,
              private router: Router) { 
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

  async saveForm() {
    const formTittle = (<HTMLInputElement>document.getElementById("formTittle")).value;
    
    const descriptionTittle = (<HTMLInputElement>document.getElementById("descriptionTittle")).value;
    const descriptionDetail = (<HTMLInputElement>document.getElementById("descriptionDetail")).value;
    
    const idProffesor = (JSON.parse(localStorage.getItem("currentUser")))._id;
    
    // for(let i = 0; i <= this.count; i++) {
    //   this.dataTittles.push((<HTMLInputElement>document.getElementById("descriptionTittle["+i+"]")).value);
    //   this.dataDescriptions.push((<HTMLInputElement>document.getElementById("descriptionDetail["+i+"]")).value);
    // }
    this.dataTittles.push(descriptionTittle);
    this.dataDescriptions.push(descriptionDetail);

    for(let i = 0; i < this.components.length; i++) {
      if(this.components[i].isRemoved)
        continue;
      this.dataTittles.push(this.components[i].tittle);
      this.dataDescriptions.push(this.components[i].description);
      // this.dataDescriptions.push((<HTMLInputElement>document.getElementById("descriptionDetail["+i+"]")).value);
    }

    console.log(this.dataTittles);
    console.log(this.dataDescriptions);
    await this.formsService
    .createFormTask(formTittle, this.dataTittles, this.dataDescriptions, idProffesor)
    .subscribe( taskForm => {
      console.log(taskForm);
      this.router.navigate(['/proffesor/forms/task']);
    });
  }
}
