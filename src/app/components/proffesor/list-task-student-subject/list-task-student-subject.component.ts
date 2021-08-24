import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { stateTaskSubmitted } from '../../../helpers/stateTaskSubmitted';

@Component({
  selector: 'app-list-task-student-subject',
  templateUrl: './list-task-student-subject.component.html',
  styleUrls: ['./list-task-student-subject.component.css']
})
export class ListTaskStudentSubjectComponent implements OnInit {
  columnsHeaderToDisplay: string[] = ['name', 'state', 'dateSend'];
  idSubject;
  idStudent;
  tasksData;
  state:string;
  
  constructor(private route: ActivatedRoute,
              private tasksService: TasksService) { 
    this.idSubject = this.route.snapshot.params.idSubject;
    this.idStudent = this.route.snapshot.params.idStudent;
  }

  generateTableData(tasksAssignedAndSubmitted) {
    let taskData = [];
    for(let i = 0; i < (tasksAssignedAndSubmitted.tasksSubmitted).length; i ++) {  
      tasksAssignedAndSubmitted.tasksSubmitted[i].name = tasksAssignedAndSubmitted.tasksName[i];
      tasksAssignedAndSubmitted.tasksSubmitted[i].state = stateTaskSubmitted.getStateMessage(tasksAssignedAndSubmitted.tasksSubmitted[i].state);
    }
    
    return tasksAssignedAndSubmitted.tasksSubmitted;
  }

  ngOnInit() {
    this.tasksService.getTasksStudentSubject(this.idSubject, this.idStudent).subscribe(((data:any) => {
      this.tasksData = this.generateTableData(data);
      console.log(data);
    }));
  }

  isSubmitted(task) {
    if(task.state == "undelivered") 
      return false;
    
    return true;
  }
}
