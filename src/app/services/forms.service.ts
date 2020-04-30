import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  constructor(private http: HttpClient) { }

  headers: HttpHeaders = new HttpHeaders ({
    "Content-type": "application/json",
  });

  createFormTask(formTittle:string, tittles, descriptions, idProffesor) {
    const url_api = "http://localhost:3000/form/task/new";
    
    return this.http
    .post(
      url_api, 
      {
        formTittle: formTittle,
        tittles: tittles,
        descriptions: descriptions,
        idProffesor: idProffesor
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  getFormsTasks(idProffesor) {
    const url_api = "http://localhost:3000/form/task/all/" + idProffesor;
    return this.http.get(url_api).pipe(map(data => data));
  }

  getFormTask(idForm) {
    const url_api = "http://localhost:3000/form/task/" + idForm;
    return this.http.get(url_api).pipe(map(data => data));
  }

  updateTaskForm(idTaskForm, formTittle, formDescription, tittles, descriptions) {

    const url_api = "http://localhost:3000/form/task/update";
    return this.http.put(url_api, 
      {
        idTaskForm: idTaskForm,
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
