import { Component, OnInit } from '@angular/core';
import { FormsReviewsService } from 'src/app/services/forms-reviews.service';

@Component({
  selector: 'app-my-form-review-home',
  templateUrl: './my-form-review-home.component.html',
  styleUrls: ['./my-form-review-home.component.css']
})

export class MyFormReviewHomeComponent implements OnInit {
  columnsHeaderToDisplay: string[] = ['name', 'options'];
  dataSource:any = [];
  idProffesor;
  constructor(private reviewFormService: FormsReviewsService) { 
    this.idProffesor = (JSON.parse(localStorage.getItem("currentUser")))._id;
  }

  async ngOnInit() {
    await this.reviewFormService
    .getReviewForms(this.idProffesor)
    .subscribe( reviewForms => {
      this.dataSource = reviewForms;
    });
  }

}
