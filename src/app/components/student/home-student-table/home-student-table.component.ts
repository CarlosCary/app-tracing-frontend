import { Component, OnInit } from '@angular/core';
import { SubjectsService } from 'src/app/services/subjects.service';
import { TasksService } from 'src/app/services/tasks.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Router } from '@angular/router';
import { currentDate } from '../../../helpers/currentDate';

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
  dataSource:any = []
  tasksData:any = [];
  subjectsData:any[] = [];
  subjectsInfo: Array<any> = new Array<any>();
  
  subjectsStudent;
  tasksStudent;

  semesterSelected = currentDate.getCurrentSemester();
  yearSelected = currentDate.getCurrentYear();

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


  pruebaMaterias;
  pruebaTareas;
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
  
  generateTableSubjects(subjectsTasks) {
    let subjects = [];
    for(let i = 0; i < subjectsTasks.length; i ++) {
      subjects.push(subjectsTasks[i].subject);
    }
    subjects.reverse();
    return subjects;
  }

  generateTableTasks(subjectsTasks) {
    let tasks = [];
    
    for(let i = 0; i < subjectsTasks.length; i ++) {

        for(let j = 0; j < subjectsTasks[i].tasksSubject.length; j ++) {
          tasks.push(subjectsTasks[i].tasksSubject[j]);
        }
    }

    return tasks;
  }

  async getTasks() {
    const idStudent = JSON.parse(localStorage.getItem("currentUser"))._id;
    this.tasksService.getAllTasksStudent(idStudent).subscribe((data) => {
      this.tasksData = data;
    });

  }

  async ngOnInit() {
    const idStudent = JSON.parse(localStorage.getItem("currentUser"))._id;
    this.tasksService.getStudentSubjectsTasks(idStudent).subscribe((data) => {
      this.dataSource = this.generateTableSubjects(data);
      this.tasksData = this.generateTableTasks(data);
    })
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