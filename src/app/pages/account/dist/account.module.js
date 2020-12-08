"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AccountModule = exports.routes = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var shared_module_1 = require("../../shared/shared.module");
var account_component_1 = require("./account.component");
var information_component_1 = require("./information/information.component");
var cards_component_1 = require("./cards/cards.component");
var invite_friends_component_1 = require("./invite-friends/invite-friends.component");
var promotions_component_1 = require("./promotions/promotions.component");
var auto_top_up_component_1 = require("./auto-top-up/auto-top-up.component");
var update_password_component_1 = require("./update-password/update-password.component");
exports.routes = [
    {
        path: '',
        component: account_component_1.AccountComponent, children: [
            { path: '', redirectTo: 'information', pathMatch: 'full' },
            { path: 'information', component: information_component_1.InformationComponent, data: { breadcrumb: 'Account Information' } },
            { path: 'cards', component: cards_component_1.CardsComponent, data: { breadcrumb: 'Cards' } },
            { path: 'invite-friends', component: invite_friends_component_1.InviteFriendsComponent, data: { breadcrumb: 'Invite Friends' } },
            { path: 'promotions', component: promotions_component_1.PromotionsComponent, data: { breadcrumb: 'Promotions' } },
            { path: 'auto-top-up', component: auto_top_up_component_1.AutoTopUpComponent, data: { breadcrumb: 'Auto Top up' } },
            { path: 'update-password', component: update_password_component_1.UpdatePasswordComponent, data: { breadcrumb: 'Update Password' } },
        ]
    }
];
var AccountModule = /** @class */ (function () {
    function AccountModule() {
    }
    AccountModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                router_1.RouterModule.forChild(exports.routes),
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                account_component_1.AccountComponent,
                information_component_1.InformationComponent,
                cards_component_1.CardsComponent,
                invite_friends_component_1.InviteFriendsComponent,
                promotions_component_1.PromotionsComponent,
                auto_top_up_component_1.AutoTopUpComponent,
                update_password_component_1.UpdatePasswordComponent
            ]
        })
    ], AccountModule);
    return AccountModule;
}());
exports.AccountModule = AccountModule;
