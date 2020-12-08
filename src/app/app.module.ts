import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AgmCoreModule } from '@agm/core';

import { OverlayContainer, Overlay } from '@angular/cdk/overlay';
import { MAT_MENU_SCROLL_STRATEGY } from '@angular/material/menu';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import { menuScrollStrategy } from './theme/utils/scroll-strategy';

import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SuccessComponent } from './pages/success/success.component';
import { FailedComponent } from './pages/failed/failed.component';
import { TopMenuComponent } from './theme/components/top-menu/top-menu.component';

import { AppSettings } from './app.settings';
import { AppService } from './app.service';
import { AppInterceptor } from './theme/utils/app-interceptor';
import { FooterComponent } from './theme/components/footer/footer.component';
import { MySnackbarService } from './shared/my-snackbar/my-snackbar.service';
import { NotificationService } from './_services/notification.service';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { AuthGuard } from './_guards/auth.guard';
import { HistoryResolver } from './_resolvers/history.resolver';
import { AutoTopUpResolver } from './_resolvers/auto-top-up.resolver';
import { AccountResolver } from './_resolvers/account.resolver';
import { JwtModule } from '@auth0/angular-jwt';
import { TimeAgoPipe } from './_pipes/timeAgo.pipe';
import { MySnackbarComponent } from './shared/my-snackbar/my-snackbar.component';
import { FormsModule } from '@angular/forms';


export function getToken() {
   return localStorage.getItem('token');
}
@NgModule({
   imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA1rF9bttCxRmsNdZYjW7FzIoyrul5jb-s'
    }),
    SharedModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
         tokenGetter: getToken,
         allowedDomains: ['topbetaapidev.azurewebsites.net'],
         disallowedRoutes: ['topbetaapidev.azurewebsites.net/customer/login', 'topbetaapidev.azurewebsites.net/customer/AddCustomer']
      }
   })
  ],
  declarations: [
    AppComponent,
    PagesComponent,
    NotFoundComponent,
    SuccessComponent,
    FailedComponent,
    TopMenuComponent,
    FooterComponent,
    TimeAgoPipe,
    MySnackbarComponent,
  ],
  providers: [
    AppSettings,
    AppService,
    MySnackbarService,
    NotificationService,
    AuthService,
    ErrorInterceptorProvider,
    AuthGuard,
    UserService,
    HistoryResolver,
    AutoTopUpResolver,
    AccountResolver,
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    { provide: MAT_MENU_SCROLL_STRATEGY, useFactory: menuScrollStrategy, deps: [Overlay] },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
  ],
  entryComponents: [MySnackbarComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
