import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-review-task-submitted',
  templateUrl: './review-task-submitted.component.html',
  styleUrls: ['./review-task-submitted.component.css']
})
export class ReviewTaskSubmittedComponent implements OnInit {

  APILink = "http://localhost:3000";
  
  columnsHeaderToDisplay: string[] = ['tittle', 'description'];

  idTask;
  taskData;

  tittlesForm;
  descriptionsForm;
  documentsSubmitted;

  dataSource; 
  documentsRequested;
  taskName;

  state;
  reviewDesciption;

  isNotReviewed;
  constructor(private route: ActivatedRoute,
    private tasksService: TasksService,
    private router: Router) { 
    this.idTask = this.route.snapshot.params.idTask;
  }

  generateDataTableData() {
    let dataTable = [];
    for(let i =0; i < this.tittlesForm.length; i++) {
      dataTable.push({tittle: this.tittlesForm[i], description: this.descriptionsForm[i], isText: true});
    }

    for(let i =0; i < this.documentsSubmitted.length; i++) {
      dataTable.push({tittle: this.documentsRequested[i], 
                      isText: false, 
                      id:"file-" + i, 
                      path: this.documentsSubmitted[0]});
    }

    return dataTable;
  }

  ngOnInit() {
    

    this.tasksService.getFormRequestedTask(this.idTask).subscribe((data) => {
      this.tittlesForm = data[0].formRequested.tittleForm;
      this.descriptionsForm = data[0].formRequested.descriptionForm;
      this.documentsRequested = data[0].documentsRequested;
      this.taskName = data[0].name;
      this.tasksService.getTaskSubmitted(this.idTask).subscribe((data)=> {
        this.taskData = data;
        this.documentsSubmitted = this.taskData[0].documents;
        console.log((this.taskData[0].documents).length);
        this.dataSource = this.generateDataTableData();
        console.log(this.dataSource);

        this.isNotReviewed = this.isReviewed(data);
      })
      
    })
  }

  sendReviewTask() {
    this.reviewDesciption = (<HTMLInputElement>document.getElementById("review-description")).value;
    const idTaskSubmitted = this.taskData[0]._id;
    this.tasksService
    .taskChecked(idTaskSubmitted, this.state, this.reviewDesciption)
    .subscribe( taskChecked => {
      this.router.navigate(['/proffesor/home']);
    });
  }

  isReviewed(taskData) {
    console.log("esto se esta llamando");
    if(taskData[0].state === "none")
      return true;
    
    return false;
  }
}
