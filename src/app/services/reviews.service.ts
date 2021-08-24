import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  API_URL = environment.APIEndpoint;

  constructor(private http: HttpClient, private router:Router) { }

  headers: HttpHeaders = new HttpHeaders ({
    "Content-type": "application/json",
  });

  public createReview(formTittles , formDescriptions, idStudent, idProffesor, idSubmittedTask) {
    const url_api = this.API_URL + "/review/new";
    return this.http
    .post(
      url_api, 
      {
        formTittles: formTittles,
        formDescriptions: formDescriptions, 
        idStudent: idStudent,
        idProffesor: idProffesor,
        idSubmittedTask: idSubmittedTask
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  public assignReviewers(reviewers, idProffesor, idStudent) {
    const url_api = this.API_URL + "/review/new/reviewers";
    console.log(reviewers);
    return this.http
    .post(
      url_api, 
      {
        reviewersBody: reviewers,
        idProffesor: idProffesor,
        idStudent: idStudent
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  getReviewersAssigned(idStudent) {
    const url_api = this.API_URL + "/review/reviewers/" + idStudent;
    return this.http.get(url_api).pipe(map(data => data));
  }

  getReviewTaskSubmitted(idTaskSubmitted) {
    const url_api = this.API_URL + "/review/task/" + idTaskSubmitted;
    return this.http.get(url_api).pipe(map(data => data));
  }

  getAssignedReviewData(idReview) {
    const url_api = this.API_URL + "/review/student/" + idReview;
    return this.http.get(url_api).pipe(map(data => data));
  }

  saveRevisedDocument(tittlesForm, feedBackAnswers, idProffesor, idReview) {
    const url_api = this.API_URL + "/review/answer/new";
    return this.http
    .post(
      url_api, 
      {
        tittlesForm: tittlesForm,
        feedBackAnswers: feedBackAnswers, 
        idProffesor: idProffesor,
        idReview: idReview,
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }
  
  updateReview(reviewers, idSubmittedTask) {
    const url_api = this.API_URL + "/review/proffesors/update";
    return this.http.put(url_api, 
      {
        idSubmitted: idSubmittedTask,
        reviewers
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  getAllAnswersReviewProffesors(idReview) {
    const url_api = this.API_URL + "/review/answer/all/" + idReview;
    return this.http.get(url_api).pipe(map(data => data));
  }

  getAssignedReviewers(idTaskSubmitted) {
    const url_api = this.API_URL + "/review/proffesors/" + idTaskSubmitted;
    return this.http.get(url_api).pipe(map(data => data));
  }
    
  getAssignedReviews(idProffesor, role) {
    const url_api = this.API_URL + "/review/" + idProffesor + "/" + role;
    return this.http.get(url_api).pipe(map(data => data));
  }

  updateReviewers(reviewers, idReviewers) {
    const url_api = this.API_URL + "/review/reviewers/update";
    return this.http.put(url_api, 
      {
        idReviewers: idReviewers,
        reviewers
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }
}
