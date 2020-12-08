import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchingPasswords, emailValidator } from '../../theme/utils/app-validators';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  hide = true;
  hide2 = true;
  hide1 = true;

  constructor(public formBuilder: FormBuilder,
              public router: Router,
              public notification: NotificationService,
              private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const emailParams = this.route.snapshot.queryParams.email;
    const tokenParams = this.route.snapshot.queryParams.token;

    this.changePasswordForm = this.formBuilder.group({
      emailAddress: [emailParams, Validators.compose([Validators.required, emailValidator])],
      password: ['', Validators.compose([Validators.minLength(4), Validators.required])],
      token: [tokenParams, Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.required],
    }, {validator: matchingPasswords('password', 'confirmPassword')});
  }

    public onSubmit() {
      this.authService.changePassword(this.changePasswordForm.value).subscribe(
        next => {
        }, error => {
          this.notification.error(error);
        }, () => {
          this.notification.success('Password changed successfully');
          this.router.navigate(['/sign-in']);
        });
    }

  }

