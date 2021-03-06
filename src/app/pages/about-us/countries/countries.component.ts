import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/_models/country';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  dataFilteredCountries: Country[];
  public allcountryname: any;
  public countryname: any;
  term: string;
  loader = true;
  constructor( private authService: AuthService,) { }

  ngOnInit(): void {
    console.log(this.dataFilteredCountries)
    this.getAllCountries()
  }

 
  getAllCountries() {
    this.authService.getCountries().subscribe(
      response => {
        this.allcountryname = response;
        this.loader = false;
        this.allcountryname.forEach(element => {
          this.countryname = element.name  
          console.log(this.countryname);
        });
       
      });
  }

}
