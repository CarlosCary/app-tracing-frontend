import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private http: HttpClient, private router:Router) { 
  }
  
  headers: HttpHeaders = new HttpHeaders ({
    "Content-type": "application/json"
  });

  createSubject(name:string , subjectSemester:string, year:string, idProffesor:string) {
    const url_api = "http://localhost:3000/subjects/new";
    
    return this.http
    .post(
      url_api, 
      {
        subject_name: name,
        subject_semester: subjectSemester, 
        year: year,
        id_proffesor: idProffesor
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  enrolledSubject(subject_code:string, id_student:string) {
    const url_api = "http://localhost:3000/subjects/new/enrolled";
    
    return this.http
    .post(
      url_api, 
      {
        id_student: id_student, 
        subject_code: subject_code
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  getSubjects() {
    const url_api = "http://localhost:3000/subjects";
    return this.http.get(url_api).pipe(map(data => data));
  }

  getStudentSubjects(id) {
    const url_api = "http://localhost:3000/subjects/student/"+id;
    return this.http.get(url_api).pipe(map(data => data));
  }

  getSubject(id) {
    const url_api = "http://localhost:3000/subjects/"+id;
    return this.http.get(url_api).pipe(map(data => data));
  }
}
