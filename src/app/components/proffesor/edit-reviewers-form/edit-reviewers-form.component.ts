import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormsReviewsService } from 'src/app/services/forms-reviews.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { MatListOption } from '@angular/material';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ProffesorService } from 'src/app/services/proffesor.service';

@Component({
  selector: 'app-edit-reviewers-form',
  templateUrl: './edit-reviewers-form.component.html',
  styleUrls: ['./edit-reviewers-form.component.css']
})
export class EditReviewersFormComponent implements OnInit {

  idReview;
  committeForm: FormGroup;
  get committeFromControls() { return this.committeForm.controls; }
  
  get director() { return this.committeForm.get('director').value };
  get rapporteur() { return this.committeForm.get('rapporteur').value };
  get tutor() { return this.committeForm.get('tutor').value };

  set director(dir) { this.committeFromControls['director'].setValue(dir) };
  set rapporteur(rapporteur) { this.committeFromControls['rapporteur'].setValue(rapporteur) };
  set tutor(tutor) { this.committeFromControls['tutor'].setValue(tutor) };

  directors;
  proffesors;
  //********* */
  idTask;
  idStudent;

  idSubmittedTask;
  proffesorsList;
  option;
  proffesorsReviewersSelected = [];

  tittleSection;
  descriptionSection;
  reviewForms;

  components = [];
  idProffesor;

  isSelected;

  private count:number = 0;

   constructor(private route: ActivatedRoute,
              private router: Router,
              private reviewsService: ReviewsService,
              private formBuilder: FormBuilder,
              private proffesorService: ProffesorService) { 
    
    this.idProffesor = (JSON.parse(localStorage.getItem("currentUser")))._id;
    
    this.idSubmittedTask = this.route.snapshot.params.idSubmittedTask;
    this.idTask = this.route.snapshot.params.idTask;
    this.idStudent = this.route.snapshot.params.idStudent;

    this.committeForm = this.formBuilder.group({
      director: ['', Validators.required],
      rapporteur: ['', Validators.required],
      tutor: ['', Validators.required]
    });
  }

  async ngOnInit() {
    await this.proffesorService.getProffesorsAvaliableCommitteAndSelected(this.idProffesor, this.idSubmittedTask).subscribe( (proffesorsList:any) => {
      this.proffesorsList = proffesorsList;
      this.directors = this.proffesorsList.director;
      this.proffesors = this.proffesorsList.proffesors;
      this.idReview = this.proffesorsList.idReview;
      
      this.chargeCommitteSelected(proffesorsList.committe.reviewers)
      
    })

    
  }

  chargeCommitteSelected(idProffesorsSelected) {
    this.director = idProffesorsSelected[0].idProffesor;
    this.rapporteur = idProffesorsSelected[1].idProffesor;
    this.tutor = idProffesorsSelected[2].idProffesor;
  }
  async saveFormReview() {

    
    let proffesorsSelected = [{idProffesor: this.director, role: 'director'},
                              {idProffesor: this.rapporteur, role: 'rapporteur'},
                              {idProffesor: this.tutor, role: 'tutor'}];
    await this.reviewsService.updateReview ( 
      proffesorsSelected,
      this.idSubmittedTask
      ).

      subscribe(review => {
        // this.router.navigate(['/proffesor/task/submitted', this.idTask, this.idStudent]);
        this.router.navigate(['/proffesor/home']);
    });
  }
  
}
