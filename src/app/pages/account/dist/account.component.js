"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AccountComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var AccountComponent = /** @class */ (function () {
    function AccountComponent(router) {
        this.router = router;
        this.sidenavOpen = true;
        this.links = [
            { name: 'Account Information', href: 'information', icon: 'info' },
            { name: 'Manage Cards', href: 'cards', icon: 'payment' },
            { name: 'Invite Friends', href: 'invite-friends', icon: 'group_add' },
            { name: 'Promotions', href: 'promotions', icon: 'redeem' },
            { name: 'Auto Top up', href: 'auto-top-up', icon: 'autorenew' },
            { name: 'Update Password', href: 'update-password', icon: 'security' },
        ];
    }
    AccountComponent.prototype.ngOnInit = function () {
        if (window.innerWidth < 960) {
            this.sidenavOpen = false;
        }
        ;
    };
    AccountComponent.prototype.onWindowResize = function () {
        (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    };
    AccountComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                if (window.innerWidth < 960) {
                    _this.sidenav.close();
                }
            }
        });
    };
    __decorate([
        core_1.ViewChild('sidenav', { static: true })
    ], AccountComponent.prototype, "sidenav");
    __decorate([
        core_1.HostListener('window:resize')
    ], AccountComponent.prototype, "onWindowResize");
    AccountComponent = __decorate([
        core_1.Component({
            selector: 'app-account',
            templateUrl: './account.component.html',
            styleUrls: ['./account.component.scss']
        })
    ], AccountComponent);
    return AccountComponent;
}());
exports.AccountComponent = AccountComponent;
