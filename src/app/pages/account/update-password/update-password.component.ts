import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchingPasswords } from 'src/app/theme/utils/app-validators';
import { UserService } from 'src/app/_services/user.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  constructor(public formBuilder: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private notification: NotificationService) { }
  hide = true;
  hide2 = true;
  hide1 = true;
  user = this.authService.currentUser;
  updatePasswordForm: FormGroup;

  ngOnInit() {
    this.updatePasswordForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(4)]) ],
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    }, {validator: matchingPasswords('newPassword', 'confirmPassword')});

  }

  onSubmit() {
    this.userService.updatePassword(this.user.id, this.updatePasswordForm.value).subscribe(
      next => {
      }, error => {
        this.notification.error(error);
      }, () => {
        this.notification.success('Password changed successfully');
        this.updatePasswordForm.reset();
      });
  }

}
