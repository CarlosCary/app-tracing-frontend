import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { SubjectsService } from 'src/app/services/subjects.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enrolled-subject',
  templateUrl: './enrolled-subject.component.html',
  styleUrls: ['./enrolled-subject.component.css']
})
export class EnrolledSubjectComponent implements OnInit {
  ngOnInit() {
  }
  constructor(private subjectsService: SubjectsService, private router: Router) { }
  selectFormControl = new FormControl('', Validators.required);
  private code:string;

  onEnrolledSubject(): void {
    const student = JSON.parse(localStorage.getItem("currentUser"));
    
    this.subjectsService
    .enrolledSubject(this.code, student._id)
    .subscribe( subjectEnrolled => {
      this.router.navigate(['/student/home']);
    });
  }

}
