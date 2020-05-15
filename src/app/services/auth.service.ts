import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { UserInterface } from 'src/app/models/user-interface';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  API_URL = environment.APIEndpoint;
  constructor(private http: HttpClient, private router:Router) { 
    
  }

  
  headers: HttpHeaders = new HttpHeaders ({
    "Content-type": "application/json"
  });

  isLoggedIn() {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    
    if(user)
      return true;

    return false;
  }

  registerProffesor(name:string , email:string, career:string, role:string, academicDegree:string,  password:string) {
    const url_api = this.API_URL + "/proffesor/new";
    return this.http
    .post(
      url_api, 
      {
        name,
        career,
        role,
        academicDegree,
        email, 
        password
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }
  

  registerStudent(name:string, email:string, password:string) {
    const url_api = this.API_URL + "/signup";
    
    return this.http
    .post(
      url_api, 
      {
        name: name,
        email: email, 
        password: password
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }


  loginUser(email, password): Observable<any> {
    const url_api = this.API_URL + "/signin";
    return this.http
    .post(
      url_api, 
      {
        username: email,
        email: email, 
        password: password
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  setUser(user: UserInterface): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }

  getUser(user: UserInterface) {
    let user_string = JSON.parse(localStorage.getItem("currentUser"));
    return user_string;
  }

  setToken(token): void {    
    localStorage.setItem("accessToken", token);
  }

  logoutUser() {
    
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
  }

  getProffesorsList() {
    const url_api = this.API_URL + "/proffesors";
    return this.http.get(url_api).pipe(map(data => data));
  }

  getProffesors() {
    const url_api = this.API_URL + "/proffesor/all";
    return this.http.get(url_api).pipe(map(data => data));
  }

  getCurrentUser() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser;
  }

  getProffesor(idProffesor) {
    const url_api = this.API_URL + "/proffesor/" + idProffesor;
    return this.http.get(url_api).pipe(map(data => data));
  }

  updataProffesorAccount(idProffesor, name, career, role, academicDegree) {
    const url_api = this.API_URL + "/proffesor/update";
    return this.http.put(url_api, 
      {
        idProffesor,
        name,
        career,
        role,
        academicDegree
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  getDataAccount(idAccount) {
    const url_api = this.API_URL + "/account/" + idAccount;
    return this.http.get(url_api).pipe(map(data => data));
  }

  updateDataAccount(idAccount, name, email, role) {
    const url_api = this.API_URL + "/account/update";
    return this.http.put(url_api, 
      {
        idAccount,
        name,
        email,
        role
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(errorMessage);
  }
  
  changePassword(idAccount, role, currentPassword, newPassword) {
    const url_api = this.API_URL + "/account/update/password";
    return this.http.put(url_api, 
      {
        idAccount,
        role,
        currentPassword,
        newPassword,
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }
}
