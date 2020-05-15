import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormsReviewsService {
  API_URL = environment.APIEndpoint;

  constructor(private http: HttpClient, private router:Router) { }

  headers: HttpHeaders = new HttpHeaders ({
    "Content-type": "application/json",
  });

  createFormReview(formTittle:string , formDescription:string, tittles, descriptions, idProffesor) {
    const url_api = this.API_URL + "/form/review/new";
    return this.http
    .post(
      url_api, 
      {
        formTittle: formTittle,
        formDescription: formDescription, 
        tittles: tittles,
        descriptions: descriptions,
        idProffesor: idProffesor
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  getReviewForms(idProffesor) {
    const url_api = this.API_URL + "/form/review/all/" + idProffesor;
    return this.http.get(url_api).pipe(map(data => data));
  }

  getReviewForm(idReviewForm) {
    const url_api = this.API_URL + "/form/review/" + idReviewForm;
    return this.http.get(url_api).pipe(map(data => data));
  }

  updateTaskForm(idReviewForm, formTittle, formDescription, tittles, descriptions) {

    const url_api = this.API_URL + "/form/review/update";
    return this.http.put(url_api, 
      {
        idReviewForm: idReviewForm,
        formTittle: formTittle,
        formDescription: formDescription,
        tittles: tittles,
        descriptions: descriptions
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }
}
