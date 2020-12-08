import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TopUp } from 'src/app/_models/top-up';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-auto-top-up',
  templateUrl: './auto-top-up.component.html',
  styleUrls: ['./auto-top-up.component.scss']
})
export class AutoTopUpComponent implements OnInit {
  constructor(public fb: FormBuilder,
              private userService: UserService,
              private authService: AuthService,
              private notification: NotificationService,
              private route: ActivatedRoute) { }
days = [];
weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
frequencies = ['Monthly', 'Weekly', 'BiMonthly'];
airtimeForm: FormGroup;
dataForm: FormGroup;
types = ['Airtime'];
activeTopUps: TopUp[] = [];
inactiveTopUps: TopUp[] = [];
showNew = false;
user = this.authService.currentUser;
userTopUps: TopUp[] = [];

dataTopUp = ['1 week 6GB ₦500',
'1 month 12GB ₦10000'];
countries = this.authService.countries;


filteredData: Observable<any>;
airtimeFilteredCountries: Observable<any>;
dataFilteredCountries: Observable<any>;


  ngOnInit() {
this.route.data.subscribe(data => {
      this.setTopUps(data.topUps);
    });

if (this.userTopUps) {
    this.airtimeForm = this.fb.group({
      frequency: ['Monthly', Validators.required],
        dates: [''],
        customerId: [this.user.phoneNumber, Validators.required],
        billerName: ['', Validators.required],
        amount: ['', Validators.required],
        country: [this.user.country],
        firstDate: [''],
        secondDate: [''],
        isAirtime: [true],
        isScheduled: [true],
        email: [this.user.emailAddress],
        flag: [''],
        isoName: [''],
        currencySymbol: [''],
        callingCodes: [''],
        networkLogo: ['']

    });

    this.dataForm = this.fb.group({
      frequency: ['Monthly', Validators.required],
        dates: [''],
        customerId: [this.user.phoneNumber, Validators.required],
        billerName: [''],
        status: ['', Validators.required],
        dataType: ['', Validators.required],
        country: [this.user.country],
        amount: ['', Validators.required],
        isAirtime: [false],
        firstDate: [''],
        secondDate: [''],
        isScheduled: [true],
        email: [this.user.emailAddress],
        flag: [''],
        isoName: [''],
        currencySymbol: [''],
        callingCodes: [''],
      networkLogo: ['']


    });

    for (let i = 1; i <= 28; i++) {
      this.days.push(i.toString());
    }
    if (this.userTopUps.length > 0) {

  }

    this.filteredData = this.dataForm.get('dataType').valueChanges
    .pipe(
        startWith(''),
        map(value => this._filterData(value))
    );

    this.dataFilteredCountries = this.dataForm.get('country').valueChanges
    .pipe(
        startWith(''),
        map(value => this._filterCountry(value))
    );

    this.airtimeFilteredCountries = this.airtimeForm.get('country').valueChanges
    .pipe(
        startWith(''),
        map(value => this._filterCountry(value))
    );

  }

this.onAirtimeCountrySelected();
this.onDataCountrySelected();
this.dataPhoneNumberChanged();
this.airtimePhoneNumberChanged();
}

  private _filterData(value: string) {
    const filterValue = value.toLowerCase();
    return this.dataTopUp.filter(option =>
        option.toLowerCase().includes(filterValue));
  }

  setTopUps(data) {
    this.userTopUps = data;
    this.filterTopup();
  }

  filterTopup() {
    this.activeTopUps = this.userTopUps.filter(x => x.status === 'Active');
    this.inactiveTopUps = this.userTopUps.filter(x => x.status === 'Unsubscribed');
  }

  dataPhoneNumberChanged() {
    const input = this.dataForm.get('customerId').value;
    if (input.length === 10) {
      if (input) {
        this.authService.getBiller(this.dataForm.get('customerId').value,
        this.dataForm.get('isoName').value).subscribe(data => {
          this.dataForm.patchValue({
            networkLogo: data.logoUrls[0],
            billerName: data.name,
          });
        });
      }
    }
  }

  airtimePhoneNumberChanged() {
    const input = this.airtimeForm.get('customerId').value;
    if (input.length === 10) {
      if (input) {
        this.authService.getBiller(this.airtimeForm.get('customerId').value,
        this.airtimeForm.get('isoName').value).subscribe(data => {
          this.airtimeForm.patchValue({
            networkLogo: data.logoUrls[0],
            billerName: data.name,
          });
        });
      }
    }
  }

  private _filterCountry(value: string) {
    const filterValue = value.toLowerCase();
    return this.countries.filter(option =>
        option.name.toLowerCase().includes(filterValue));
  }

  onAirtimeCountrySelected() {
    const value = this.airtimeForm.get('country').value;
    const selectedCountry = this.countries.find(x => x.name === value);
    this.airtimeForm.patchValue({
      isoName: selectedCountry.isoName,
      flag: selectedCountry.flag,
      currencySymbol: selectedCountry.currencySymbol,
      callingCodes: selectedCountry.callingCodes,
      country: selectedCountry.name
    });
  }
  onDataCountrySelected() {
    const value = this.dataForm.get('country').value;
    const selectedCountry = this.countries.find(x => x.name === value);
    this.dataForm.patchValue({
      isoName: selectedCountry.isoName,
      flag: selectedCountry.flag,
      currencySymbol: selectedCountry.currencySymbol,
      callingCodes: selectedCountry.callingCodes,
      country: selectedCountry.name
    });
  }

  subscribe(topup) {
    this.userService.scheduleBuyAirtime(topup).subscribe(() => {
    }, error => {
      this.notification.error(error);
    }, () => {
      this.notification.success('Schedule successful');
      this.filterTopup();
    });
  }

  unsubscribe(id) {
    this.userService.cancelSchedule(id).subscribe(() => {
    }, error => {
      this.notification.error(error);
    }, () => {
      this.notification.success('Schedule cancelled');
      this.filterTopup();
    });
  }

  onBuyAirtime() {
    if (this.airtimeForm.get('frequency').value === 'BiMonthly') {
      this.airtimeForm.patchValue({
        frequency: 3,
        dates: this.airtimeForm.get('firstDate').value
        + ',' + this.airtimeForm.get('secondDate').value
      });
    } else if (this.airtimeForm.get('frequency').value === 'Monthly') {
      this.airtimeForm.patchValue({
        frequency: 4,
      });
    } else if (this.airtimeForm.get('frequency').value === 'Weekly') {
      this.airtimeForm.patchValue({
        frequency: 2,
      });
    }
    const array = [];
    array.push(this.airtimeForm.value);
    this.userService.scheduleBuyAirtime(array)
    .subscribe((topup) => {
      this.airtimeForm.reset();
      this.showNew = false;
      this.notification.success('Schedule successful');
      this.userTopUps.push(topup[0]);
      this.filterTopup();
    }, error => {
      this.notification.error(error);
    });

  }

  onBuyData() {

  }

}
