"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PagesComponent = void 0;
var core_1 = require("@angular/core");
var chat_component_1 = require("./chat/chat.component");
var PagesComponent = /** @class */ (function () {
    function PagesComponent(appSettings, appService, router, chat) {
        this.appSettings = appSettings;
        this.appService = appService;
        this.router = router;
        this.chat = chat;
        this.showBackToTop = false;
        this.langs = ['English'];
        this.selected = 'English';
        this.settings = this.appSettings.settings;
    }
    PagesComponent.prototype.ngOnInit = function () {
    };
    PagesComponent.prototype.stopClickPropagate = function (event) {
        event.stopPropagation();
        event.preventDefault();
    };
    PagesComponent.prototype.scrollToTop = function () {
        var scrollDuration = 200;
        var scrollStep = -window.pageYOffset / (scrollDuration / 20);
        var scrollInterval = setInterval(function () {
            if (window.pageYOffset != 0) {
                window.scrollBy(0, scrollStep);
            }
            else {
                clearInterval(scrollInterval);
            }
        }, 10);
        if (window.innerWidth <= 768) {
            setTimeout(function () { window.scrollTo(0, 0); });
        }
    };
    PagesComponent.prototype.onWindowScroll = function ($event) {
        ($event.target.documentElement.scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false;
    };
    PagesComponent.prototype.ngAfterViewInit = function () {
    };
    PagesComponent.prototype.openChat = function () {
        var dialogRef = this.chat.open(chat_component_1.ChatComponent, {
            height: '100%',
            animation: { to: 'left' },
            position: { rowStart: '0' },
            panelClass: 'support'
        });
    };
    __decorate([
        core_1.HostListener('window:scroll', ['$event'])
    ], PagesComponent.prototype, "onWindowScroll");
    PagesComponent = __decorate([
        core_1.Component({
            selector: 'app-pages',
            templateUrl: './pages.component.html',
            styleUrls: ['./pages.component.scss']
        })
    ], PagesComponent);
    return PagesComponent;
}());
exports.PagesComponent = PagesComponent;
