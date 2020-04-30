import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProffesorService {

  constructor(private http: HttpClient, private router:Router) { }

  headers: HttpHeaders = new HttpHeaders ({
    "Content-type": "application/json",
  });

  getProffesorsAvaliableCommitte(idAccount) {
    const url_api = "http://localhost:3000/proffesor/committe/" + idAccount;
    return this.http.get(url_api).pipe(map(data => data));
  }

  getProffesorsAvaliableCommitteAndSelected(idAccount, idTaskSubmitted) {
    const url_api = "http://localhost:3000/proffesor/committe/" + idAccount + "/" + idTaskSubmitted;
    return this.http.get(url_api).pipe(map(data => data));
  }
}
