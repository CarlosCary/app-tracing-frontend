import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { UserInterface } from 'src/app/models/user-interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http: HttpClient, private router:Router) { 
    
  }

  
  headers: HttpHeaders = new HttpHeaders ({
    "Content-type": "application/json"
  });

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
}
