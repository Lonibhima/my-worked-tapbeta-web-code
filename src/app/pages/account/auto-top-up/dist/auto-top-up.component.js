"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AutoTopUpComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var AutoTopUpComponent = /** @class */ (function () {
    function AutoTopUpComponent(fb) {
        this.fb = fb;
        this.amount = '3000';
        this.days = [];
        this.weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.frequencies = ['Monthly', 'Weekly', 'Bi-weekly'];
        this.types = ['Data', 'Airtime'];
        this.showNew = false;
        this.selected = '+234';
        this.userTopUps = [
            {
                frequency: 'Monthly',
                time: '20',
                amount: '5000',
                network: 'Mtn',
                status: 'active',
                type: 'Airtime',
                customerId: '0709890088'
            },
            {
                frequency: 'Weekly',
                time: 'Friday',
                amount: '10000',
                network: 'Glo',
                status: 'active',
                type: 'Data',
                customerId: '0903462088'
            },
            {
                frequency: 'Bi-weekly',
                time: 'Monday',
                amount: '2000',
                network: 'Airtel',
                status: 'inactive',
                type: 'Data',
                customerId: '09076522334'
            }
        ];
        this.countries = ['Nigeria'];
        this.dataTopUp = ['1 week 6GB ₦500',
            '1 month 12GB ₦10000'];
    }
    AutoTopUpComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.airtimeForm = this.fb.group({
            frequency: ['Monthly', forms_1.Validators.required],
            time: ['', forms_1.Validators.required],
            type: ['airtime', forms_1.Validators.required],
            customerId: ['', forms_1.Validators.required],
            network: ['', forms_1.Validators.required],
            status: ['', forms_1.Validators.required],
            amount: ['', forms_1.Validators.required],
            country: ['Nigeria']
        });
        this.dataForm = this.fb.group({
            frequency: ['Monthly', forms_1.Validators.required],
            time: ['', forms_1.Validators.required],
            type: ['data', forms_1.Validators.required],
            customerId: ['', forms_1.Validators.required],
            network: ['', forms_1.Validators.required],
            status: ['', forms_1.Validators.required],
            dataType: ['', forms_1.Validators.required],
            country: ['Nigeria']
        });
        for (var i = 1; i <= 28; i++) {
            this.days.push(i.toString());
        }
        this.myTopUps = this.fb.array([]),
            this.userTopUps.forEach(function (topup) {
                _this.myTopUps.push(_this.fb.group({
                    frequency: [topup.frequency],
                    time: [topup.time],
                    type: [topup.type],
                    customerId: [topup.customerId],
                    network: [topup.network],
                    status: [topup.status],
                    amount: [topup.amount]
                }));
            });
        this.activeTopUps = this.fb.array([]),
            this.userTopUps.forEach(function (topup) {
                if (topup.status === 'active') {
                    _this.activeTopUps.push(_this.fb.group({
                        frequency: [topup.frequency],
                        time: [topup.time],
                        type: [topup.type],
                        customerId: [topup.customerId],
                        network: [topup.network],
                        status: [topup.status],
                        amount: [topup.amount]
                    }));
                }
            });
        this.inactiveTopUps = this.fb.array([]),
            this.userTopUps.forEach(function (topup) {
                if (topup.status === 'inactive') {
                    _this.inactiveTopUps.push(_this.fb.group({
                        frequency: [topup.frequency],
                        time: [topup.time],
                        type: [topup.type],
                        customerId: [topup.customerId],
                        network: [topup.network],
                        status: [topup.status],
                        amount: [topup.amount]
                    }));
                }
            });
        this.filteredData = this.dataForm.get('dataType').valueChanges
            .pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this._filterData(value); }));
    };
    AutoTopUpComponent.prototype._filterData = function (value) {
        var filterValue = value.toLowerCase();
        return this.dataTopUp.filter(function (option) {
            return option.toLowerCase().includes(filterValue);
        });
    };
    AutoTopUpComponent.prototype.subscribe = function (topup) {
        console.log(topup);
    };
    AutoTopUpComponent.prototype.unsubscribe = function (topup) {
        console.log(topup);
    };
    AutoTopUpComponent.prototype.onSubmit = function () {
    };
    AutoTopUpComponent = __decorate([
        core_1.Component({
            selector: 'app-auto-top-up',
            templateUrl: './auto-top-up.component.html',
            styleUrls: ['./auto-top-up.component.scss']
        })
    ], AutoTopUpComponent);
    return AutoTopUpComponent;
}());
exports.AutoTopUpComponent = AutoTopUpComponent;
