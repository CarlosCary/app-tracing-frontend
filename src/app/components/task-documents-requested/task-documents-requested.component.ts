import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task-documents-requested',
  templateUrl: './task-documents-requested.component.html',
  styleUrls: ['./task-documents-requested.component.css']
})
export class TaskDocumentsRequestedComponent implements OnInit {

  documentsRequested;

  constructor(private tasksService: TasksService) { 
    
  }

  ngOnInit() {

    const idTask = localStorage.getItem("taskId");
    this.tasksService.getFormRequestedTask(idTask).subscribe((data) => {
      this.documentsRequested = data[0].documentsRequested;
    });
  }

}
