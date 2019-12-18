import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserInterface } from 'src/app/models/user-interface';
import { Router } from '@angular/router';
// import { ToolbarComponent } from '../toolbar/toolbar.component';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  private user: UserInterface = {
    email: "",
    password: ""
  }
  
  ngOnInit() {
  }

  onLogin() {
    return this.authService
      .loginUser(this.user.email, this.user.password)
      .subscribe(
        data => {
          this.authService.setUser(data.user);
          let token = data.id;
          this.authService.setToken(token);
          this.router.navigate(['/student/home']);
        },
        error => console.log(error)
      );
  }

}
