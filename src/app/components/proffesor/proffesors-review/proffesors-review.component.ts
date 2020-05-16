import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReviewsService } from 'src/app/services/reviews.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-proffesors-review',
  templateUrl: './proffesors-review.component.html',
  styleUrls: ['./proffesors-review.component.css']
})
export class ProffesorsReviewComponent implements OnInit {
  columnsHeaderToDisplay: string[] = ['tittle', 'description'];
  idReview;
  reviewData;
  taskName; 
  reviewsProffesorData = [];
  
  APILink = environment.APIEndpoint;

  constructor(private route: ActivatedRoute,
              private reviewService: ReviewsService) { 
    this.idReview = this.route.snapshot.params.idReview;
    this.taskName = this.route.snapshot.params.taskName;
  }

  generateReviewFormTable(review) {
    let reviewData = [];
    for(let i = 0; i < review.reviewDataTittles.length; i ++) {
      reviewData.push({tittle: review.reviewDataTittles[i], 
                      description: review.reviewDataDescriptions[i],
                      isText: true});
      
    }

    reviewData.push({tittle: 'Autor', description: review.studentName,
                    isText: true});

    for(let i = 0; i < review.documents.length; i ++) {
      reviewData.push({tittle: 'Archivos', 
                      path: review.documents[i],
                      isText: false});
    }

    return reviewData;
  }

  generateAnswerReviewTables (answerReview) {
    let answersData = [];
    console.log(answerReview);
    // for(let i = 0; i < answerReview.proffesorsName.length; i ++) {
    //   let answers = [];
      
    //   answersData.push({proffesorName: answerReview.proffesorsName[i].name,
    //                     dataAnswers: answerReview.proffesorsName[i].name})
    // }

    // console.log(answersData);
  }


  ngOnInit() {
    this.reviewService.getAssignedReviewData(this.idReview).subscribe(review => {
      this.reviewData = this.generateReviewFormTable(review);
    });

    this.reviewService.getAllAnswersReviewProffesors(this.idReview).subscribe((answerReviewProffesors:any) => {
      console.log(answerReviewProffesors);
      this.reviewsProffesorData = answerReviewProffesors;
    });
  }

}
