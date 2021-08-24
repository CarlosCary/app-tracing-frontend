import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProffesorService {
  API_URL = environment.APIEndpoint;
  constructor(private http: HttpClient, private router:Router) { }

  headers: HttpHeaders = new HttpHeaders ({
    "Content-type": "application/json",
  });

  getProffesorsAvaliableCommitte(idAccount) {
    const url_api = this.API_URL + "/proffesor/committe/" + idAccount;
    return this.http.get(url_api).pipe(map(data => data));
  }

  getProffesorsAvaliableCommitteAndSelected(idAccount, idTaskSubmitted) {
    const url_api = this.API_URL + "/proffesor/committe/" + idAccount + "/" + idTaskSubmitted;
    return this.http.get(url_api).pipe(map(data => data));
  }

  getReviewersAssigned(idProffesor, idStudent) {
    const url_api = this.API_URL + "/review/reviewers/" + idStudent + "/" + idProffesor;
    return this.http.get(url_api).pipe(map(data => data));
  }
}
