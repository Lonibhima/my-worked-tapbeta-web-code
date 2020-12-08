"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var angular_jwt_1 = require("@auth0/angular-jwt");
var environment_1 = require("src/environments/environment");
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this.baseUrl = environment_1.environment.apiUrl;
        this.jwtHelper = new angular_jwt_1.JwtHelperService();
        this.photoUrl = new rxjs_1.BehaviorSubject('../../assets/user.png');
        this.currentPhotoUrl = this.photoUrl.asObservable();
    }
    AuthService.prototype.changeMemberPhoto = function (photoUrl) {
        this.photoUrl.next(photoUrl);
    };
    AuthService.prototype.login = function (model) {
        var _this = this;
        return this.http.post(this.baseUrl + 'auth/login', model).pipe(operators_1.map(function (response) {
            var user = response;
            if (user) {
                localStorage.setItem('token', user.token);
                localStorage.setItem('user', JSON.stringify(user.user));
                _this.currentUser = user.user;
                // this.changeMemberPhoto(this.currentUser.photoUrl);
            }
        }));
    };
    AuthService.prototype.register = function (user) {
        return this.http.post(this.baseUrl + 'auth/register', user);
    };
    AuthService.prototype.getToken = function () {
        var token = localStorage.getItem('token');
        this.decodedToken = this.jwtHelper.decodeToken(token);
    };
    AuthService.prototype.loggedIn = function () {
        var token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
