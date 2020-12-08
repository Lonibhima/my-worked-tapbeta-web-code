"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("src/environments/environment");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.baseUrl = environment_1.environment.apiUrl;
    }
    // WITHOUT PAGINATION
    UserService.prototype.getUsers = function () {
        return this.http.get(this.baseUrl + 'users');
        // return this.http.get<User[]>(this.baseUrl + 'users', httpOptions);
    };
    UserService.prototype.getUser = function (id) {
        return this.http.get(this.baseUrl + 'users/' + id);
        // return this.http.get<User>(this.baseUrl + 'users/' + id, httpOptions);
    };
    UserService.prototype.updateUser = function (id, user) {
        return this.http.put(this.baseUrl + 'users/' + id, user);
    };
    // sendMessage(id: number, message: Message) {
    //   return this.http.post(this.baseUrl + 'users/' + id + '/messages', message);
    // }
    UserService.prototype.deleteMessage = function (id, userId) {
        return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + id, {});
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
