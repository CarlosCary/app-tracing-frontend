import { Component, OnInit } from '@angular/core';
import { SubjectsService } from 'src/app/services/subjects.service';
import { TasksService } from 'src/app/services/tasks.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-student-table',
  templateUrl: './home-student-table.component.html',
  styleUrls: ['./home-student-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class HomeStudentTableComponent implements OnInit {
  columnsHeaderToDisplay: string[] = ['name', 'subjectCode', 'semester', 'year'];
  dataSource
  tasksData;
  subjectsData:any[] = [];
  subjectsInfo: Array<any> = new Array<any>();
  
  subjectsStudent;
  tasksStudent;

  semesterSelected = "Segundo";
  yearSelected = "2019";

  semester = [
    {value: 'Primero'},
    {value: 'Segundo'}
  ];

  year = [
    {value: '2018'},
    {value: '2019'},
    {value: '2020'},
    {value: '2021'},
    {value: '2022'}
  ];

  constructor(private subjectsService: SubjectsService, 
              private tasksService: TasksService,
              private router: Router) { 
    
  }

  async getSubjects(semester, year) {
    const idStudent = JSON.parse(localStorage.getItem("currentUser"))._id;
    this.subjectsService.getStudentSubjects(idStudent, semester, year).subscribe((data) => {
      this.dataSource = data;
      this.dataSource.reverse();
    });
  }
  
  async getTasks() {
    const idStudent = JSON.parse(localStorage.getItem("currentUser"))._id;
    console.log("idStudent: ");
    console.log(idStudent);
    this.tasksService.getAllTasksStudent(idStudent).subscribe((data) => {
      this.tasksData = data;
    });

  }

  async ngOnInit() {
    await this.getSubjects(this.semesterSelected, this.yearSelected);
    await this.getTasks();
  }

  public isIdSubjectIdTaskSubject(idSubject, idTaskSubject) {
    return idSubject === idTaskSubject;
  }

  public sendTask(_id) {
    localStorage.setItem("taskId", _id);
    this.router.navigate(['/student/task']);
  }

  public filter() {
    this.getSubjects(this.semesterSelected, this.yearSelected);
  }
}