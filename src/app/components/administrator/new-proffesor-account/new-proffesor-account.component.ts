import { Component, OnInit } from '@angular/core';
import { ProffesorInterface } from 'src/app/models/proffesor-interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-proffesor-account',
  templateUrl: './new-proffesor-account.component.html',
  styleUrls: ['./new-proffesor-account.component.css']
})
export class NewProffesorAccountComponent implements OnInit {
  proffesor: ProffesorInterface = {
    name: "",
    email: "",
    career: "",
    role: "",
    academicDegree: "",
    password: ""
  }
  careerSelected;

  careers = ['Ingeniería de sistemas', 'Ingeniería Mecatrónica', 
            'Internet de las cosas', 'Ingeniería empresarial',
            'Administración de empresas'];

  constructor(private authService:AuthService,
              private router:Router) { }

  ngOnInit() {
  }

  selectCareer(career) {
    console.log("se selecciono: ");
    console.log(this.careerSelected);
  }

  registerProffesor() {
    console.log(this.proffesor);
    this.authService
    .registerProffesor(this.proffesor.name, this.proffesor.email, this.proffesor.career,
                      this.proffesor.role, this.proffesor.academicDegree, this.proffesor.password)
    .subscribe( proffesor => {
      //Cuenta creada con exito
      this.router.navigate(['/administrator/home']);
    });
  }
}
