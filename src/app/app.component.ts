import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from './app.settings';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading: boolean = false;
  public settings: Settings;
  constructor(public appSettings: AppSettings,
              public router: Router,
              private authService: AuthService){
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.authService.loadCountries();
    if (this.authService.loggedIn) {
      this.authService.getToken();
    }
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          window.scrollTo(0,0);
      }
    });
  }
}
