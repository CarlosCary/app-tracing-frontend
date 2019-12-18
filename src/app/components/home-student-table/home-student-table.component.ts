import { Component, OnInit } from '@angular/core';
import { SubjectsService } from 'src/app/services/subjects.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
  columnsHeaderToDisplay: string[] = ['Nombre', 'Semestre', 'Año'];
  dataSource = ELEMENT_DATA;
  subjectsData:any[] = [];
  subjectsInfo: Array<any> = new Array<any>();
  
  subjectsStudent;
  constructor(private subjectsService: SubjectsService) { 
    
  }

  async getSubjects() {
    const idStudent = JSON.parse(localStorage.getItem("currentUser")).id;
    this.subjectsService.getStudentSubjects(idStudent).subscribe((data) => {
      this.dataSource = this.parseSubjects(data);
    });
  }

  parseSubjects(subjects) {
    let model;
    subjects.forEach(subject => {
      model = {
        Nombre: subject.subject_name,
        Semestre: subject.subject_semester,
        Año: subject.year
      }
      this.subjectsData.push(model);
    });
    return this.subjectsData;
  }

  async ngOnInit() {
    this.subjectsStudent = await this.getSubjects();
    console.log(this.subjectsStudent);
  }
}