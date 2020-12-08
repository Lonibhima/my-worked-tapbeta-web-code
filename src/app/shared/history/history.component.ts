import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/_services/notification.service';
import { UserService } from 'src/app/_services/user.service';
import { TransactionHistory } from 'src/app/_models/history';

@Component({
  selector: 'app-my-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  @Input() myTransactions: TransactionHistory[];

  constructor(public formBuilder: FormBuilder,
              public router: Router,
              private notification: NotificationService,
              private userService: UserService) { }

  ngOnInit() {

  }

  reUse(id) {
    this.userService.reuse(id).subscribe(
      next => {
      }, error => {
        this.notification.error(error);
      }, () => {
        this.notification.success('Recharge Successful');
      });
  }

}
