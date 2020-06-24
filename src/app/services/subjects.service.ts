import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  API_URL = environment.APIEndpoint;
  constructor(private http: HttpClient, private router:Router) { 
  }
  
  headers: HttpHeaders = new HttpHeaders ({
    "Content-type": "application/json"
  });

  createSubject(name:string , subjectSemester:string, year:string, idProffesor:string) {
    const url_api = this.API_URL + "/subjects/new";
    
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
    const url_api = this.API_URL + "/subjects/new/enrolled";
    
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
    const url_api = this.API_URL + "/subjects";
    return this.http.get(url_api).pipe(map(data => data));
  }

  getStudentSubjects(id, semester, year) {
  
    const url_api = this.API_URL + "/subjects/student/" + id+ "/" + semester + "/" + year;
    return this.http.get(url_api).pipe(map(data => data));
  }

  getProffesorSubjects(id) {
    const url_api = this.API_URL + "/subjects/proffesor/" + id;
    return this.http.get(url_api).pipe(map(data => data));
  }

  getProffesorSubjects2(id, semester, year) {
    const url_api = this.API_URL + "/subjects/proffesor/" + id + "/" + semester + "/" + year;
    return this.http.get(url_api).pipe(map(data => data));
  }

  getStudentsDataEnrolledSubject(idSubject) {
    const url_api = this.API_URL + "/subjects/enrolled/" + idSubject;
    return this.http.get(url_api).pipe(map(data => data));
  }

  addDocumentSubject(idSubject, fileName, fileDocument:Array<File>) {
    const url_api = this.API_URL + "/subjects/document/new";
    
    let formData = new FormData();

    formData.append("idSubject", idSubject);
    formData.append("fileName", fileName);

    for(let i = 0; i < fileDocument.length; i++) {
      formData.append("fileDocument", fileDocument[i]);
    }

    return this.http
    .post(
      url_api,  
      formData
    )
    .pipe(map(data => data));
  }

  getFilesSubject(idSubject) {
    const url_api = this.API_URL + "/subjects/files/" + idSubject;
    return this.http.get(url_api).pipe(map(data => data));
  }

  deleteFile(id) {
    const url_api = this.API_URL + "/subjects/file/delete/" + id;
    return this.http.delete(url_api).pipe(map(data => data));
  }
}
