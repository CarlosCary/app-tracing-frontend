import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { stateTaskSubmitted } from '../../../helpers/stateTaskSubmitted';
import { ReviewsService } from 'src/app/services/reviews.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-review-task-submitted',
  templateUrl: './review-task-submitted.component.html',
  styleUrls: ['./review-task-submitted.component.css']
})
export class ReviewTaskSubmittedComponent implements OnInit {

  APILink = environment.APIEndpoint;
  
  columnsHeaderToDisplay: string[] = ['tittle', 'description'];
  columnsHeaderToDisplayReviewers: string[] = ['name', 'email'];
  
  reviewers;

  idStudent;
  idTask;
  idReview = null;

  idTaskSubmitted;
  taskData;
  formTaskData;

  tittlesForm;
  descriptionsForm;
  documentsSubmitted;

  dataSource; 
  documentsRequested;
  taskName;

  actualState;
  lastState
  reviewDesciption;

  isNotReviewed;
  
  idSubject;
  authorName;
  dateSend;
  dateModify;

  areFormAssigned:boolean;
  areReviewers:boolean;


  constructor(private route: ActivatedRoute,
    private tasksService: TasksService,
    private router: Router,
    private reviewService: ReviewsService) { 
    this.idTask = this.route.snapshot.params.idTask;
    this.idStudent = this.route.snapshot.params.idStudent;
    this.idTaskSubmitted = this.route.snapshot.params.idTaskSubmitted;
  }

  generateDataTable() {
    let dataTable = [];
    for(let i =0; i < this.tittlesForm.length; i++) {
      dataTable.push ({
                      tittle: this.tittlesForm[i], 
                      description: this.descriptionsForm[i], 
                      isText: true});
    }

    dataTable.push ({
      tittle: "Estudiante",
      description: this.authorName,
      isText: true
    });

    

    dataTable.push ({
      tittle: "Estado",
      description: stateTaskSubmitted.getStateMessage(this.lastState),
      isText: true
    });

    dataTable.push ({
      tittle: "Fecha de presentación",
      description: this.dateSend,
      isText: true
    })

    // dataTable.push ({
    //   tittle: "Última modificación",
    //   description: this.dateModify,
    //   isText: true
    // })

    for(let i =0; i < this.documentsSubmitted.length; i++) {
      dataTable.push ({
                      tittle: "Documento", 
                      isText: false, 
                      id:"file-" + i, 
                      path: this.documentsSubmitted[0]});
    }

    return dataTable;
  }

  stablishDataTaskSubmitted() {
    this.idTaskSubmitted = this.taskData._id;
    this.documentsSubmitted = this.taskData.documents;
    this.isNotReviewed = this.isReviewed(this.taskData.state);
    this.lastState = this.taskData.state;
    this.dateSend =  this.taskData.dateSend;
    this.dateModify = this.taskData.dateModify;
  }
  
  stablishDataTaskRequested() {
    this.tittlesForm = this.formTaskData.formRequested.tittleForm;
    this.descriptionsForm = this.formTaskData.formRequested.descriptionForm;
    this.documentsRequested = this.formTaskData.documentsRequested;
    this.taskName = this.formTaskData.name;
    this.idSubject = this.formTaskData.idSubject;
  }

  getTaskSubmittedData(data) {
    return data.taskSubmittedData;
  }

  getTaskFormData(data) {
    return data.formTask;
  }
  getAuthorName(data) {
    return data.author;
  }

  _areFormAssigned(reviewers) {
    if(reviewers) {
      this.areFormAssigned = true;
      return reviewers;
    }
    else {
      this.areFormAssigned = false;
      return null;
    }
  }

  ngOnInit() {
    this.tasksService.getTaskSubmittedData2(this.idTask, this.idStudent, this.idTaskSubmitted).subscribe((data) => {
      this.formTaskData = this.getTaskFormData(data);
      this.taskData = this.getTaskSubmittedData(data);
      this.authorName = this.getAuthorName(data);

      this.stablishDataTaskSubmitted();
      this.stablishDataTaskRequested();

      this.reviewService.getReviewTaskSubmitted(this.idTaskSubmitted).subscribe((reviewData:any) => {
        this.reviewers = this._areFormAssigned(reviewData.reviewersData);
        this.idReview = reviewData.idReview;
      });
      this.dataSource = this.generateDataTable();
    });

    this.reviewService.getReviewersAssigned(this.idStudent).subscribe((data) => {
      this.areReviewers = this.areReviewersAssigned(data);
    });
    
    

  }

  areReviewersAssigned(reviewers) {
    if(reviewers)
      return true;

    return false;
  }

  sendReviewTask() {
    this.reviewDesciption = (<HTMLInputElement>document.getElementById("review-description")).value;
    

    this.tasksService
    .taskChecked(this.idTaskSubmitted, this.actualState, this.reviewDesciption)
    .subscribe( taskChecked => {
      this.router.navigate(['/proffesor/subject/students/' + this.idSubject]);
    });
  }

  isReviewed(state) {
    if(state == "none")
      return true;
    
    return false;
  }
}
