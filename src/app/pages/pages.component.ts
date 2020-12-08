import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from '../app.settings';
import { AppService } from '../app.service';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  langs = ['English'];
  selected = 'English';
  public settings: Settings;
  photoUrl: string;
  user: User;
  constructor(public appSettings: AppSettings,
              public appService: AppService,
              public router: Router,
              public authService: AuthService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
this.authService.currentPhotoUrl.subscribe(photo => this.photoUrl = photo);
  }

  public stopClickPropagate(event: any){
    event.stopPropagation();
    event.preventDefault();
  }

  ngAfterViewInit(){

  }

  onLogout() {
    this.authService.logout();
  }

}
