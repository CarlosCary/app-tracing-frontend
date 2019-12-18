import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SubjectsService } from 'src/app/services/subjects.service';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { Router } from '@angular/router';

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
  styleUrls: ['./home-proffesor-table.component.css']
})

export class HomeProffesorTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'semester', 'code', 'year', 'options'];
  subjectsEnrolled:any[];
  subjectsData:any[];
  // dataSource = subjectsData;

  
  constructor(private subjectsService: SubjectsService, 
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private router: Router) { 
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/new-task.svg'));
  }

  ngOnInit() {
    this.subjectsService.getSubjects().subscribe((data: any[])=>{
      this.subjectsData = data;
    })
  }

  getIdSubject() {
    //TO DO
    return null;
  }

  saveIdSubject(idSubject) {
    //TODO 
    // console.log(idSubject);
    localStorage.setItem("idSubject", idSubject);
  }

  newTask(idSubject) {
    this.saveIdSubject(idSubject);

    this.router.navigate(['/proffesor/task']);
  }
}
