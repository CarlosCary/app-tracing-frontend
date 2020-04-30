import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { ActivatedRoute } from '@angular/router';
import { stateTaskSubmitted } from '../../../helpers/stateTaskSubmitted';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-list-students-tasks',
  templateUrl: './list-students-tasks.component.html',
  styleUrls: ['./list-students-tasks.component.css']
})
export class ListStudentsTasksComponent implements OnInit {
  
  columnsHeaderToDisplay: string[] = ['name', 'state', 'options'];
  idTask;
  studentsData;
  dataSource;
  taskName;

  areReviewersAssigned;
  constructor(private tasksService:TasksService,
              private route:ActivatedRoute,
              private reviewService: ReviewsService) { 
    this.idTask = this.route.snapshot.params.idTask; 
    this.taskName = this.route.snapshot.params.taskName; 
  }

  generateTable(studentsTasksSubmitted) {
    let studentsTasks = [];
    for(let i = 0; i < studentsTasksSubmitted.length; i ++) {
      if(studentsTasksSubmitted[i].taskSubmitted) {
        studentsTasks.push({studentName: studentsTasksSubmitted[i].student.name,
                            idStudent: studentsTasksSubmitted[i].student._id,
                            taskState: stateTaskSubmitted.getStateMessage(studentsTasksSubmitted[i].taskSubmitted.state),
                            idTask: studentsTasksSubmitted[i].taskSubmitted.idTask,
                            idTaskSubmitted: studentsTasksSubmitted[i].taskSubmitted._id,
                            areReviewersAssigned: studentsTasksSubmitted[i].reviewAssigned
                          })
      }
      else {
        studentsTasks.push({studentName: studentsTasksSubmitted[i].student.name,
                            taskState: "No entregó la tarea"
        })
      }
    }

    return studentsTasks;
  }

  async ngOnInit() {
    await this.tasksService.getStudentsTasksSubmitted(this.idTask).subscribe((studentsTask) => {
      this.dataSource = this.generateTable(studentsTask);
    });

  }

  isSubmitted(state) {
    if(state == "No entregó la tarea")
      return false;
    
    return true;
  }
}