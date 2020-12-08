"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = exports.routes = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var pages_component_1 = require("./pages/pages.component");
var not_found_component_1 = require("./pages/not-found/not-found.component");
exports.routes = [
    {
        path: '',
        component: pages_component_1.PagesComponent,
        children: [
            { path: '', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/home/home.module'); }).then(function (m) { return m.HomeModule; }); } },
            { path: 'account', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/account/account.module'); }).then(function (m) { return m.AccountModule; }); }, data: { breadcrumb: 'My Account' } },
            { path: 'sign-in', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/sign-in/sign-in.module'); }).then(function (m) { return m.SignInModule; }); }, data: { breadcrumb: 'Sign In ' } },
            { path: 'history', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/history/history.module'); }).then(function (m) { return m.HistoryModule; }); }, data: { breadcrumb: 'Transaction History' } },
            { path: 'help', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/help/help.module'); }).then(function (m) { return m.HelpModule; }); }, data: { breadcrumb: 'Help' } },
            { path: 'register', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/register/register.module'); }).then(function (m) { return m.RegisterModule; }); }, data: { breadcrumb: 'Register' } },
            { path: 'reset-password', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/reset-password/reset-password.module'); }).then(function (m) { return m.ResetPasswordModule; }); }, data: { breadcrumb: 'Reset Password ' } },
            { path: 'change-password', loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/change-password/change-password.module'); }).then(function (m) { return m.ChangePasswordModule; }); }, data: { breadcrumb: 'Change Password' } },
        ]
    },
    { path: '**', component: not_found_component_1.NotFoundComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(exports.routes, {
                    preloadingStrategy: router_1.PreloadAllModules
                })
            ],
            exports: [
                router_1.RouterModule
            ]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
