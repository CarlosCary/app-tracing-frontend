import { Component, OnInit } from '@angular/core';
import { SubjectInterface } from 'src/app/models/subject-interface';
import { SubjectsService } from 'src/app/services/subjects.service';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

export interface Animal {
  name: string;
  sound: string;
}

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.css']
})
export class SubjectFormComponent implements OnInit {
  private subject: SubjectInterface = {
    name: "",
    semester: "",
    year: "2019",
    idProffesor: ""
  }
  constructor(private subjectsService: SubjectsService, private router: Router) { }
  selectFormControl = new FormControl('', Validators.required);
  semesters: String[] = [
    "Primero",
    "Segundo"
  ];

  ngOnInit() {
  }

  onRegisterSubject(): void {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    this.subject.idProffesor = user.id;
    this.subjectsService
    .createSubject(this.subject.name, this.subject.semester, this.subject.year, this.subject.idProffesor)
    .subscribe( subject => {
      this.router.navigate(['/proffesor/home']);
    });
  }
}
