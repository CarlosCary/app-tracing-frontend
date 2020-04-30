import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  APILink = "http://localhost:3000";
  
  documentsRequested;
  documentsRequestedTask;
  
  columnsHeaderTaskSubmitted: string[] = ['number', 'date', 'options'];
  columnsHeaderToDisplay: string[] = ['tittle', 'description'];
  tittlesForm;
  descriptionsForm;
  dataSource = [];
  taskName;

  
  documentsLinks;
  sendDates;

  documentsSubmittedData = [];

  filesForm: FormGroup;
  get filesF() { return this.filesForm.controls; }
  get file() { return this.filesForm.get('file').value; }
  
  constructor(private tasksService: TasksService,
              private router: Router,
              private formBuilder: FormBuilder) { 
    this.filesForm = this.formBuilder.group({
      file: ['', Validators.required]
    });
  }

  
  ngOnInit() {
    const idTask = localStorage.getItem("taskId");
    const idStudent = (JSON.parse(localStorage.getItem("currentUser")))._id;
    this.tasksService.getFormRequestedTask(idTask).subscribe((data) => {
      this.getFormRequestedData(data);
      this.dataSource = this.generateDataTable();
    });

    this.tasksService.getTaskSubmittedData(idTask, idStudent).subscribe((data:any) => {
      // console.log('xdxd');
      // console.log(data.taskSubmittedData);
      // this.documentsLinks = data.taskSubmittedData.documents;
      // console.log('info del servicio')
      console.log(data);

      this.documentsSubmittedData = this.generateDocumentsSubmittedData(data.taskSubmittedData, data.idsReviewAssigned);
    });
  }

  generateDocumentsSubmittedData(taskSubmittedData, idsReviewAssigned) {
    let data = []

    for(let i = 0; i < taskSubmittedData.length; i ++) {
      data.push({
        id: taskSubmittedData[i]._id,
        idReviewAssigned: idsReviewAssigned[i],
        number: i + 1,
        dateDelivery: taskSubmittedData[i].dateSend,
        link: taskSubmittedData[i].documents[0],
      })
    }
    
    return data;
  }

  generateDataTable() {
    let dataTable = [];
    for(let i =0; i < this.tittlesForm.length; i++) {
      dataTable.push({tittle: this.tittlesForm[i], description: this.descriptionsForm[i], isText: true});
    }

    for(let i =0; i < this.documentsRequestedTask.length; i++) {
      dataTable.push({tittle: 'Documento solicitado', description: this.documentsRequestedTask[i], isText: false})
    }

    return dataTable;
  }

  getFormRequestedData(formRequestedData) {
    this.tittlesForm = formRequestedData.formRequested.tittleForm;
    this.descriptionsForm = formRequestedData.formRequested.descriptionForm;
    this.documentsRequestedTask = formRequestedData.documentsRequested;
    this.taskName = formRequestedData.name;
  }

  async sendTask() {
    let documents:Array<File> = new Array<File>();
    
    // for(let i = 0; i < this.documentsRequestedTask.length; i ++) {
    //   documents.push(((<HTMLInputElement>document.getElementById("file-"+i)).files)[0]);
    // }
    
    let fileUpload: Array<File> = new Array<File>();
    fileUpload.push(((<HTMLInputElement>document.getElementById("file")).files)[0]);
    
    const idTask = localStorage.getItem("taskId");
    const idStudent = JSON.parse(localStorage.getItem("currentUser"))._id;
    
    await this.tasksService.sendTask( idTask, idStudent, fileUpload ).
    subscribe(task => {
      this.router.navigate(['/student/home']);
      return task;
    });
  }

  isDataSourceReady() {
    if(this.dataSource.length != 0)
      return true;
    else
      return false;
  }

  
}
