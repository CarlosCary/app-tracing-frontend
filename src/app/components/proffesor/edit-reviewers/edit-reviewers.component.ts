import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsReviewsService } from 'src/app/services/forms-reviews.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { ProffesorService } from 'src/app/services/proffesor.service';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-edit-reviewers',
  templateUrl: './edit-reviewers.component.html',
  styleUrls: ['./edit-reviewers.component.css']
})
export class EditReviewersComponent implements OnInit {
  idProffesor;
  committeForm: FormGroup;
  proffesorsList;
  idStudent;
  idReviewers;

  directors = [];
  proffesors = [];
  otherReviewers = [];
  get committeFromControls() { return this.committeForm.controls; }
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private formsReviewsService:FormsReviewsService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private reviewsService: ReviewsService,
    private proffesorService: ProffesorService,
    private formBuilder: FormBuilder) {

    this.idStudent = this.route.snapshot.params.idStudent;
    this.idProffesor = (JSON.parse(localStorage.getItem("currentUser")))._id;
    this.committeForm = this.formBuilder.group({
      director: ['', Validators.required],
      rapporteur: ['', Validators.required],
      tutor: ['', Validators.required]
    }); 
  }

  get director() { return this.committeForm.get('director').value };
  get rapporteur() { return this.committeForm.get('rapporteur').value };
  get tutor() { return this.committeForm.get('tutor').value };

  set director(dir) { this.committeFromControls['director'].setValue(dir) };
  set rapporteur(rapporteur) { this.committeFromControls['rapporteur'].setValue(rapporteur) };
  set tutor(tutor) { this.committeFromControls['tutor'].setValue(tutor) };

  async ngOnInit() {
    await this.proffesorService.getReviewersAssigned(this.idProffesor, this.idStudent).subscribe( (proffesorsList) => {
      this.proffesorsList = proffesorsList;
      this.directors = this.proffesorsList.director;
      this.proffesors = this.proffesorsList.proffesors;

      this.chargeReviewersAssigned(this.proffesorsList.reviewersData);
    })
  }

  async chargeReviewersAssigned(reviewersSelected) {
    
    this.director = reviewersSelected.reviewers[0].idProffesor;
    this.rapporteur = reviewersSelected.reviewers[1].idProffesor;
    this.tutor = reviewersSelected.reviewers[2].idProffesor;
    this.idReviewers = reviewersSelected._id;
  }
  
  async assignReviewers() {
    let proffesorsSelected = [{idProffesor: this.director, role: 'director'},
                              {idProffesor: this.rapporteur, role: 'rapporteur'},
                              {idProffesor: this.tutor, role: 'tutor'}];

    await this.reviewsService.updateReviewers (
      proffesorsSelected,
      this.idReviewers
      ).
      subscribe(review => {
        this.router.navigate(['/proffesor/home']);
    });
  }
}
