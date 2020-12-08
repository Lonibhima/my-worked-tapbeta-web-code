import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AboutUsComponent } from '../about-us/about-us/about-us.component';
import { CountriesComponent } from '../about-us/countries/countries.component';
import { CarriesComponent } from '../about-us/carries/carries.component';
import {MatCardModule} from '@angular/material/card';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

export const routes = [
          { path: '', component: AboutUsComponent},
          { path: 'countries', component: CountriesComponent},
          { path: 'carriers', component: CarriesComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    MatCardModule,
    Ng2SearchPipeModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    AboutUsComponent,
    CountriesComponent,
    CarriesComponent,
  ]
})
export class AboutusModule { }
