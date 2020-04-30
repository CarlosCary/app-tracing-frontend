import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';

export const DATE_FORMAT = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'app-edit-task-date',
  templateUrl: './edit-task-date.component.html',
  styleUrls: ['./edit-task-date.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: DATE_FORMAT },
  ],
})
export class EditTaskDateComponent implements OnInit {
  currentDate:any;
  newDate;
  
  idTask;
  
  constructor(private tasksService:TasksService,
              private route:ActivatedRoute,
              private router: Router) {
    this.idTask = this.route.snapshot.params.idTask;
    this.tasksService.getTaskDate(this.idTask).subscribe((studentsTask:any) => {
      this.currentDate = new Date(studentsTask.deadline);
      // console.log(this.currentDate);
      console.log(studentsTask.deadline);
      // console.log(studentsTask.deadline);
    });
  }

  async ngOnInit() {  
  }

  changeDate() {
    
    const newDate = (<HTMLInputElement>document.getElementById("date")).value
    this.tasksService.updateTaskDate(this.idTask, this.currentDate.format('MM-DD-YYYY'))
    .subscribe(() => {
      this.router.navigate(['/proffesor/home']);
    });
  }
}
