import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/models/user-interface';
import { Router } from '@angular/router';
import { MustMatch } from '../../utils/Validators/must-match';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  newStudentAccountForm: FormGroup;
  emailErrorMessage: String;
  constructor(private authService: AuthService, 
              private router: Router,
              private formBuilder: FormBuilder,) { }
  user: UserInterface = {
    name: "",
    username: "",
    email: "",
    password: ""
  }
  
  get form() { return this.newStudentAccountForm.controls; }
  
  get name() { return this.newStudentAccountForm.get('name').value };
  get email() { return this.newStudentAccountForm.get('email').value };
  get password() { return this.newStudentAccountForm.get('password').value };
  get confirmPassword() { return this.newStudentAccountForm.get('confirmPassword').value };
  
  ngOnInit() {
    this.newStudentAccountForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, 
    {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  onRegister(): void {
    this.authService
    .registerStudent(this.name, this.email, this.password)
    .subscribe( user => {
  
      this.authService.setUser(user);
      this.router.navigate(['/student/home']);
    },err => {
      this.newStudentAccountForm.controls['email'].setErrors({'incorrect': true});
      this.emailErrorMessage = err.error.message;
    }
    );
  }
  
}
