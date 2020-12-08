import { Component, OnInit, ViewChild } from '@angular/core';
import { Data, AppService } from '../../../app.service';
import { Settings, AppSettings } from '../../../app.settings';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { Router } from '@angular/router';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {
  @ViewChild('accountMenuTrigger') trigger: MatMenuTrigger;
  public settings: Settings;
  constructor(public appSettings: AppSettings,
              public appService: AppService,
              public authService: AuthService,
              private notification: NotificationService,
              private router: Router) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    if (this.loggedIn) {
      this.authService.getToken();
    }

  }

  loggedIn() {
    // const token = localStorage.getItem('token');
    // return !!token;
    return this.authService.loggedIn();
  }

  close() {
    this.trigger.closeMenu();
  }

  open() {
    this.trigger.openMenu();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.notification.message('logged out');
    this.router.navigate(['/']);
  }



}
