import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, matchingPasswords, passwordValidator } from '../../theme/utils/app-validators';
import { NotificationService } from 'src/app/_services/notification.service';
import { AuthService } from 'src/app/_services/auth.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user;
  hide = true;
  hide2 = true;
  invite = false;
  codes = ['+234'];
  selected = '+234';
  filteredCountries: Observable<any>;
  countries = this.authService.countries;



  constructor(public formBuilder: FormBuilder,
              public router: Router,
              public notification: NotificationService,
              private authService: AuthService) { }

  ngOnInit() {
    if (!this.countries) {
      this.authService.currentCountries.subscribe(res => {
        this.setCountries(res);
      });
    } else {

      this.registerForm = this.formBuilder.group({
        country: ['', Validators.required],
        firstName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        lastName: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
        emailAddress: ['', Validators.compose([Validators.required, emailValidator])],
        phoneNumber: ['', Validators.compose([Validators.required])],
        inviteCode: [''],
        password: ['', Validators.compose([Validators.minLength(4), Validators.required])],
        flag: [''],
        isoName: [''],
        currencySymbol: [''],
        callingCodes: [''],
        selected: [false],
        confirmPassword: ['', Validators.required],
      }, {validator: matchingPasswords('password', 'confirmPassword')});

      this.filteredCountries = this.registerForm?.get('country').valueChanges
    .pipe(
        startWith(''),
        map(value => this._filterCountry(value))
    );
}
  }


  private _filterCountry(value: string) {
    const filterValue = value.toLowerCase();
    return this.countries.filter(option =>
        option.name.toLowerCase().includes(filterValue));
  }

  onStartCountryFilter() {
    this.registerForm.patchValue({
      country: ''
    });
  }


  onCountrySelected() {
    const value = this.registerForm.get('country').value;
    const selectedCountry = this.countries.find(x => x.name === value);
    this.registerForm.patchValue({
      isoName: selectedCountry.isoName,
      flag: selectedCountry.flag,
      currencySymbol: selectedCountry.currencySymbol,
      callingCodes: selectedCountry.callingCodes,
      country: selectedCountry.name,
      selected: true
    });
  }

  public onRegisterFormSubmit() {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
      }, error => {
        this.notification.error(error);
      }, () => {
        this.notification.success('Registration successful');
        this.authService.login(this.user).subscribe(
          next => {
          }, error => {
            this.notification.error(error);
          }, () => {
            this.notification.success('Logged in successfully');
            this.router.navigate(['/recharge']);
          });
      });
  }

  setCountries(countries) {
    this.countries = countries;
    this.ngOnInit();
  }

}
