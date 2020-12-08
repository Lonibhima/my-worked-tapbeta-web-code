import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

export const routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }