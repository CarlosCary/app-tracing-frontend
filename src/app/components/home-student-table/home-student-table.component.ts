import { Component, OnInit } from '@angular/core';
import { SubjectsService } from 'src/app/services/subjects.service';
import { TasksService } from 'src/app/services/tasks.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Router } from '@angular/router';

export interface Subject {
  Nombre: string;
  Semestre: string;
  Año: number;
  otroDato;
}

const ELEMENT_DATA: Subject[] = [
  { Nombre: 'Seminario de grado', Semestre: 'Primero', Año: 2019, otroDato: 1},
  { Nombre: 'Taller de grado', Semestre: 'Segundo', Año: 2019, otroDato: 2},
  { Nombre: 'Seminario de grado', Semestre: 'Primero', Año: 2019, otroDato: 3},
  { Nombre: 'Taller de grado', Semestre: 'Segundo', Año: 2019, otroDato: 4},
];

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
  dataSource:any = ELEMENT_DATA;
  tasksData;
  subjectsData:any[] = [];
  subjectsInfo: Array<any> = new Array<any>();
  
  subjectsStudent;
  tasksStudent;
  constructor(private subjectsService: SubjectsService, 
              private tasksService: TasksService,
              private router: Router) { 
    
  }

  async getSubjects() {
    const idStudent = JSON.parse(localStorage.getItem("currentUser"))._id;
    this.subjectsService.getStudentSubjects(idStudent).subscribe((data) => {
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
    await this.getSubjects();
    await this.getTasks();
    
  }

  public prueba(idSubject, idTaskSubject) {
    return idSubject === idTaskSubject;
  }

  public sendTask(_id) {
    localStorage.setItem("taskId", _id);
    this.router.navigate(['/student/task']);
  }
}