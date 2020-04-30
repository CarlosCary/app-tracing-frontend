import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProffesorInterface } from 'src/app/models/proffesor-interface';

@Component({
  selector: 'app-edit-proffesor-account',
  templateUrl: './edit-proffesor-account.component.html',
  styleUrls: ['./edit-proffesor-account.component.css']
})
export class EditProffesorAccountComponent implements OnInit {
  
  idProffesor;
  careers = ['Ingeniería de sistemas', 'Ingeniería Mecatrónica', 
            'Internet de las cosas', 'Ingeniería empresarial',
            'Administración de empresas'];

  proffesorData: ProffesorInterface = {
    name: "",
    email: "",
    career: "",
    role: "",
    academicDegree: "",
    password: ""
  }
  
  constructor(private route:ActivatedRoute,
              private auth:AuthService,
              private router:Router) { 
    this.idProffesor = this.route.snapshot.params.idProffesorAccount;
  }

  chargeData(proffesor) {
    this.proffesorData = proffesor;
  }

  async ngOnInit() {
    await this.auth.getProffesor(this.idProffesor).subscribe( proffesor => {
      // this.chargeData(proffesor);
      this.proffesorData = proffesor;
      console.log("data")
      console.log(this.proffesorData);
    });
  }

  async editProffesorAccount() {
    

    await this.auth.updataProffesorAccount(
        this.idProffesor,
        this.proffesorData.name,
        this.proffesorData.career,
        this.proffesorData.role,
        this.proffesorData.academicDegree
    )
    .subscribe( proffesorUpdated => {
      console.log(proffesorUpdated);
      this.router.navigate(['/proffesor/forms/task']);
      // this.router.navigate(['/proffesor/forms/task']);
    });
  }
}
