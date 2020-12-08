import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { NotificationService } from 'src/app/_services/notification.service';
import { AuthService } from 'src/app/_services/auth.service';
import { TransactionHistory } from '../../_models/history';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  myHistory: TransactionHistory[] = [];

  constructor(public formBuilder: FormBuilder,
              public router: Router,
              public notification: NotificationService,
              private authService: AuthService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.myHistory = data.history;
    });
  }

}
