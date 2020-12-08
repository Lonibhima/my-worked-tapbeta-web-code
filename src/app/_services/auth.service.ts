import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Country } from '../_models/country';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  countrySub = new BehaviorSubject<Country[]>(null);
  currentCountries = this.countrySub.asObservable();
  countries: Country[];

  photoUrl = new BehaviorSubject<any>(null);
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient,
              private router: Router,
              private notification: NotificationService,
              private sanitizer: DomSanitizer) {}

  changeMemberPhoto(photoUrl: any) {
    this.photoUrl.next(photoUrl);
  }

  convertImage(bytes) {
      this.changeMemberPhoto(bytes);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'Customer/Login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.access_token);
          localStorage.setItem('user', JSON.stringify(user.customer));
          this.currentUser = user.customer;
          if (this.currentUser.picture) {
          this.convertImage(this.currentUser.picture);
          }
        }
      })
    );
  }


  register(user: User) {
    return this.http.post(this.baseUrl + 'Customer/AddCustomer', user);
  }

  resetPassword(user) {
    return this.http.post(this.baseUrl + 'Customer/ResetPassword', user);
  }

  changePassword(user) {
    return this.http.post(this.baseUrl + 'Customer/ChangePassword', user);
  }

  getCountries() {
    return this.http.get<Country[]>(this.baseUrl + 'Utility/GetCountries');
  }

  getBiller(phoneNumber, isoName): Observable<any> {
   return this.http.get<any>(this.baseUrl + 'Utility/GetOperator/' + phoneNumber + '/' + isoName);
  }

  getBillersManual(isoName): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'Utility/GetOperator/' + isoName);
   }
  loadCountries() {
    const countries = localStorage.getItem('countries');
    if (countries) {
      this.countries = JSON.parse(countries);
      } else {
        this.getCountries().subscribe(data => {
          this.countries = data;
          this.countrySub.next(data);
          localStorage.setItem('countries', JSON.stringify(data));
        }, error => {
          console.log(error);
        });
      }
  }

  getToken() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    // this.decodedToken = token;
    this.decodedToken = this.jwtHelper.decodeToken(token);
    this.currentUser = JSON.parse(user);
    if (this.currentUser?.picture) {
      this.convertImage(this.currentUser.picture);
      }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('countries');
    this.decodedToken = null;
    this.currentUser = null;
    this.notification.message('logged out');
    this.changeMemberPhoto(null);
    this.router.navigate(['/']);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
