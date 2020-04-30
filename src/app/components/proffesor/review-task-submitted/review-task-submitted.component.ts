import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { stateTaskSubmitted } from '../../../helpers/stateTaskSubmitted';
import { ReviewsService } from 'src/app/services/reviews.service';
@Component({
  selector: 'app-review-task-submitted',
  templateUrl: './review-task-submitted.component.html',
  styleUrls: ['./review-task-submitted.component.css']
})
export class ReviewTaskSubmittedComponent implements OnInit {

  APILink = "http://localhost:3000";
  
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

  areReviewersAssigned:boolean;


  constructor(private route: ActivatedRoute,
    private tasksService: TasksService,
    private router: Router,
    private reviewService: ReviewsService) { 
    this.idTask = this.route.snapshot.params.idTask;
    this.idStudent = this.route.snapshot.params.idStudent;
    this.idTaskSubmitted = this.route.snapshot.params.idTaskSubmitted;
    console.log(this.idTaskSubmitted);
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

    // console.log(this.documentsSubmitted);
    for(let i =0; i < this.documentsSubmitted.length; i++) {
      dataTable.push ({
                      tittle: this.documentsRequested[i], 
                      isText: false, 
                      id:"file-" + i, 
                      path: this.documentsSubmitted[0]});
    }

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

    dataTable.push ({
      tittle: "Última modificación",
      description: this.dateModify,
      isText: true
    })

    return dataTable;
  }

  stablishDataTaskSubmitted() {
    console.log('estableciendo datos de la entrega');
    console.log(this.taskData);
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
    // console.log(data.taskSubmittedData);
    return data.taskSubmittedData;
  }

  getTaskFormData(data) {
    return data.formTask;
  }
  getAuthorName(data) {
    return data.author;
  }

  //Este metodo hace dos cosas, refactorizar
  _areReviewersAssigned(reviewers) {
    if(reviewers) {
      this.areReviewersAssigned = true;
      return reviewers;
    }
    else {
      this.areReviewersAssigned = false;
      return null;
    }
  }

  ngOnInit() {
    this.tasksService.getTaskSubmittedData2(this.idTask, this.idStudent, this.idTaskSubmitted).subscribe((data) => {
      this.formTaskData = this.getTaskFormData(data);
      this.taskData = this.getTaskSubmittedData(data);
      this.authorName = this.getAuthorName(data);
      // console.log(data);
      this.stablishDataTaskSubmitted();
      this.stablishDataTaskRequested();

      this.reviewService.getReviewTaskSubmitted(this.idTaskSubmitted).subscribe((reviewData:any) => {
        this.reviewers = this._areReviewersAssigned(reviewData.reviewersData);
        // console.log(reviewData);
        this.idReview = reviewData.idReview;
      });
      this.dataSource = this.generateDataTable();
    });

    
    

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
