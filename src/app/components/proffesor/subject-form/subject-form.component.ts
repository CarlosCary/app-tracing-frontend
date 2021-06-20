import { Component, OnInit } from '@angular/core';
import { SubjectInterface } from 'src/app/models/subject-interface';
import { SubjectsService } from 'src/app/services/subjects.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
  
  subjectForm: FormGroup;
  isFormSubmitted = false;
  private subject: SubjectInterface = {
    name: "",
    semester: "",
    year: "",
    idProffesor: ""
  }


  constructor(private subjectsService: SubjectsService, 
              private router: Router,
              private formBuilder: FormBuilder,) { }
  selectFormControlSubject = new FormControl('', Validators.required);
  selectFormControlSemester = new FormControl('', Validators.required);
  semesters: String[] = [
    "Primero",
    "Segundo"
  ];

  subjects: String[] = [
    "Seminario de grado",
    "Taller de grado"
  ];

  get form() { return this.subjectForm.controls; }
  
  get subjectSelected () { return this.subjectForm.get('subjectSelected').value };
  get semesterSelected () { return this.subjectForm.get('semesterSelected').value };
  ngOnInit() {
    this.subjectForm = this.formBuilder.group({
      subjectSelected: ['', Validators.required],
      semesterSelected: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRegisterSubject(): void {
    if (this.subjectForm.invalid) 
      return;
    
    const user = JSON.parse(localStorage.getItem("currentUser"));
    this.subject.idProffesor = user._id;
    let currentYear = new Date().getFullYear();

    this.subject.year = currentYear.toString();  
    this.subjectsService
    .createSubject(this.subjectSelected, this.semesterSelected, this.subject.year, this.subject.idProffesor)
    .subscribe( subject => {
      this.router.navigate(['/proffesor/home']);
    });
  }

  sendForm() {
    this.isFormSubmitted = true;
  }
}
