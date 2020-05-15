import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../utils/Validators/must-match';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
  
})
export class ChangePasswordComponent implements OnInit {
  idAccount: any;
  invalidCurrentPassword:boolean = false;
  changePasswordForm: FormGroup;
  submitted = false;
  role;
  
  constructor(private authService: AuthService, 
              private router: Router,
              private route:ActivatedRoute,
              private formBuilder: FormBuilder,
              private snackBar:MatSnackBar) { 
    this.idAccount = this.route.snapshot.params.idAccount;
    const dataAccount = authService.getUser(null);
    this.role = dataAccount.role;
  }

  get form() { return this.changePasswordForm.controls; }

  get currentPassword() { return this.changePasswordForm.get('currentPassword').value };
  get password() { return this.changePasswordForm.get('password').value };
  get confirmPassword() { return this.changePasswordForm.get('confirmPassword').value };
  
  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, 
    {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  isInvalidCurrentPassword() {
    return this.invalidCurrentPassword;
  }
  
  changePassword() {
    if (this.changePasswordForm.invalid) {
      return;
    }
    else {
      this.authService.changePassword(this.idAccount, this.role, this.currentPassword, this.password)
                      .subscribe( updatePassword => {
                        console.log(updatePassword);
                        this.router.navigate(['/proffesor/home']);
                        this.snackBar.open('Contraseña cambiada', 'Ok',{
                          duration: 3000,
                          // horizontalPosition: 'right',
                          // verticalPosition: 'top'
                        });
                      },error => {
                        this.changePasswordForm.controls['currentPassword'].setErrors({'incorrect': true});
                      })
    }
      
  }
}
