"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MainCarouselComponent = void 0;
var core_1 = require("@angular/core");
var ngx_swiper_wrapper_1 = require("ngx-swiper-wrapper");
var MainCarouselComponent = /** @class */ (function () {
    function MainCarouselComponent() {
        this.slides = [];
        this.config = {};
        this.endTime = '2020-09-01';
        this.today = new Date().toISOString().substring(0, 10);
        this.pagination = {
            el: '.swiper-pagination',
            clickable: true
        };
    }
    MainCarouselComponent.prototype.ngOnInit = function () {
    };
    MainCarouselComponent.prototype.ngAfterViewInit = function () {
        if (!!this.swiperDirectiveRef) {
            this.swiperDirectiveRef.update();
        }
        this.config = {
            slidesPerView: 1,
            spaceBetween: 0,
            keyboard: true,
            navigation: true,
            pagination: this.pagination,
            grabCursor: true,
            preloadImages: false,
            lazy: true,
            autoplay: {
                delay: 6000,
                disableOnInteraction: false
            },
            speed: 500,
            effect: 'slide'
        };
    };
    __decorate([
        core_1.Input('slides')
    ], MainCarouselComponent.prototype, "slides");
    __decorate([
        core_1.ViewChild(ngx_swiper_wrapper_1.SwiperDirective)
    ], MainCarouselComponent.prototype, "swiperDirectiveRef");
    MainCarouselComponent = __decorate([
        core_1.Component({
            selector: 'app-main-carousel',
            templateUrl: './main-carousel.component.html',
            styleUrls: ['./main-carousel.component.scss']
        })
    ], MainCarouselComponent);
    return MainCarouselComponent;
}());
exports.MainCarouselComponent = MainCarouselComponent;
