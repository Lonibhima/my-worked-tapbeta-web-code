"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdatePasswordComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_validators_1 = require("src/app/theme/utils/app-validators");
var UpdatePasswordComponent = /** @class */ (function () {
    function UpdatePasswordComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.hide = true;
        this.hide2 = true;
        this.hide1 = true;
    }
    UpdatePasswordComponent.prototype.ngOnInit = function () {
        this.updatePasswordForm = this.formBuilder.group({
            password: ['', forms_1.Validators.required],
            newPassword: ['', forms_1.Validators.required],
            confirmPassword: ['', forms_1.Validators.required]
        }, { validator: app_validators_1.matchingPasswords('newPassword', 'confirmPassword') });
    };
    UpdatePasswordComponent.prototype.onSubmit = function () {
    };
    UpdatePasswordComponent = __decorate([
        core_1.Component({
            selector: 'app-update-password',
            templateUrl: './update-password.component.html',
            styleUrls: ['./update-password.component.scss']
        })
    ], UpdatePasswordComponent);
    return UpdatePasswordComponent;
}());
exports.UpdatePasswordComponent = UpdatePasswordComponent;
