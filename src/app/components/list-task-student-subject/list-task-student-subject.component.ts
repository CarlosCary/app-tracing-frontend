import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { stateTaskSubmitted } from '../../helpers/stateTaskSubmitted';
@Component({
  selector: 'app-list-task-student-subject',
  templateUrl: './list-task-student-subject.component.html',
  styleUrls: ['./list-task-student-subject.component.css']
})
export class ListTaskStudentSubjectComponent implements OnInit {
  columnsHeaderToDisplay: string[] = ['name', 'state'];
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
    
    for(let i = 0; i < (tasksAssignedAndSubmitted.tasksSubmitted).length; i ++) {  
      if(tasksAssignedAndSubmitted.tasksSubmitted[i] !== null)
        tasksAssignedAndSubmitted.assignedTask[i].state = stateTaskSubmitted.getStateMessage(tasksAssignedAndSubmitted.tasksSubmitted[i].state);
      else 
        tasksAssignedAndSubmitted.assignedTask[i].state = "undelivered";
      
    }
    
    return tasksAssignedAndSubmitted.assignedTask;
  }

  ngOnInit() {
    this.tasksService.getTasksStudentSubject(this.idSubject, this.idStudent).subscribe((data => {
      this.tasksData = this.generateTableData(data);
    }));
  }

  isSubmitted(task) {
    if(task.state == "undelivered") 
      return false;
    
    return true;
  }
}
