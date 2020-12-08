import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CookieComponent } from './cookie.component';

export const routes = [
  { path: '', component: CookieComponent,
  pathMatch: 'full',
 }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    CookieComponent
  ]
})
export class CookieModule { }
