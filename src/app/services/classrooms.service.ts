import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassroomsService {
  API_URL = environment.APIEndpoint;
  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders ({
    'Content-type': 'application/json',
  });

  assignClassroom(classroom, idTaskSubmitted) {
    const url_api = this.API_URL + '/classroom/new';
    
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
