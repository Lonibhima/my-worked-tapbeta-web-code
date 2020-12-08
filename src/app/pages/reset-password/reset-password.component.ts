import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from '../../theme/utils/app-validators';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  hide = true;

  constructor(public formBuilder: FormBuilder,
              public router: Router,
              public notification: NotificationService,
              private authService: AuthService) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      emailAddress: ['', Validators.compose([Validators.required, emailValidator])],
    });
  }

    public onSubmit() {
      this.authService.resetPassword(this.resetForm.value).subscribe(
        next => {
        }, error => {
          this.notification.error(error);
        }, () => {
          this.notification.success('Reset successful, please check your mail to continue');
          this.router.navigate(['/']);
        });
    }

  }

