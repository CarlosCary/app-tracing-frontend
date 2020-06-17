import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/models/user-interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ToolbarComponent } from '../toolbar/toolbar.component';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, 
              private router: Router,
              private formBuilder: FormBuilder) { }
  user: UserInterface = {
    email: "",
    password: ""
  }
  
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get loginFormControls() { return this.loginForm.controls; }

  get email() { return this.loginForm.get('email').value};
  get password() { return this.loginForm.get('password').value};

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    return this.authService
      .loginUser(this.email, this.password)
      .subscribe(
        data => {
          this.authService.setUser(data.user);
          let token = data.id;
          this.authService.setToken(token);
          this.router.navigate(['/student/home']);
        },
        error => {
          if(error.error.data.invalidEmail)
            this.loginFormControls['email'].setErrors({'incorrect': true});
          if(error.error.data.invalidPassword)
            this.loginFormControls['password'].setErrors({'incorrect': true});
        }
      );
  }

}
