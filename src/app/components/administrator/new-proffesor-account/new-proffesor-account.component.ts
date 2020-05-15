import { Component, OnInit } from '@angular/core';
import { ProffesorInterface } from 'src/app/models/proffesor-interface';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../utils/Validators/must-match';

@Component({
  selector: 'app-new-proffesor-account',
  templateUrl: './new-proffesor-account.component.html',
  styleUrls: ['./new-proffesor-account.component.css']
})
export class NewProffesorAccountComponent implements OnInit {
  proffesorAccountForm: FormGroup;
  isFormSubmitted:boolean = false;

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
              private router:Router,
              private formBuilder: FormBuilder,) { }
  
  get form() { return this.proffesorAccountForm.controls; }


  get name() { return this.proffesorAccountForm.get('name').value };
  get email() { return this.proffesorAccountForm.get('email').value };
  get career() { return this.proffesorAccountForm.get('career').value };
  get role() { return this.proffesorAccountForm.get('role').value };
  get academicDegree() { return this.proffesorAccountForm.get('academicDegree').value };
  get password() { return this.proffesorAccountForm.get('password').value };
  get confirmPassword() { return this.proffesorAccountForm.get('confirmPassword').value };

  ngOnInit() {
    this.proffesorAccountForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      career: ['', Validators.required],
      role: ['', Validators.required],
      academicDegree: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, 
    {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  registerProffesor() {
    if(this.proffesorAccountForm.invalid)
      return;

    this.authService
    .registerProffesor(this.name, this.email, this.career,
                      this.role, this.academicDegree, this.password)
    .subscribe( proffesor => {
      //Cuenta creada con exito
      this.router.navigate(['/administrator/home']);
    });
  }

  sendForm() {
    this.isFormSubmitted = true;
  }
}
