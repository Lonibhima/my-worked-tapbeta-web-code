"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResetPasswordComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_validators_1 = require("../../theme/utils/app-validators");
var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(formBuilder, router, notification, authService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.notification = notification;
        this.authService = authService;
        this.hide = true;
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        this.resetForm = this.formBuilder.group({
            email: ['', forms_1.Validators.compose([forms_1.Validators.required, app_validators_1.emailValidator])]
        });
    };
    ResetPasswordComponent.prototype.onSubmit = function () {
        // this.authService.login(this.loginForm.value).subscribe(
        //   next => {
        //   }, error => {
        //     this.notification.error(error);
        //   }, () => {
        //     this.notification.success('Logged in successfully');
        //     this.router.navigate(['/']);
        //   });
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-reset-password',
            templateUrl: './reset-password.component.html',
            styleUrls: ['./reset-password.component.scss']
        })
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;
