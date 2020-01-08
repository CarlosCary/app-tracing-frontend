import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user-interface';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  isLoggedIn:boolean;
  userName:any;
  role:string;

  constructor(private authService: AuthService, private router: Router) {
  }
  getRoleLabel(role) {
    if(role == "proffesor")
      return "Docente";
    if(role == "student")
      return "Estudiante";
    
    return "No valido!";
  }
  ngOnInit() {
    if(localStorage.getItem("currentUser")) {
      this.isLoggedIn = true;
      const user = JSON.parse(localStorage.getItem("currentUser"));
      this.userName = user.name;
      this.role = this.getRoleLabel(user.role);
    }
    else {
      this.isLoggedIn = false;
    }
  }

  onLogout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }

  userSettings() {
    // console.log("Se abrira las opciones del usuario");
  }
}
