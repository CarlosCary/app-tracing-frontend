import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsService } from 'src/app/services/forms.service';
import { InputsReviewFormComponent } from '../inputs-review-form/inputs-review-form.component';

@Component({
  selector: 'app-edit-my-form-task',
  templateUrl: './edit-my-form-task.component.html',
  styleUrls: ['./edit-my-form-task.component.css']
})

export class EditMyFormTaskComponent implements OnInit {
  @ViewChild('section', {read: ViewContainerRef, static:false}) container: ViewContainerRef;
  
  idFormTask;
  formTittle;
  formDescription;

  sectionTittle;
  sectionDescription;
  private count:number = 0;
  components = [];
  inputsReviewFormComponent = InputsReviewFormComponent;

  dataTittles = [];
  dataDescriptions = [];

  constructor(private route: ActivatedRoute,
              private componentFactoryResolver: ComponentFactoryResolver,
              private formTaskService: FormsService,
              private router: Router) {
    this.idFormTask = this.route.snapshot.params.idFormTask; 
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

  ngOnInit() {
    this.formTaskService.getFormTask(this.idFormTask).subscribe(taskForm => {
      this.chargeData(taskForm);
    });
  }

  async editForm() {
    this.dataTittles.push(this.sectionTittle);
    this.dataDescriptions.push(this.sectionDescription);
    for(let i = 0; i < this.count; i++) {
      if(this.components[i].isRemoved)
        continue;
      this.dataTittles.push(this.components[i].tittle);
      this.dataDescriptions.push(this.components[i].description);
    }

    await this.formTaskService.updateTaskForm(
        this.idFormTask,
        this.formTittle,
        this.formDescription,
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
