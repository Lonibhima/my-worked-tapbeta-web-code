"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CardsComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CardsComponent = /** @class */ (function () {
    function CardsComponent(fb) {
        this.fb = fb;
        this.showForm = false;
        this.myCards = [
            {
                cardNumber: '**** **** **** 2345',
                expiryDate: '10/20',
                cvv: '234',
                isDefault: true,
                type: 'Verve'
            },
            {
                cardNumber: '**** **** **** 0023',
                expiryDate: '01/21',
                cvv: '122',
                isDefault: false,
                type: 'MasterCard'
            },
        ];
    }
    CardsComponent.prototype.ngOnInit = function () {
        this.cardForm = this.fb.group({
            cardNumber: ['', forms_1.Validators.required],
            expiryDate: ['', forms_1.Validators.required],
            cvv: ['', forms_1.Validators.required]
        });
    };
    CardsComponent.prototype.checkDate = function () {
        var input = this.cardForm.get('expiryDate').value;
        input = input.replace('/', '');
        var length = input.length;
        if (length === 2) {
            this.cardForm.patchValue({
                expiryDate: input + '/'
            });
        }
    };
    CardsComponent.prototype.onSubmit = function () {
        console.log(this.cardForm.value);
    };
    CardsComponent = __decorate([
        core_1.Component({
            selector: 'app-cards',
            templateUrl: './cards.component.html',
            styleUrls: ['./cards.component.scss']
        })
    ], CardsComponent);
    return CardsComponent;
}());
exports.CardsComponent = CardsComponent;
