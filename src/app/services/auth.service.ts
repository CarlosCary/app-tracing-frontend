import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map, catchError } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { UserInterface } from 'src/app/models/user-interface';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient, private router:Router) { 
    
  }

  
  headers: HttpHeaders = new HttpHeaders ({
    "Content-type": "application/json"
  });

  registerProffesor(name:string , email:string, career:string, role:string, academicDegree:string,  password:string) {
    const url_api = "http://localhost:3000/proffesor/new";
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
  

  registerUser(name:string , username:string, email:string, password:string) {
    const url_api = "http://localhost:3000/signup";
    
    return this.http
    .post(
      url_api, 
      {
        name: name,
        username: email, 
        email: email, 
        password: password
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }


  loginUser(email:string, password:string): Observable<any> {
    const url_api = "http://localhost:3000/signin";
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
    //TODO in backend
  }

  logoutUser() {
    let accessToken = localStorage.getItem("accessToken");
    // const url_api = "http://localhost:3000/logout/accessToken"//Close session TODO
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
  }

  getProffesorsList() {
    const url_api = "http://localhost:3000/proffesors";
    return this.http.get(url_api).pipe(map(data => data));
  }

  getProffesors() {
    const url_api = "http://localhost:3000/proffesor/all";
    return this.http.get(url_api).pipe(map(data => data));
  }

  getCurrentUser() {
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    return currentUser;
  }

  getProffesor(idProffesor) {
    const url_api = "http://localhost:3000/proffesor/" + idProffesor;
    return this.http.get(url_api).pipe(map(data => data));
  }

  updataProffesorAccount(idProffesor, name, career, role, academicDegree) {
    const url_api = "http://localhost:3000/proffesor/update";
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
    const url_api = "http://localhost:3000/account/" + idAccount;
    return this.http.get(url_api).pipe(map(data => data));
  }

  updateDataAccount(idAccount, name, email, role) {
    const url_api = "http://localhost:3000/account/update";
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
    const url_api = "http://localhost:3000/account/update/password";
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
