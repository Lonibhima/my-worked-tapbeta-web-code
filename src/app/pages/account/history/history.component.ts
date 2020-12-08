import { Component, OnInit } from '@angular/core';
import { TransactionHistory } from 'src/app/_models/history';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class AccountHistoryComponent implements OnInit {
  myHistory: TransactionHistory[] = [];
  constructor(private route: ActivatedRoute) { }
  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);
      this.myHistory = data.history;
    });
  }
}
