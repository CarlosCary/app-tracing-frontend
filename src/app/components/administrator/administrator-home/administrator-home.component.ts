import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrator-home',
  templateUrl: './administrator-home.component.html',
  styleUrls: ['./administrator-home.component.css']
})
export class AdministratorHomeComponent implements OnInit {
  columnsHeaderToDisplay: string[] = ['name', 'email', 'career', 'role', 'options'];
  dataSource;
  constructor(private auth:AuthService,
              private router: Router) { }

  ngOnInit() {
    this.loadProffesorAccounts();
  }

  loadProffesorAccounts() { 
    this.auth.getProffesors().subscribe( proffesors => {
      this.dataSource = proffesors;
    });
  }

  deleteAccount(id) {
    window.location.reload();
    
    this.auth.deleteAccount(id).subscribe( account => {
      this.loadProffesorAccounts();
    });
  }

  isAdministrator(role) { 
    
    if(role == "administrator")
      return true;
    
    return false;
  }
  getRoleLabel(role) {
    if(role === 'administrator')
      return 'Administrador';
    
    if(role === 'proffesor')
      return 'Docente';
    if(role === 'director')
      return 'Director';
  }
}
