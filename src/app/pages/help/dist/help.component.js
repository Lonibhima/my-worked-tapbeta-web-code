"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HelpComponent = void 0;
var core_1 = require("@angular/core");
var HelpComponent = /** @class */ (function () {
    function HelpComponent(formBuilder, router, notification, authService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.notification = notification;
        this.authService = authService;
        this.faqs = [
            {
                title: 'How do I recharge?',
                answer: 'These are the steps to recharge'
            },
            {
                title: 'How fast is it?',
                answer: 'Our reply'
            },
            {
                title: 'What are the payment methods?',
                answer: 'MasterCard, VisaCard, VerveCard'
            }
        ];
    }
    HelpComponent.prototype.ngOnInit = function () {
        this.filteredFaq = this.faqs;
    };
    HelpComponent.prototype.filter = function (value) {
        this.filteredFaq = this.doFilter(value);
    };
    HelpComponent.prototype.doFilter = function (filterValue) {
        var filter = filterValue.toLowerCase();
        return this.faqs.filter(function (option) {
            return option.title.toLowerCase().includes(filter);
        });
    };
    HelpComponent = __decorate([
        core_1.Component({
            selector: 'app-help',
            templateUrl: './help.component.html',
            styleUrls: ['./help.component.scss']
        })
    ], HelpComponent);
    return HelpComponent;
}());
exports.HelpComponent = HelpComponent;
