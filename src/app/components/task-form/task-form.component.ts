import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  documentsRequested;

  constructor(private tasksService: TasksService,
              private router: Router) { 
    
  }

  ngOnInit() {
    const idTask = localStorage.getItem("taskId");
    this.tasksService.getFormRequestedTask(idTask).subscribe((data) => {
      this.documentsRequested = data[0].documentsRequested;
    });
  }

  async sendTask() {
    let documents:Array<File> = new Array<File>();

    for(let i = 0; i < this.documentsRequested.length; i ++) {
      documents.push(((<HTMLInputElement>document.getElementById("file-"+i)).files)[0]);
    }
    const idTask = localStorage.getItem("taskId");
    const idStudent = JSON.parse(localStorage.getItem("currentUser"))._id;

    await this.tasksService.sendTask( idTask, idStudent, documents ).
      subscribe(task => {
        this.router.navigate(['/student/home']);
        return task;
    });
  }
}
