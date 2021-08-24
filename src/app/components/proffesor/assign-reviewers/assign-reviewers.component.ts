import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsReviewsService } from 'src/app/services/forms-reviews.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { ProffesorService } from 'src/app/services/proffesor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-assign-reviewers',
  templateUrl: './assign-reviewers.component.html',
  styleUrls: ['./assign-reviewers.component.css']
})
export class AssignReviewersComponent implements OnInit {
  idProffesor;
  committeForm: FormGroup;
  proffesorsList;
  idStudent;

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
              private formBuilder: FormBuilder,
              private notificationsService: NotificationsService) {
    
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

  async ngOnInit() {
    await this.proffesorService.getProffesorsAvaliableCommitte(this.idProffesor).subscribe( (proffesorsList) => {
      this.proffesorsList = proffesorsList;
      this.directors = this.proffesorsList.director;
      this.proffesors = this.proffesorsList.proffesors;
    })
  }

  async assignReviewers() {
    let proffesorsSelected = [{idProffesor: this.director, role: 'director'},
                              {idProffesor: this.rapporteur, role: 'rapporteur'},
                              {idProffesor: this.tutor, role: 'tutor'}];

    await this.reviewsService.assignReviewers (
      proffesorsSelected,
      this.idProffesor,
      this.idStudent
      ).
      subscribe(review => {
        this.router.navigate(['/proffesor/home']);
    });
  }
}
