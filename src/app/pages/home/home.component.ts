import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { RechargeService } from 'src/app/_services/recharge.service';
import { NotificationService } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public slides = [
    { title: 'Top up airtime and data anytime',
    subtitle: 'Recharge made easier and faster', image: 'assets/images/carousel/1-min.jpg' },
    { title: 'Schedule subsequent top ups', subtitle: 'Auto top up with ease',
    image: 'assets/images/carousel/2-min.jpg' }
  ];

airtimeForm: FormGroup;
dataForm: FormGroup;
// selected = '+234';
countries = this.authService.countries;
dataTopUp = [];
dataFilteredCountries = [];
airtimeFilteredCountries = [];
endTime = '2020-10-15';
today = new Date().toISOString().substring(0, 10);
// today = '2020-10-16';
nowLaunched;
user = this.authService.currentUser;
showAirtimeSummary = false;
showDataSummary = false;
processingFee = 0;
airtimeOperators = [];
dataOperators = [];
filteredData = [];


  constructor(public appService: AppService,
              private fb: FormBuilder,
              private router: Router,
              private dialog: MatDialog,
              private authService: AuthService,
              private userService: UserService,
              private notification: NotificationService,
              private rechargeService: RechargeService) { }

  ngOnInit() {
    if (!this.countries) {
      this.authService.currentCountries.subscribe(res => {
        this.setCountries(res);
      });
    } else {

    if (this.endTime > this.today) {
      this.nowLaunched = false;
    } else {
      this.nowLaunched = true;
    }

    if (this.user) {

    this.airtimeForm = this.fb.group({
        isAirtime: [true, Validators.required],
        customerId: [this.user.phoneNumber, Validators.required],
        billerName: ['', Validators.required],
        amount: ['', Validators.required],
        country: [this.user.country],
        isDefault: [false],
        email: [this.user.emailAddress],
        flag: [''],
        isoName: [''],
        currencySymbol: [''],
        callingCodes: [''],
        networkLogo: [''],
        selected: [true],
        maxAmount: [0]


    });

    this.dataForm = this.fb.group({
      isAirtime: [false, Validators.required],
      customerId: [this.user.phoneNumber, Validators.required],
      billerName: ['', Validators.required],
      amount: ['', Validators.required],
      country: [this.user.country],
      isDefault: [false],
      email: [this.user.emailAddress],
      flag: [''],
      isoName: [''],
      currencySymbol: [''],
      callingCodes: [''],
      networkLogo: [''],
      selected: [true],
      maxAmount: [0],
      isBundle: [false]



  });

    if (this.user.defaultNumber) {
    this.airtimeForm.patchValue({
      customerId: this.user.defaultNumber,
      isDefault: true
    });
    this.dataForm.patchValue({
      customerId: this.user.defaultNumber,
      isDefault: true
    });
  }

    this.onDataCountrySelected();
    this.onAirtimeCountrySelected();
    this.airtimePhoneNumberChanged();


    } else {
      this.airtimeForm = this.fb.group({
        isAirtime: [true, Validators.required],
        customerId: ['', Validators.required],
        billerName: ['', Validators.required],
        amount: ['', Validators.required],
        country: [''],
        isDefault: [false],
        flag: [''],
        isoName: [''],
        currencySymbol: [''],
        callingCodes: [''],
        networkLogo: [''],
        selected: [false],
        maxAmount: [0]

    });

      this.dataForm = this.fb.group({
      isAirtime: [false, Validators.required],
      customerId: ['', Validators.required],
      billerName: ['', Validators.required],
      amount: ['', Validators.required],
      country: [''],
      isDefault: [false],
      flag: [''],
      isoName: [''],
      currencySymbol: [''],
      callingCodes: [''],
      networkLogo: [''],
      selected: [false],
      maxAmount: [0],
      isBundle: [false]



  });
    }
  }
}

startDataFilter() {
  this.filteredData = this._filterData('');
  }

  dataChanged() {
    const input = this.dataForm.get('amount').value;
    this.filteredData = this._filterData(input);
}

logForm() {
  console.log(this.dataForm);
}


startAirtimeBillerFilter() {
  this.airtimeOperators = this._filterAirtimeOperator('');
  this.airtimeForm?.patchValue({
    networkLogo: null,
    billerName: null,
  });
  }


  startDataBillerFilter() {
    this.dataOperators = this._filterDataOperator('');
    this.dataForm?.patchValue({
      networkLogo: null,
      billerName: null,
    });
    }

  private _filterData(value: string) {
    const filterValue = value.toLowerCase();
    return this.dataTopUp.filter(option =>
        option.toLowerCase().includes(filterValue));
  }

  airtimeCountryChange(index) {
    const input = this.airtimeForm.get('country').value;
    this.airtimeFilteredCountries = this._filterCountry(input);
  }

  dataCountryChange(index) {
    const input = this.dataForm.get('country').value;
    this.dataFilteredCountries = this._filterCountry(input);
  }


  onDataSelected(data) {
    if (data.includes(':')) {
      const value = data.replace(/\D/, '');
      this.dataForm.patchValue({
        amount: value
      });
    } else {
      const value = data.replace(/[^\d.-]/g, '');
      this.dataForm.patchValue({
        amount: value
      });
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
      country: selectedCountry.name,
      selected: true,
      amount: null,
      billerName: null,
      networkLogo: null
    });
    this.getAirtimeBillersManual(selectedCountry.isoName);

  }
  onDataCountrySelected() {
    const value = this.dataForm.get('country').value;
    const selectedCountry = this.countries.find(x => x.name === value);
    this.dataForm.patchValue({
      isoName: selectedCountry.isoName,
      flag: selectedCountry.flag,
      currencySymbol: selectedCountry.currencySymbol,
      callingCodes: selectedCountry.callingCodes,
      country: selectedCountry.name,
      selected: true,
      amount: null,
      billerName: null,
      networkLogo: null
    });
    this.getDataBillersManual(selectedCountry.isoName);


  }


  getDataBillersManual(isoName) {
    this.authService.getBillersManual(isoName).subscribe(data => {
      data = data.filter(x => x != null);
      this.dataOperators = data.filter(x => x.data === true || x.bundle === true);
    });
  }

  getAirtimeBillersManual(isoName) {
    this.authService.getBillersManual(isoName).subscribe(data => {
      data = data.filter(x => x != null);
      this.airtimeOperators = data.filter(x => x.data === false && x.bundle === false);
    });
  }

  setCountries(countries) {
    this.countries = countries;
    this.ngOnInit();
  }

  airtimeBillerChanged(i) {
    const input = this.airtimeForm.get('billerName').value;
    this.airtimeOperators = this._filterAirtimeOperator(input);
  }

  dataBillerChanged(i) {
    const input = this.dataForm.get('billerName').value;
    this.dataOperators = this._filterDataOperator(input);
  }


  onAirtimeBillerSelected(biller) {
    const selectedBiller = this.airtimeOperators.find(x => x.name === biller);
    this.airtimeForm.patchValue({
      billerName: selectedBiller.name,
      networkLogo: selectedBiller.logoUrls[0],
      maxAmount: selectedBiller.maxAmount
    });
  }

  private _filterAirtimeOperator(value: string) {
    const filterValue = value.toLowerCase();
    return this.airtimeOperators.filter(option =>
        option.name.toLowerCase().includes(filterValue));
  }

  private _filterDataOperator(value: string) {
    const filterValue = value.toLowerCase();
    return this.dataOperators.filter(option =>
        option.name.toLowerCase().includes(filterValue));
  }


  onBuyAirtime() {
    this.showAirtimeSummary = false;
    this.showDataSummary = false;
    if (this.authService.loggedIn()) {
          const array = [];
          array.push(this.airtimeForm.value);
          this.userService.buyAirtime(array).subscribe(
            next => {
            }, error => {
              this.notification.error(error);
            }, () => {
            });
    } else {
    const array = [];
    array.push(this.airtimeForm.value);
    this.userService.buyAirtime(array).subscribe(
      next => {
      }, error => {
        this.notification.error(error);
      }, () => {
      });

  }
}

  autoTopUp(){
    if (this.authService.loggedIn()) {
      this.rechargeService.dataValues = this.dataForm.value;
      this.rechargeService.airtimeValues = this.airtimeForm.value;
      this.router.navigateByUrl('recharge');
    } else  {
      this.dialog.open(ConfirmDialogComponent, {
        panelClass: 'auth-dialog'
      });
    }
  }

  multiple() {
    if (this.authService.loggedIn()) {
      this.rechargeService.dataValues = this.dataForm.value;
      this.rechargeService.airtimeValues = this.airtimeForm.value;
      this.router.navigateByUrl('recharge');
      } else  {
        this.dialog.open(ConfirmDialogComponent, {
          panelClass: 'auth-dialog'
        });
      }

  }


  onDataBillerSelected(biller) {
    const selectedBiller = this.dataOperators.find(x => x.name === biller);

    this.dataForm.patchValue({
      billerName: selectedBiller.name,
      networkLogo: selectedBiller.logoUrls[0],
      maxAmount: selectedBiller.maxAmount,
      amount: null,
      isBundle: false,
    });

    if (selectedBiller.name.includes('Bundle')) {
      this.dataForm.patchValue({
        isBundle: true
      });
    }

    this.dataTopUp = [];
    const currency = this.dataForm.get('currencySymbol').value;
    const dataObject = selectedBiller?.fixedAmountsDescriptions;
    const fixedObject = selectedBiller?.fixedAmounts;
    if (!this.isEmpty(dataObject)) {
      for (const property in dataObject) {
        this.dataTopUp.push(`${currency}${property}: ${dataObject[property]}`);
      }
    } else {
      fixedObject.forEach(element => {
        this.dataTopUp.push(`${currency}${element}`);
      });
    }
  }


  isEmpty(obj) {
    if (!obj)
    {
        return true;
    }

    if (!(typeof(obj) === 'number') && !Object.keys(obj).length)
    {
        return true;
    }

    return false;
}

  startAirtimeCountryFilter() {
    this.airtimeFilteredCountries = this._filterCountry('');

    this.airtimeForm.patchValue({
      country: '',
      customerId: null,
      isoName: null,
      networkLogo: null,
      billerName: null,
      selected: false,
      amount: null
    });
    }

    startDataCountryFilter() {
      this.dataFilteredCountries = this._filterCountry('');
      this.dataForm.patchValue({
        country: '',
        customerId: null,
        isoName: null,
        networkLogo: null,
        billerName: null,
        selected: false,
        amount: null


      });
      this.dataTopUp = [];
      }
  // dataPhoneNumberChanged() {
  //   const input = this.dataForm.get('customerId').value;
  //   if (input.length === 10) {
  //     if (input) {
  //       this.authService.getBiller(this.dataForm.get('customerId').value,
  //       this.dataForm.get('isoName').value).subscribe(data => {
  //         this.dataForm.patchValue({
  //           networkLogo: data.logoUrls[0],
  //           billerName: data.name,
  //         });
  //       });
  //     }
  //   }
  // }

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

  trimData(value) {
    if (value.includes(':')) {
     return value.replace(/\:.*/, '');
    } else {
      return value;
    }
  }


  onBuyData() {
    this.showAirtimeSummary = false;
    this.showDataSummary = false;
    if (this.authService.loggedIn()) {
          const array = [];
          array.push(this.dataForm.value);
          this.userService.buyAirtime(array).subscribe(
            next => {
            }, error => {
              this.notification.error(error);
            }, () => {
            });
    } else {
    const array = [];
    array.push(this.dataForm.value);
    this.userService.buyAirtime(array).subscribe(
      next => {
      }, error => {
        this.notification.error(error);
      }, () => {
      });

  }

  }

}
