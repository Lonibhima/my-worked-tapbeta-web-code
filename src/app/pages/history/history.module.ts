import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { HistoryComponent } from './history.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { HistoryResolver } from 'src/app/_resolvers/history.resolver';

export const routes = [
  { path: '', component: HistoryComponent, resolve: {history: HistoryResolver},
  pathMatch: 'full',
  canActivate: [AuthGuard]
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
  HistoryComponent
  ]
})
export class HistoryModule { }
