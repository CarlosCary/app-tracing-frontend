import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SubjectsService } from 'src/app/services/subjects.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { currentDate } from '../../../helpers/currentDate';

export interface Subject {
  id: number;
  subject_name: string;
  subject_semester: string;
  year: number;
  id_proffesor: number;
}



@Component({
  selector: 'app-home-proffesor-table',
  templateUrl: './home-proffesor-table.component.html',
  styleUrls: ['./home-proffesor-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class HomeProffesorTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'enrolled','semester', 'code', 'year', 'options'];
  subjectsEnrolled:any[];
  subjectsData:any[];
  tasksData;
  
  semesterSelected = currentDate.getCurrentSemester();
  yearSelected = currentDate.getCurrentYear();

  semester = [
    {value: 'Primero'},
    {value: 'Segundo'}
  ];

  year = [
    {value: '2019'},
    {value: '2020'},
    {value: '2021'},
    {value: '2022'}
  ];

  constructor(private subjectsService: SubjectsService, 
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private router: Router,
    private tasksService: TasksService) { 
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/new-task.svg'));
  }

  async getTasks() {
    const idProffesor = JSON.parse(localStorage.getItem("currentUser"))._id;
    
    this.tasksService.getAllTasksProffesor(idProffesor).subscribe((data:any) => {
      this.tasksData = data.reverse();
  
    });
  }

  async ngOnInit() {
    this.getSubjects(this.semesterSelected, this.yearSelected);
    await this.getTasks();
  }

  getIdSubject() {
    //TO DO
    return null;
  }

  saveIdSubject(idSubject) {
    localStorage.setItem("idSubject", idSubject);
  }

  newTask(idSubject) {
    
    this.saveIdSubject(idSubject);

    this.router.navigate(['/proffesor/task']);
  }
  
  public isIdSubjectIdTaskSubject(idSubject, idTaskSubject) {
    return idSubject === idTaskSubject;
  }

  getSubjects(semester, year) {
    const idProffesor = JSON.parse(localStorage.getItem("currentUser"))._id;
    
    this.subjectsService.getProffesorSubjects2(idProffesor, semester, year).subscribe((data:any) => {
      this.subjectsData = data;

      // this.dataSource.reverse();
    });
    
  }

  filter() {
    this.getSubjects(this.semesterSelected, this.yearSelected);
  }
}
