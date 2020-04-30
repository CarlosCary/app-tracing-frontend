import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor (private router: Router,
               private authService: AuthService) {
  
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const currentUser = this.authService.getCurrentUser();
    if(currentUser) {
      
      if (route.data.roles && route.data.roles.indexOf(currentUser.role) === -1) {
        // role not authorised so redirect to home page
        if(currentUser.role === 'proffesor')
          this.router.navigate(['/proffesor/home']);
        
        if(currentUser.role === 'student')
          this.router.navigate(['/student/home']);
        
        if(currentUser.role === 'administrator')
          this.router.navigate(['/administrator/home']);
        
        if(currentUser.role === 'director')
          this.router.navigate(['/proffesor/home']);
        
        return false;
      }

      return true;
    }

    //isn't logged
      this.router.navigate(['/login']);
      return false;
  }
  
}
