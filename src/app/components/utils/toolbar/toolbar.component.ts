import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user-interface';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  hideNotificaction:boolean = false;
  allDocumentsNotifications:number = 10;
  tutorDocumentsNotification:number = 5;
  rapporteourDocumentsNotification:number = 3;

  hideDocumentsNotification:boolean = true;
  hideTutorDocumentsNotification:boolean = true;
  hideRapporteourDocumentsNotification:boolean = true;

  isLoggedIn:boolean;
  userName:any;
  role:string;
  isProffesor:boolean;
  idAccount:string;

  constructor(private authService: AuthService, 
              private router: Router,
              private notificationsService: NotificationsService) {
    if(localStorage.getItem("currentUser")) {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      this.isLoggedIn = true;
      this.idAccount = user._id;
      this.authService.getDataAccount(user._id).subscribe( (dataAccount:any) => {
        this.userName = dataAccount.name;  
        this.role = this.getRoleLabel(dataAccount.role);
        this.isProffesor = this.isProffesorAccount(dataAccount.role);
      })
      
      if(user.role != 'student') {
        this.notificationsService.getNotificationsProffesor(user._id).subscribe (notications => {
          if(notications)
            this.chargeNotifications(notications);
        });
      }
      
    }
    else {
      this.isLoggedIn = false;
    }
  }

  chargeNotifications(notifications) {
    
    this.tutorDocumentsNotification = notifications.tutor;
    this.rapporteourDocumentsNotification = notifications.rapporteur;
    
    this.allDocumentsNotifications = notifications.tutor 
                                    + notifications.rapporteur 
                                    + notifications.director;
    if(this.allDocumentsNotifications > 0)
      this.hideDocumentsNotification = false;                       
    if(this.tutorDocumentsNotification > 0)
      this.hideTutorDocumentsNotification = false;                       
    if(this.rapporteourDocumentsNotification > 0)
      this.hideRapporteourDocumentsNotification = false;                       
  }

  getRoleLabel(role) {
    if(role == "proffesor")
      return "Docente";
    if(role == "student")
      return "Estudiante";
    if(role == "administrator")
      return "Administrador";
    if(role == "director")
      return "Director";
    
      return "No valido!";
  }
  
  isProffesorAccount(role) {
    if(role == "proffesor" || role == "director")
      return true;
    return false;
  }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']);
  }
}
