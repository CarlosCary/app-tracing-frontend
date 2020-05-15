import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor (private authService: AuthService,
              private router: Router) {
  }

  canActivate() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.router.navigate(['student/home']);
    }
    
    return true;
  }
  
}
