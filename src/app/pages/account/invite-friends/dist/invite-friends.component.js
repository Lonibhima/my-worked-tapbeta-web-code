"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InviteFriendsComponent = void 0;
var core_1 = require("@angular/core");
var InviteFriendsComponent = /** @class */ (function () {
    function InviteFriendsComponent(formBuilder) {
        this.formBuilder = formBuilder;
        this.bonus = '5000';
        this.referralCode = 'Xyz.ggdjjbd';
    }
    InviteFriendsComponent.prototype.ngOnInit = function () {
    };
    InviteFriendsComponent = __decorate([
        core_1.Component({
            selector: 'app-invite-friends',
            templateUrl: './invite-friends.component.html',
            styleUrls: ['./invite-friends.component.scss']
        })
    ], InviteFriendsComponent);
    return InviteFriendsComponent;
}());
exports.InviteFriendsComponent = InviteFriendsComponent;
