"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HistoryComponent = void 0;
var core_1 = require("@angular/core");
var HistoryComponent = /** @class */ (function () {
    function HistoryComponent(formBuilder, router, notification, authService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.notification = notification;
        this.authService = authService;
        this.myTransactions = [
            {
                month: 'June',
                total: '6000',
                transactions: [{
                        transactionType: 'Airtime',
                        customerId: '08168879999',
                        amount: '500',
                        time: '12:35',
                        date: '12/06/2020'
                    },
                    {
                        transactionType: 'Data',
                        customerId: '08168879999',
                        amount: '1500',
                        time: '02:35',
                        date: '20/06/2020'
                    },
                ]
            },
            {
                month: 'August',
                total: '16000',
                transactions: [{
                        transactionType: 'Airtime',
                        customerId: '08168879999',
                        amount: '9000',
                        time: '10:35',
                        date: '15/08/2020'
                    },
                    {
                        transactionType: 'Data',
                        customerId: '08168879999',
                        amount: '200',
                        time: '05:50',
                        date: '20/08/2020'
                    },
                ]
            }
        ];
    }
    HistoryComponent.prototype.ngOnInit = function () {
    };
    HistoryComponent = __decorate([
        core_1.Component({
            selector: 'app-history',
            templateUrl: './history.component.html',
            styleUrls: ['./history.component.scss']
        })
    ], HistoryComponent);
    return HistoryComponent;
}());
exports.HistoryComponent = HistoryComponent;
