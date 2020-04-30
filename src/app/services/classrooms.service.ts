import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassroomsService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders ({
    "Content-type": "application/json",
  });

  assignClassroom(classroom, idTaskSubmitted) {
    const url_api = "http://localhost:3000/classroom/new";
    
    return this.http
    .post(
      url_api, 
      {
        classroom,
        idTaskSubmitted 
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }
}
