import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, matchingPasswords, passwordValidator } from '../../theme/utils/app-validators';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;

  constructor(public formBuilder: FormBuilder,
              public router: Router,
              public notification: NotificationService,
              private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailAddress: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      // rememberMe: [false]
    });
  }

    public onLoginFormSubmit() {
      this.authService.login(this.loginForm.value).subscribe(
        next => {
        }, error => {
          this.notification.error('invalid username or password');
        }, () => {
          this.notification.success('Logged in successfully');
          this.router.navigate(['/recharge']);
        });
    }

  }

