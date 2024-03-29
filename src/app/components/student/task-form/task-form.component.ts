import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  APILink = environment.APIEndpoint;
  idSubject;
  idTask;

  isButtonSendTouched:boolean = false;
  isSubmitAvaliable:boolean = true;

  documentsRequested;
  documentsRequestedTask;
  
  columnsHeaderTaskSubmitted: string[] = ['number', 'date', 'options'];
  columnsHeaderToDisplay: string[] = ['tittle', 'description'];
  tittlesForm;
  descriptionsForm;
  dataSource:any = [];
  taskName;

  
  documentsLinks;
  sendDates;

  documentsSubmittedData = [];

  filesForm: FormGroup;
  get filesF() { return this.filesForm.controls; }
  get file() { return this.filesForm.get('file').value; }
  
  constructor(private tasksService: TasksService,
              private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private _snackBar: MatSnackBar) { 
    this.filesForm = this.formBuilder.group({
      file: ['', Validators.required]
    });
  }

  
  ngOnInit() {
    this.idSubject = this.route.snapshot.params.idSubject;
    this.idTask = this.route.snapshot.params.idTask;
    
    this.filesForm = this.formBuilder.group({
      file: ['', [Validators.required, 
        RxwebValidators.extension({extensions:["pdf"]}),
        // RxwebValidators.fileSize({maxSize: 10}) This validation doesnt work
      ]]
    });
    
    const idStudent = (JSON.parse(localStorage.getItem("currentUser")))._id;
    this.tasksService.getFormRequestedTask(this.idTask).subscribe(( data:any ) => {
      this.isDeadLineAvaliable(data.deadline);
      this.getFormRequestedData(data);
      this.dataSource = this.generateDataTable();
    });

    this.tasksService.getTaskSubmittedData(this.idTask, idStudent).subscribe((data:any) => {
      this.documentsSubmittedData = this.generateDocumentsSubmittedData(data.taskSubmittedData, data.idsReviewAssigned);
    });
  }

  isDeadLineAvaliable(deadline) {
    const deadLineDate = new Date(deadline);
    let todayDate = new Date();
    todayDate.setHours(0,0,0,0);
    
    if(deadLineDate < todayDate)
      this.isSubmitAvaliable = false;
    
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
    if(this.filesForm.invalid) {
      return;
    }
    
    let fileUpload: Array<File> = new Array<File>();
    fileUpload.push(((<HTMLInputElement>document.getElementById("file")).files)[0]);
    
    
    const idStudent = JSON.parse(localStorage.getItem("currentUser"))._id;
    
    await this.tasksService.sendTask( this.idTask, idStudent, this.idSubject, fileUpload ).
    subscribe(task => {
      this.router.navigate(['/student/home']);
      this.openSnackBar("¡Tarea entregada!", "Ok");
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  isDataSourceReady() {
    if(this.dataSource.length != 0)
      return true;
    else
      return false;
  }

  touchButton() {
    this.isButtonSendTouched = true;
  }
  
}
