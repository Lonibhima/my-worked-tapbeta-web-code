import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ClipboardService } from 'ngx-clipboard';
import { NotificationService } from 'src/app/_services/notification.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.scss']
})
export class InviteFriendsComponent implements OnInit {
  constructor(public formBuilder: FormBuilder,
              private clipboardService: ClipboardService,
              private notification: NotificationService,
              private authService: AuthService) { }
    user = this.authService.currentUser;
              // bonus = '5000';
referralCode = this.user.referralCode;
friends = this.user.registeredFriend;
  ngOnInit() {
    this.clipboardService.copyResponse$.subscribe(re => {
      if (re.isSuccess) {
          this.notification.success('Referral code copied');
      }
  });

  }


  copy() {
    this.clipboardService.copy(this.referralCode);
  }

}
