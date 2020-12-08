import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { UserService } from 'src/app/_services/user.service';
import { RechargeService } from 'src/app/_services/recharge.service';
import { MatDialog } from '@angular/material/dialog';
import { Country } from 'src/app/_models/country';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss']
})
export class RechargeComponent implements OnInit {
dataGroup;
airtimeGroup;
dataTopUp = [];
filteredData = [];
dataFilteredCountries: Country[];
airtimeFilteredCountries: Country[];
weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
frequencies = ['Monthly', 'Weekly', 'BiMonthly'];
days = [];
user = this.authService.currentUser;
totalAmount = 0;
countries = this.authService.countries;

showDataSummary = false;
showAirtimeSummary = false;
processingFee = 0;
dataOperators = [];
airtimeOperators = [];

  constructor(public fb: FormBuilder,
              public router: Router,
              public notification: NotificationService,
              private authService: AuthService,
              private userService: UserService,
              private rechargeService: RechargeService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.airtimeGroup = this.fb.array([]),
    this.dataGroup = this.fb.array([]),
    this.addAirtimeForm();
    this.addDataForm();
    for (let i = 1; i <= 28; i++) {
      this.days.push(i.toString());
    }
    this.addData();

  }

  addDataForm() {
    this.dataGroup.push(this.fb.group({
      country: [''],
      frequency: ['Monthly'],
      amount: ['', Validators.required],
      customerId: ['', Validators.required],
      billerName: ['', Validators.required],
      isScheduled: [false],
      isDefault: [false],
      isAirtime: [false],
      isBundle: [false],
      firstDate: [''],
      secondDate: [''],
      dates: [''],
      email: [this.user.emailAddress],
      flag: [''],
      isoName: [''],
      currencySymbol: [''],
      callingCodes: [''],
      networkLogo: [''],
      maxAmount: [0],
      selected: [false]


    }));

    if (this.user.defaultNumber) {
      this.airtimeGroup.controls[0].patchValue({
        customerId: this.user.defaultNumber,
      });
      this.dataGroup.controls[0].patchValue({
        customerId: this.user.defaultNumber,
      });
    } else {
      this.airtimeGroup.controls[0].patchValue({
        customerId: this.user.phoneNumber,
      });
      this.dataGroup.controls[0].patchValue({
        customerId: this.user.phoneNumber,
      });
    }

  }

  addData() {
    if (this.rechargeService.dataValues) {
    this.dataGroup.controls[0].patchValue(this.rechargeService.dataValues);
    }
    if (this.rechargeService.airtimeValues) {
    this.airtimeGroup.controls[0].patchValue(this.rechargeService.airtimeValues);
    }
    this.onAirtimeCountrySelected(this.user.country, 0);
    this.onDataCountrySelected(this.user.country, 0);
    this.updateFirstAirtimeForm();
    // this.updateFirstDataForm();
  }

  removeDataForm(i) {
    this.dataGroup.removeAt(i);
  }

  onDataCountrySelected(country, i) {
    const selectedCountry = this.countries.find(x => x.name === country);

    this.dataGroup?.controls[i]?.patchValue({
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
  onAirtimeCountrySelected(country, i) {
    const selectedCountry = this.countries.find(x => x.name === country);
    this.airtimeGroup?.controls[i]?.patchValue({
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


  onAirtimeBillerSelected(biller, i) {
    const selectedBiller = this.airtimeOperators.find(x => x.name === biller);

    this.airtimeGroup?.controls[i]?.patchValue({
      billerName: selectedBiller.name,
      networkLogo: selectedBiller.logoUrls[0],
      maxAmount: selectedBiller.maxAmount
    });
  }

  onDataBillerSelected(biller, i) {
    const selectedBiller = this.dataOperators.find(x => x.name === biller);

    this.dataGroup?.controls[i]?.patchValue({
      billerName: selectedBiller.name,
      networkLogo: selectedBiller.logoUrls[0],
      maxAmount: selectedBiller.maxAmount,
      amount: null,
      isBundle: false,
    });

    if (selectedBiller.name.includes('Bundle')) {
      this.dataGroup?.controls[i]?.patchValue({
        isBundle: true
      });
    }

    this.dataTopUp = [];
    const currency = this.dataGroup.controls[i].controls.currencySymbol.value;
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

  onDataSelected(data, i) {
    if (data.includes(':')) {
      const value = data.replace(/\D/, '');
      this.dataGroup?.controls[i]?.patchValue({
        amount: value
      });
    } else {
      const value = data.replace(/[^\d.-]/g, '');
      this.dataGroup?.controls[i]?.patchValue({
        amount: value
      });
    }

  }

  updateFirstAirtimeForm() {
    if (this.airtimeGroup?.controls[0].controls.customerId.value) {
      this.authService.getBiller(this.airtimeGroup?.controls[0].controls.customerId.value,
        this.airtimeGroup?.controls[0].controls.isoName.value).subscribe(data => {
        this.airtimeGroup?.controls[0]?.patchValue({
          networkLogo: data.logoUrls[0],
          billerName: data.name,
          maxAmount: data.maxAmount
        });
      });
    }
  }



  addAirtimeForm() {
    this.airtimeGroup.push(this.fb.group({
      country: [''],
      frequency: ['Monthly'],
      customerId: ['', Validators.required],
      billerName: ['', Validators.required],
      amount: ['', Validators.required],
      isScheduled: [false],
      isDefault: [false],
      isAirtime: [true],
      firstDate: [''],
      secondDate: [''],
      dates: [''],
      email: [this.user.emailAddress],
      flag: [''],
      isoName: [''],
      currencySymbol: [''],
      callingCodes: [''],
      networkLogo: [''],
      maxAmount: [0],
      selected: [false]
    }));
  }

  private _filterData(value: string) {
    const filterValue = value.toLowerCase();
    return this.dataTopUp.filter(option =>
        option.toLowerCase().includes(filterValue));
  }

  private _filterCountry(value: string) {
    const filterValue = value.toLowerCase();
    return this.countries.filter(option =>
        option.name.toLowerCase().includes(filterValue));
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

  removeAirtimeForm(i) {
    this.airtimeGroup.removeAt(i);
  }

  buyData() {

    this.showAirtimeSummary = false;
    this.showDataSummary = false;
    if (this.dataGroup.length === 1) {
      if (this.dataGroup.controls[0].controls.frequency.value === 'BiMonthly') {
        this.dataGroup.controls[0].patchValue({
          frequency: 3,
          dates: this.dataGroup.controls[0].controls.firstDate.value
          + ',' + this.dataGroup.controls[0].controls.secondDate.value
        });
      } else if (this.dataGroup.controls[0].controls.frequency.value === 'Monthly') {
        this.dataGroup.controls[0].patchValue({
          frequency: 4,
        });
      } else if (this.dataGroup.controls[0].controls.frequency.value === 'Weekly') {
        this.dataGroup.controls[0].patchValue({
          frequency: 2,
        });
      }

      this.userService.buyAirtime(this.dataGroup.value).subscribe(
            next => {
            }, error => {
              this.notification.error(error);
            });

    } else {
      for (let i = 0; i <= this.dataGroup.length - 1; i++) {
        if (this.dataGroup.controls[i].controls.frequency.value === 'BiMonthly') {
          this.dataGroup.controls[i].patchValue({
            frequency: 3,
            dates: this.dataGroup.controls[i].controls.firstDate.value
            + ',' + this.dataGroup.controls[i].controls.secondDate.value
          });
        } else if (this.dataGroup.controls[i].controls.frequency.value === 'Monthly') {
          this.dataGroup.controls[i].patchValue({
            frequency: 4,
          });
        } else if (this.dataGroup.controls[i].controls.frequency.value === 'Weekly') {
          this.dataGroup.controls[i].patchValue({
            frequency: 2,
          });
        }
        // this.totalAmount += +(this.airtimeGroup.controls[i].controls.amount.value);
      }

      this.userService.buyAirtime(this.dataGroup.value).subscribe(
            next => {
              this.showAirtimeSummary = false;
              this.showDataSummary = false;
            }, error => {
              this.notification.error(error);
            });
    }

  }

  airtimePhoneNumberChanged(i) {
    const input = this.airtimeGroup.controls[i].controls.customerId.value;
    if (input.length === 10) {
      if (this.airtimeGroup?.controls[i].controls.customerId.value) {
        this.authService.getBiller(this.airtimeGroup?.controls[i].controls.customerId.value,
          this.airtimeGroup?.controls[i].controls.isoName.value).subscribe(data => {
          this.airtimeGroup?.controls[i]?.patchValue({
            networkLogo: data.logoUrls[0],
            billerName: data.name,
            maxAmount: data.maxAmount
          });
        });
      }
    }

  }


  airtimeBillerChanged(i) {
    const input = this.airtimeGroup.controls[i].controls.billerName.value;
    this.airtimeOperators = this._filterAirtimeOperator(input);
  }


  dataBillerChanged(i) {
    const input = this.dataGroup.controls[i].controls.billerName.value;
    this.dataOperators = this._filterDataOperator(input);
  }


  dataPhoneNumberChanged(i) {
    const input = this.dataGroup.controls[i].controls.customerId.value;
    if (input.length === 10) {
      if (this.dataGroup?.controls[i].controls.customerId.value) {
        this.authService.getBiller(this.dataGroup?.controls[i].controls.customerId.value,
          this.dataGroup?.controls[i].controls.isoName.value).subscribe(data => {
          this.dataGroup?.controls[i]?.patchValue({
            networkLogo: data.logoUrls[0],
            billerName: data.name,
          maxAmount: data.maxAmount

          });
        });
      }
    }

  }

  dataChanged(index) {
    const input = this.dataGroup.controls[index].controls.amount.value;
    this.filteredData = this._filterData(input);
}

airtimeCountryChange(index) {
  const input = this.airtimeGroup.controls[index].controls.country.value;
  this.airtimeFilteredCountries = this._filterCountry(input);
}

dataCountryChange(index) {
  const input = this.dataGroup.controls[index].controls.country.value;
  this.dataFilteredCountries = this._filterCountry(input);
}

  buyAirtime() {
    this.showAirtimeSummary = false;
    this.showDataSummary = false;
    if (this.airtimeGroup.length === 1) {
      if (this.airtimeGroup.controls[0].controls.frequency.value === 'BiMonthly') {
        this.airtimeGroup.controls[0].patchValue({
          frequency: 3,
          dates: this.airtimeGroup.controls[0].controls.firstDate.value
          + ',' + this.airtimeGroup.controls[0].controls.secondDate.value
        });
      } else if (this.airtimeGroup.controls[0].controls.frequency.value === 'Monthly') {
        this.airtimeGroup.controls[0].patchValue({
          frequency: 4,
        });
      } else if (this.airtimeGroup.controls[0].controls.frequency.value === 'Weekly') {
        this.airtimeGroup.controls[0].patchValue({
          frequency: 2,
        });
      }

      this.userService.buyAirtime(this.airtimeGroup.value).subscribe(
            next => {
            }, error => {
              this.notification.error(error);
            });

    } else {
      for (let i = 0; i <= this.airtimeGroup.length - 1; i++) {
        if (this.airtimeGroup.controls[i].controls.frequency.value === 'BiMonthly') {
          this.airtimeGroup.controls[i].patchValue({
            frequency: 3,
            dates: this.airtimeGroup.controls[i].controls.firstDate.value
            + ',' + this.airtimeGroup.controls[i].controls.secondDate.value
          });
        } else if (this.airtimeGroup.controls[i].controls.frequency.value === 'Monthly') {
          this.airtimeGroup.controls[i].patchValue({
            frequency: 4,
          });
        } else if (this.airtimeGroup.controls[i].controls.frequency.value === 'Weekly') {
          this.airtimeGroup.controls[i].patchValue({
            frequency: 2,
          });
        }
        // this.totalAmount += +(this.airtimeGroup.controls[i].controls.amount.value);
      }

      this.userService.buyAirtime(this.airtimeGroup.value).subscribe(
            next => {
              this.showAirtimeSummary = false;
              this.showDataSummary = false;
            }, error => {
              this.notification.error(error);
            });
    }

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

  startDataFilter() {
    this.filteredData = this._filterData('');
    }

    startAirtimeCountryFilter(i) {
      this.airtimeFilteredCountries = this._filterCountry('');
      this.airtimeGroup?.controls[i]?.patchValue({
        networkLogo: null,
        billerName: null,
        customerId: null,
        isoName: null,
        country: null,
        selected: false,
        amount: null
      });
      }

      startDataCountryFilter(i) {
        this.dataFilteredCountries = this._filterCountry('');
        this.dataGroup?.controls[i]?.patchValue({
          networkLogo: null,
          billerName: null,
          customerId: null,
          isoName: null,
          country: null,
        selected: false,
        });
        this.dataTopUp = [];
        }



        startAirtimeBillerFilter(i) {
          this.airtimeOperators = this._filterAirtimeOperator('');
          this.airtimeGroup?.controls[i]?.patchValue({
            networkLogo: null,
            billerName: null,
          });
          }


          trimData(value) {
            if (value.includes(':')) {
             return value.replace(/\:.*/, '');
            } else {
              return value;
            }
          }


          startDataBillerFilter(i) {
            this.dataOperators = this._filterDataOperator('');
            this.dataGroup?.controls[i]?.patchValue({
              networkLogo: null,
              billerName: null,
            });
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
  }

