import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})
export class WalletComponent implements OnInit {
  constructor(public fb: FormBuilder, private route: ActivatedRoute,
              private userService: UserService,
              private notification: NotificationService,
              private router: Router,
              private authService: AuthService) { }
topUpForm: FormGroup;
user = this.authService.currentUser;

  ngOnInit() {
    this.topUpForm = this.fb.group({
      amount: ['', Validators.required],
    });
  }

  onSubmit() {

  }

}
