import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-administrator-home',
  templateUrl: './administrator-home.component.html',
  styleUrls: ['./administrator-home.component.css']
})
export class AdministratorHomeComponent implements OnInit {
  columnsHeaderToDisplay: string[] = ['name', 'email', 'career', 'role', 'options'];
  dataSource;
  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.auth.getProffesors().subscribe( proffesors => {
      this.dataSource = proffesors;
    });
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
