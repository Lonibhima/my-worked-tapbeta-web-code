import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: any;
  public sidenavOpen = true;
  public links = [
    // { name: 'Wallet', href: 'wallet', icon: 'account_balance_wallet' },
    { name: 'Account Information', href: 'information', icon: 'info' },
    { name: 'Transaction History', href: 'history', icon: 'receipt_long' },
    { name: 'Manage Cards', href: 'cards', icon: 'payment' },
    { name: 'Invite Friends', href: 'invite-friends', icon: 'group_add' },
    { name: 'Promotions', href: 'promotions', icon: 'redeem' },
    { name: 'Auto Top up', href: 'auto-top-up', icon: 'autorenew' },
    { name: 'Update Password', href: 'update-password', icon: 'security' },
  ];
  constructor(public router: Router) { }

  ngOnInit() {
    if (window.innerWidth < 960){
      this.sidenavOpen = false;
    }
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (window.innerWidth < 960){
          this.sidenav.close();
        }
      }
    });
  }

}
