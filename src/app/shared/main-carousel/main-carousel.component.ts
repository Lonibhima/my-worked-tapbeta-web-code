import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SwiperConfigInterface, SwiperPaginationInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss']
})
export class MainCarouselComponent implements OnInit {
  @Input('slides') slides: Array<any> = [];
  @ViewChild(SwiperDirective) swiperDirectiveRef: SwiperDirective;

  public config: SwiperConfigInterface = {};



  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };

  constructor(public authService: AuthService) { }

  ngOnInit() {

  }




  ngAfterViewInit(){
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
  }

  onBuyAirtime() {

  }


  onBuyData() {

  }

}
