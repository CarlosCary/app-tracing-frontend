import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  API_URL = environment.APIEndpoint;
  constructor(private http: HttpClient, private router:Router) { }

  headers: HttpHeaders = new HttpHeaders ({
    "Content-type": "application/json",
  });
  
  createTask(taskName:string , idSubject:string, deadline:string, visibilityDate:string, documentsRequested, formTittles, formDescriptions) {
    const url_api = this.API_URL + "/tasks/new";
    
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
    const url_api = this.API_URL + "/tasks/document";
    
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
    const url_api = this.API_URL + "/tasks/form";
    
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
    const url_api = this.API_URL + "/tasks/students";

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
    const url_api = this.API_URL + "/tasks/all/"+id;
    return this.http.get(url_api).pipe(map(data => data));
  }

  getAllTasksProffesor(id) {
    const url_api = this.API_URL + "/tasks/proffesor/all/"+id;
    return this.http.get(url_api).pipe(map(data => data));
  }

  getFormRequestedTask(taskId) {
    const url_api = this.API_URL + "/tasks/form/" + taskId;
    return this.http.get(url_api).pipe(map(data => data));
  }

  sendTask(idTask, idStudent, idSubject, fileDocument:Array<File>) {
    const url_api = this.API_URL + "/tasks/send";
    
    let formData = new FormData();

    formData.append("idTask", idTask);
    formData.append("idStudent", idStudent);
    formData.append("idSubject", idSubject);

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

  getTasksStudentSubject(idSubject, idStudent) {
    const url_api = this.API_URL + "/tasks/proffesor/" + idSubject + "/" + idStudent;
    return this.http.get(url_api).pipe(map(data => data));
  }
  
  getTaskSubmitted(idTask) {
    const url_api = this.API_URL + "/tasks/submitted/" + idTask;
    return this.http.get(url_api).pipe(map(data => data));
  }

  taskChecked(idTaskSubmitted, state, taskCheckedDescription) {
    const url_api = this.API_URL + "/tasks/proffesor/checked";
    return this.http
    .post(
      url_api, 
      {
        idTaskSubmitted: idTaskSubmitted,
        taskSubmittedState: state,
        taskCheckedDescription: taskCheckedDescription
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  getStudentsTasksSubmitted(idTask) {
    const url_api = this.API_URL + "/tasks/subject/" + idTask + "/" + "students";
    return this.http.get(url_api).pipe(map(data => data));
  }

  getStudentSubjectsTasks(idStudent) {
    const url_api = this.API_URL + "/tasks/subjects/" + idStudent;
    return this.http.get(url_api).pipe(map(data => data));
  }

  getTaskSubmittedData(idTask, idStudent) {
    const url_api = this.API_URL + "/tasks/submitted/" + idTask + "/" + idStudent;
    return this.http.get(url_api).pipe(map(data => data));
  }

  getTaskDate(idTask) {
    const url_api = this.API_URL + "/tasks/date/" + idTask;
    return this.http.get(url_api).pipe(map(data => data));
  }

  updateTaskDate(idTask, deadline) {
    const url_api = this.API_URL + "/tasks/date/update";
    return this.http.put(url_api, 
      {
        idTask: idTask,
        deadline
      },
      { headers: this.headers }
    )
    .pipe(map(data => data));
  }

  getTaskSubmittedData2(idTask, idStudent, idTaskSubmitted) {
    const url_api = this.API_URL + "/tasks/submitted/" + idTask + "/" + idStudent + "/" + idTaskSubmitted;
    return this.http.get(url_api).pipe(map(data => data));
  }
}
