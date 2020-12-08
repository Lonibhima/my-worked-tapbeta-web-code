import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
baseUrl = environment.apiUrl;

constructor(private http: HttpClient, private authService: AuthService) { }

    updateUser(user: User) {
      return this.http.put(this.baseUrl + 'Customer/UpdateCustomer', user);
    }

    updatePassword(id: string, user: User) {
      return this.http.post(this.baseUrl + 'Customer/UpdatePassword/' + id, user);
    }

    buyAirtime(payload) {
      return this.http.post(this.baseUrl + 'Transaction/NewInitiateCharge', payload)
      .pipe(
        map((response: any) => {
          window.open(response, '_blank');
        })
      );
    }

    buyBulkAirtime(payload) {
      return this.http.post(this.baseUrl + 'Airtime/BuyBulkAirtime', payload);
    }

    // addCard(payload) {
    //   return this.http.post(this.baseUrl + 'Customer/AddCard', payload);
    // }

    addCard(payload) {
      return this.http.post(this.baseUrl + 'Customer/AddCard', payload)
      .pipe(
        map((response: any) => {
          window.open(response, '_blank');
        })
      );
    }

    reuse(payload) {
      return this.http.get(this.baseUrl + 'Transaction/ReuseTransaction/' + payload);
    }

    scheduleBuyAirtime(payload) {
      return this.http.post(this.baseUrl + 'Airtime/ScheduleBuyAirtime', payload);
    }

    cancelSchedule(payload) {
      return this.http.get(this.baseUrl + 'Airtime/CancelSchedule/' + payload);
    }

    getHistory(payload) {
      return this.http.get(this.baseUrl + 'Transaction/GetByCustomer/' + payload);
    }

    getCards(payload) {
      return this.http.get(this.baseUrl + 'Customer/GetCards/' + payload);
    }

    getUser(payload) {
      return this.http.get(this.baseUrl + 'Customer/GetById/' + payload);
    }

    accountUpdate(id) {
      this.getUser(id).subscribe((result: User) => {
        this.updateCurrentUser(result);
      });
    }

    getAutoTopUps(payload) {
      return this.http.get(this.baseUrl + 'Airtime/ScheduledAirtimes/' + payload);
    }

    updateCurrentUser(user: User) {
      this.authService.currentUser = user;
      localStorage.setItem('user', JSON.stringify(user));
    }


      postImage(fileToUpload: File, id) {
        const endpoint = this.baseUrl + 'Customer/UpdatePicture/' + id;
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.http.post(endpoint, formData);
      }
    }

