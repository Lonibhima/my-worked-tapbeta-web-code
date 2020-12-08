import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router'; 

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SuccessComponent } from './pages/success/success.component';
import { FailedComponent } from './pages/failed/failed.component';
import { HistoryResolver } from './_resolvers/history.resolver';
import { AccountResolver } from './_resolvers/account.resolver';
import { environment } from 'src/environments/environment'; 

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent, children: [
            { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
            { path: 'about-us', loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutusModule) },
            { path: 'account', loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule),
            resolve: {account: AccountResolver},
            data: { breadcrumb: 'My Account' } },
            { path: 'sign-in', loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule), data: { breadcrumb: 'Sign In ' } },
            { path: 'recharge', loadChildren: () => import('./pages/recharge/recharge.module').then(m => m.RechargeModule),
            data: { breadcrumb: 'Recharge' } },
            { path: 'history', loadChildren: () => import('./pages/history/history.module').then(m => m.HistoryModule),
            resolve: {history: HistoryResolver},
            data: { breadcrumb: 'Transaction History' } },
            { path: 'help', loadChildren: () => import('./pages/help/help.module')
            .then(m => m.HelpModule), data: { breadcrumb: 'Help' } },
            { path: 'terms', loadChildren: () => import('./pages/terms/terms.module')
            .then(m => m.TermsModule), data: { breadcrumb: 'Terms of Service' } },
            { path: 'privacy', loadChildren: () => import('./pages/privacy/privacy.module')
            .then(m => m.PrivacyModule), data: { breadcrumb: 'Privacy Policy' } },
            { path: 'cookie', loadChildren: () => import('./pages/cookie/cookie.module')
            .then(m => m.CookieModule), data: { breadcrumb: 'Cookie Policy' } },
            { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule),
            data: { breadcrumb: 'Register' } },
            { path: 'reset-password', loadChildren: () => import('./pages/reset-password/reset-password.module')
            .then(m => m.ResetPasswordModule), data: { breadcrumb: 'Reset Password ' } },
            { path: environment.secret + '/change-password', loadChildren: () => import('./pages/change-password/change-password.module')
            .then(m => m.ChangePasswordModule), data: { breadcrumb: 'Change Password' } },
        ]
    },
    { path: 'success', component: SuccessComponent },
    { path: 'failed', component: FailedComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }