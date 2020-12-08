import { Injectable } from '@angular/core';
import { TopUp } from '../_models/top-up';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { NotificationService } from '../_services/notification.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AutoTopUpResolver implements Resolve<TopUp[]> {


    constructor(private userService: UserService, private router: Router,
                private notification: NotificationService,
                private authService: AuthService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<TopUp[]> {
        return this.userService.getAutoTopUps(this.authService.currentUser.id).pipe(
            catchError(error => {
                this.notification.error('Problem retrieving data');
                this.router.navigate(['/']);
                return of(null);
            })
        );
    }

}
