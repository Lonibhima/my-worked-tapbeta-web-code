import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { PrivacyComponent } from './privacy.component';

export const routes = [
  { path: '', component: PrivacyComponent,
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
    PrivacyComponent
  ]
})
export class PrivacyModule { }
