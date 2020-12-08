import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { RechargeComponent } from './recharge.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';

export const routes = [
  { path: '', component: RechargeComponent, pathMatch: 'full',
  canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    RechargeComponent ]
})
export class RechargeModule { }
