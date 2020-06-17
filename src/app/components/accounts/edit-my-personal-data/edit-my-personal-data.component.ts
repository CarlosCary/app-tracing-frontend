import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserInterface } from 'src/app/models/user-interface';

@Component({
  selector: 'app-edit-my-personal-data',
  templateUrl: './edit-my-personal-data.component.html',
  styleUrls: ['./edit-my-personal-data.component.css']
})
export class EditMyPersonalDataComponent implements OnInit {

  name;
  email;
  role;
  idAccount;

  constructor(private authService: AuthService, 
              private router: Router,
              private route:ActivatedRoute) { 
    this.idAccount = this.route.snapshot.params.idAccount;
  }
  
  chargeData(dataAccount) {
    this.name = dataAccount.name;
    this.email = dataAccount.email;
    this.role = dataAccount.role;
  }

  ngOnInit() {
    this.authService.getDataAccount(this.idAccount)
      .subscribe( dataAccount => {
        this.chargeData(dataAccount);
        
      })
  }


  editMyData() {
    this.authService.updateDataAccount(this.idAccount, this.name, this.email, this.role)
    .subscribe( accountUpdated => {
      this.router.navigate(['/proffesor/home']);
    });
    
  }
}
