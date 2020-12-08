import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationService } from '../_services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router,
              private notification: NotificationService) {}
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }


    this.notification.error('You need to log in!');
    this.router.navigate(['/sign-in']);
    return false;
  }
}
