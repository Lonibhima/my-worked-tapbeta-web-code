import { Component, OnInit, SecurityContext, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { NotificationService } from 'src/app/_services/notification.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/_models/user';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  registerForm: FormGroup;
user = this.authService.currentUser;
  imageToUpload: File = null;
  userImage: SafeUrl;
  imgURL;
  uploadedImage;
  filteredCountries: Observable<any>;
  countries = this.authService.countries;

  constructor(public formBuilder: FormBuilder,
              private authService: AuthService,
              private userService: UserService,
              private notification: NotificationService,
              private sanitizer: DomSanitizer,
              private cdRef: ChangeDetectorRef ) { }

  ngOnInit() {
    if (!this.countries) {
      this.authService.currentCountries.subscribe(res => {
        this.setCountries(res);
      });
    } else {


this.registerForm = this.formBuilder.group({
      country: [this.user.country, Validators.required],
      firstName: [this.user.firstName, Validators.compose([Validators.required, Validators.minLength(3)])],
      lastName: [this.user.lastName, Validators.compose([Validators.required, Validators.minLength(3)])],
      emailAddress: [this.user.emailAddress, Validators.compose([Validators.required, emailValidator])],
      phoneNumber: [this.user.phoneNumber, Validators.compose([Validators.required])],
      id: [this.user.id],
      flag: [''],
      isoName: [''],
      currencySymbol: [''],
      callingCodes: [''],
      picture: [this.userImage],
      selected: [true]
    });

this.authService.currentPhotoUrl.subscribe(photoUrl => this.userImage = photoUrl);

this.filteredCountries = this.registerForm?.get('country').valueChanges
.pipe(
    startWith(''),
    map(value => this._filterCountry(value))
);

this.onCountryPreSelected();

  }
}


  private _filterCountry(value: string) {
  const filterValue = value?.toLowerCase();
  return this.countries.filter(option =>
      option.name?.toLowerCase().includes(filterValue));
}


  onCountryPreSelected() {
  const value = this.registerForm.get('country').value;
  const selectedCountry = this.countries.find(x => x.name === value);
  this.registerForm.patchValue({
    isoName: selectedCountry.isoName,
    flag: selectedCountry.flag,
    currencySymbol: selectedCountry.currencySymbol,
    callingCodes: selectedCountry.callingCodes,
    country: selectedCountry.name,
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
    phoneNumber: null
  });
}


startCountryFilter() {
  this.registerForm.patchValue({
    country: '',
    selected: false
  });
  }

  public changePicture(event) {
    this.imageToUpload = ( event.target.files[0] as File);
    // this.userImage = this.imageToUpload;
    if (this.imageToUpload) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.userImage = event.target.result;
        this.user.picture = this.userImage.toString();
        this.authService.convertImage(this.user.picture);
        // this.userService.updateCurrentUser(this.user);
        this.cdRef.detectChanges();
      };
      this.cdRef.detectChanges();
      this.uploadLogo();
    }

  }

  setCountries(countries) {
    this.countries = countries;
    this.ngOnInit();
  }

  uploadLogo() {
    this.userService
      .postImage(this.imageToUpload, this.user.id)
      .subscribe(() => {
        this.notification.success('Image uploaded successfully');
      }, error => {
        this.notification.error(error);
      });
  }

  public onRegisterFormSubmit() {
    this.userService.updateUser(this.registerForm.value).subscribe(() => {
    }, error => {
      this.notification.error(error);
    }, () => {
      this.user.firstName = this.registerForm.get('firstName').value;
      this.user.lastName = this.registerForm.get('lastName').value;
      this.user.phoneNumber = this.registerForm.get('phoneNumber').value;
      this.notification.success('Information Updated Successfully');
      // this.userService.updateCurrentUser(this.user);
    });
}

}
