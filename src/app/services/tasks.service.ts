import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient, private router:Router) { }

  headers: HttpHeaders = new HttpHeaders ({
    "Content-type": "application/json",
  });
  
  createTask(taskName:string , idSubject:string, deadline:string, visibilityDate:string, documentsRequested, formTittles, formDescriptions) {
    const url_api = "http://localhost:3000/tasks/new";
    
    return this.http
    .post(
      url_api, 
      {
        taskName: taskName,
        idSubject: idSubject, 
        deadline: deadline,
        visibilityDate: visibilityDate,
        documentsRequested: documentsRequested,
        formTittles: formTittles,
        formDescriptions: formDescriptions
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  addDocumentTask(documentName:string , idTask:string) {
    const url_api = "http://localhost:3000/tasks/document";
    
    return this.http
    .post(
      url_api, 
      {
        documentName: documentName,
        idTask: idTask, 
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  addFormTask(formTittle:string , formDesciption:string, idTask:string) {
    const url_api = "http://localhost:3000/tasks/form";
    
    return this.http
    .post(
      url_api, 
      {
        formTittle: formTittle,
        formDesciption: formDesciption,
        idTask: idTask, 
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  assignTaskAllStudentsSubject(idSubject:string , idTask:string) {
    const url_api = "http://localhost:3000/tasks/students";

    return this.http
    .post(
      url_api, 
      {
        id_subject: idSubject,
        id_task: idTask
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  getAllTasksStudent(id) {
    const url_api = "http://localhost:3000/tasks/all/"+id;
    return this.http.get(url_api).pipe(map(data => data));
  }

  getFormRequestedTask(taskId) {
    const url_api = "http://localhost:3000/tasks/form/" + taskId;
    return this.http.get(url_api).pipe(map(data => data));
  }

  sendTask(idTask, idStudent, fileDocument:Array<File>) {
    const url_api = "http://localhost:3000/tasks/send";

    console.log("tipo de este array xd: ");
    console.log(fileDocument);

    
    let prueba = ['uno', 'dos'];
    
    let formData = new FormData();

    formData.append("idTask", idTask);
    formData.append("idStudent", idStudent);

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
}
