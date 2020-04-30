import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/models/user-interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  Roles: any = ['Docente', 'Estudiante'];

  constructor(private authService: AuthService, private router: Router) { }
  user: UserInterface = {
    name: "",
    username: "",
    email: "",
    password: ""
  }
  ngOnInit() {
  }

  onRegister(): void {
    this.authService
    .registerUser(this.user.name, this.user.username, this.user.email, this.user.password)
    .subscribe( user => {
      // console.log(user);
      this.authService.setUser(user);
      this.router.navigate(['/student/home']);
    });
  }
  
}
