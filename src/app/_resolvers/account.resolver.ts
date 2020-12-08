import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { NotificationService } from '../_services/notification.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AccountResolver implements Resolve<any> {

    constructor(private userService: UserService,
                private authService: AuthService,
                private router: Router,
                private notification: NotificationService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this.userService.accountUpdate(this.authService.currentUser.id);
    }

}
