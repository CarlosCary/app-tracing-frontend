import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormsReviewsService } from 'src/app/services/forms-reviews.service';
import { InputsReviewFormComponent } from '../inputs-review-form/inputs-review-form.component';
import { ReviewsService } from 'src/app/services/reviews.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ProffesorService } from 'src/app/services/proffesor.service';
import { AddReviewerComponent } from '../../utils/add-reviewer/add-reviewer.component';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-reviewers-form',
  templateUrl: './reviewers-form.component.html',
  styleUrls: ['./reviewers-form.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class ReviewersFormComponent implements OnInit {
  @ViewChild('section', {read: ViewContainerRef, static:false}) container: ViewContainerRef;
  @ViewChild('reviewer', {read: ViewContainerRef, static:false}) reviewerContainer: ViewContainerRef;
  inputsReviewFormComponent = InputsReviewFormComponent;
  addReviewerComponent = AddReviewerComponent;

  committeForm: FormGroup;
  get committeFromControls() { return this.committeForm.controls; }
  
  directors = [];
  proffesors = [];
  otherReviewers = [];

  idSubmittedTask;
  proffesorsList;
  proffesorsReviewersSelected = [];

  tittleSection;
  descriptionSection;
  reviewForms;

  components = [];
  idProffesor;
  private count:number = 0;
  get director() { return this.committeForm.get('director').value };
  get rapporteur() { return this.committeForm.get('rapporteur').value };
  get tutor() { return this.committeForm.get('tutor').value };
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private formsReviewsService:FormsReviewsService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private reviewsService: ReviewsService,
              private proffesorService: ProffesorService,
              private formBuilder: FormBuilder,
              private notificationsService: NotificationsService ) { 
    this.idSubmittedTask = this.route.snapshot.params.idSubmittedTask;
    this.idProffesor = (JSON.parse(localStorage.getItem("currentUser")))._id;
    
    this.committeForm = this.formBuilder.group({
      director: ['', Validators.required],
      rapporteur: ['', Validators.required],
      tutor: ['', Validators.required]
    });
  }

  async ngOnInit() {
    
    
    await this.proffesorService.getProffesorsAvaliableCommitte(this.idProffesor).subscribe( (proffesorsList) => {
      this.proffesorsList = proffesorsList;
      this.directors = this.proffesorsList.director;
      this.proffesors = this.proffesorsList.proffesors;
    })

    
    await this.formsReviewsService
    .getReviewForms(this.idProffesor)
    .subscribe( reviewForms => {
      this.reviewForms = reviewForms;
    });


  }

  async saveFormReview() {
    if (this.committeForm.invalid) {
      this.committeForm.markAllAsTouched();
      return;
    }
    let proffesorsSelected = [{idProffesor: this.director, role: 'director'},
                              {idProffesor: this.rapporteur, role: 'rapporteur'},
                              {idProffesor: this.tutor, role: 'tutor'}];
    

    let dataTittles = [];
    let dataDescriptions = [];

    dataTittles.push(this.tittleSection);
    dataDescriptions.push(this.descriptionSection);

    for(let i = 0; i < this.components.length; i ++) {
      if(this.components[i].isRemoved) 
        continue;
      
      dataTittles.push(this.components[i].tittle);
      dataDescriptions.push(this.components[i].description);
    }
    
    await this.notificationsService.notifyCommittee(this.director, this.rapporteur, this.tutor).subscribe(notifications => {
    });

    await this.reviewsService.createReview ( 
      dataTittles,
      dataDescriptions,
      proffesorsSelected,
      this.idProffesor,
      this.idSubmittedTask
      ).
      subscribe(review => {
        this.router.navigate(['/proffesor/home']);
    });
  }

  async selectForm(selectedFormId) {
    if(selectedFormId != 'none') {
      await this.formsReviewsService
      .getReviewForm(selectedFormId)
      .subscribe(reviewForm => {
        this.chargeForm(reviewForm);
      })
    }
    else {
      this.clearAllForm();
    }
  }

  addSection() {
    const containerForm = document.getElementById("section");

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.inputsReviewFormComponent);
    const component = <InputsReviewFormComponent>this.container.createComponent(componentFactory).instance;
    component.idNumber = ++this.count;

    // Push the component so that we can keep track of which components are created
    this.components.push(component);
  }

  addReviewer() {
    if(this.otherReviewers.length > 2)
      return;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.addReviewerComponent);
    const extraReviewer = <AddReviewerComponent>this.reviewerContainer.createComponent(componentFactory).instance;
    extraReviewer.proffesors = this.proffesors;
    this.otherReviewers.push(extraReviewer);
    
  }

  chargeForm(taskForm) {
    this.clearAllForm();
    const tittles = taskForm.tittles;
    const descriptions = taskForm.descriptions;

    this.tittleSection = tittles[0];
    this.descriptionSection = descriptions[0];
    for(let i = 1; i < tittles.length; i ++) {
      this.addSection();
      this.components[i-1].tittle = tittles[i];
      this.components[i-1].description = descriptions[i];
    }
  }

  clearAllForm() {
    this.tittleSection = "";
    this.descriptionSection = ""; 
    this.container.clear();
    this.components = [];
  }
}
