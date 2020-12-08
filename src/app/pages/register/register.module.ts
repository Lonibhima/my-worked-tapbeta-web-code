import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from './register.component';
import { NgxSpinnerModule } from 'ngx-spinner';


export const routes = [
  { path: '', component: RegisterComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    NgxSpinnerModule,
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule { }
