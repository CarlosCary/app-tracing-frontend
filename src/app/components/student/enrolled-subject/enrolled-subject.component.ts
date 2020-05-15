import { Component, OnInit } from '@angular/core';
import { SubjectsService } from 'src/app/services/subjects.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-enrolled-subject',
  templateUrl: './enrolled-subject.component.html',
  styleUrls: ['./enrolled-subject.component.css']
})
export class EnrolledSubjectComponent implements OnInit {
  errorMessage:string;
  subjectEnrolledForm: FormGroup;
  
  ngOnInit() {
    this.subjectEnrolledForm = this.formBuilder.group({
      subjectCode: ['', Validators.required]
    });
  }
  constructor(private subjectsService: SubjectsService, 
              private router: Router,
              private formBuilder: FormBuilder,) { }
  
  
  get form() { return this.subjectEnrolledForm.controls; }

  get subjectCode() { return this.subjectEnrolledForm.get('subjectCode').value }
  onEnrolledSubject(): void {
    const student = JSON.parse(localStorage.getItem("currentUser"));
    if(this.subjectEnrolledForm.invalid)
      return;
      
    this.subjectsService
    .enrolledSubject(this.subjectCode, student._id)
    .subscribe( subjectEnrolled => {
      this.router.navigate(['/student/home']);
    },
    e => {
      this.errorMessage = e.error.message;
      this.subjectEnrolledForm.controls['subjectCode'].setErrors({'incorrect': true});
    });
  }

}
