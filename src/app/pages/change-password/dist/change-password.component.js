"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChangePasswordComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_validators_1 = require("../../theme/utils/app-validators");
var ChangePasswordComponent = /** @class */ (function () {
    function ChangePasswordComponent(formBuilder, router, notification, authService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.notification = notification;
        this.authService = authService;
        this.hide = true;
        this.hide2 = true;
        this.hide1 = true;
    }
    ChangePasswordComponent.prototype.ngOnInit = function () {
        this.changePasswordForm = this.formBuilder.group({
            password: ['', forms_1.Validators.required],
            confirmPassword: ['', forms_1.Validators.required]
        }, { validator: app_validators_1.matchingPasswords('password', 'confirmPassword') });
    };
    ChangePasswordComponent.prototype.onSubmit = function () {
        // this.authService.login(this.loginForm.value).subscribe(
        //   next => {
        //   }, error => {
        //     this.notification.error(error);
        //   }, () => {
        //     this.notification.success('Logged in successfully');
        //     this.router.navigate(['/']);
        //   });
    };
    ChangePasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-change-password',
            templateUrl: './change-password.component.html',
            styleUrls: ['./change-password.component.scss']
        })
    ], ChangePasswordComponent);
    return ChangePasswordComponent;
}());
exports.ChangePasswordComponent = ChangePasswordComponent;
