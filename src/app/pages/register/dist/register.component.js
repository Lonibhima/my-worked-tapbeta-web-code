"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_validators_1 = require("../../theme/utils/app-validators");
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(formBuilder, router, notification, authService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.notification = notification;
        this.authService = authService;
        this.hide = true;
        this.hide2 = true;
        this.invite = false;
        this.codes = ['+234'];
        this.selected = '+234';
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.registerForm = this.formBuilder.group({
            firstName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3)])],
            lastName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3)])],
            email: ['', forms_1.Validators.compose([forms_1.Validators.required, app_validators_1.emailValidator])],
            phoneNumber: ['', forms_1.Validators.compose([forms_1.Validators.required])],
            inviteCode: [''],
            password: ['', forms_1.Validators.required],
            confirmPassword: ['', forms_1.Validators.required]
        }, { validator: app_validators_1.matchingPasswords('password', 'confirmPassword') });
    };
    RegisterComponent.prototype.onRegisterFormSubmit = function () {
        var _this = this;
        this.user = Object.assign({}, this.registerForm.value);
        this.user.userName = this.user.email;
        this.authService.register(this.user).subscribe(function () {
        }, function (error) {
            _this.notification.error(error);
        }, function () {
            _this.notification.success('Registration successful');
            _this.authService.login(_this.user).subscribe(function (next) {
            }, function (error) {
                _this.notification.error(error);
            }, function () {
                _this.notification.success('Logged in successfully');
                _this.router.navigate(['/']);
            });
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.scss']
        })
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
