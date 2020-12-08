import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { TermsComponent } from './terms.component';

export const routes = [
  { path: '', component: TermsComponent,
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
  TermsComponent
  ]
})
export class TermsModule { }
