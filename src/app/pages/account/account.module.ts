import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AccountComponent } from './account.component';
import { InformationComponent } from './information/information.component';
import { WalletComponent } from './wallet/wallet.component';
import { CardsComponent } from './cards/cards.component';
import { InviteFriendsComponent } from './invite-friends/invite-friends.component';
import { PromotionsComponent } from './promotions/promotions.component';
import { AutoTopUpComponent } from './auto-top-up/auto-top-up.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { AuthGuard } from 'src/app/_guards/auth.guard';
import { AccountHistoryComponent } from './history/history.component';
import { AutoTopUpResolver } from 'src/app/_resolvers/auto-top-up.resolver';
import { HistoryResolver } from 'src/app/_resolvers/history.resolver';

export const routes = [
  {
      path: '',
      component: AccountComponent, children: [
          { path: '', redirectTo: 'information', pathMatch: 'full' },
          // { path: 'wallet', component: WalletComponent, data: {  breadcrumb: 'Wallet' } },
          { path: 'information', component: InformationComponent, data: {  breadcrumb: 'Account Information' } },
          { path: 'cards', component: CardsComponent, resolve: {history: HistoryResolver},
          data: {  breadcrumb: 'Cards' } },
          { path: 'invite-friends', component: InviteFriendsComponent, data: {  breadcrumb: 'Invite Friends' } },
          { path: 'promotions', component: PromotionsComponent, data: {  breadcrumb: 'Promotions' } },
          { path: 'auto-top-up', component: AutoTopUpComponent, resolve: {topUps: AutoTopUpResolver},
          data: {  breadcrumb: 'Auto Top up' } },
          { path: 'update-password', component: UpdatePasswordComponent, data: {  breadcrumb: 'Update Password' } },
          { path: 'history', component: AccountHistoryComponent, resolve: {history: HistoryResolver},
          data: {  breadcrumb: 'Transaction History' } },
      ],
      canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    AccountComponent,
    InformationComponent,
    CardsComponent,
    InviteFriendsComponent,
    PromotionsComponent,
    AutoTopUpComponent,
    UpdatePasswordComponent,
    AccountHistoryComponent,
    WalletComponent
  ]
})
export class AccountModule { }
