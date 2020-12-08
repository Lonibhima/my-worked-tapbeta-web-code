"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = exports.getToken = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var animations_1 = require("@angular/platform-browser/animations");
var http_1 = require("@angular/common/http");
var ngx_spinner_1 = require("ngx-spinner");
var core_2 = require("@agm/core");
var overlay_1 = require("@angular/cdk/overlay");
var menu_1 = require("@angular/material/menu");
var custom_overlay_container_1 = require("./theme/utils/custom-overlay-container");
var scroll_strategy_1 = require("./theme/utils/scroll-strategy");
var shared_module_1 = require("./shared/shared.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var pages_component_1 = require("./pages/pages.component");
var not_found_component_1 = require("./pages/not-found/not-found.component");
var chat_component_1 = require("./pages/chat/chat.component");
var top_menu_component_1 = require("./theme/components/top-menu/top-menu.component");
var breadcrumb_component_1 = require("./theme/components/breadcrumb/breadcrumb.component");
var app_settings_1 = require("./app.settings");
var app_service_1 = require("./app.service");
var app_interceptor_1 = require("./theme/utils/app-interceptor");
var footer_component_1 = require("./theme/components/footer/footer.component");
var my_snackbar_service_1 = require("./shared/my-snackbar/my-snackbar.service");
var notification_service_1 = require("./_services/notification.service");
var auth_service_1 = require("./_services/auth.service");
var user_service_1 = require("./_services/user.service");
var error_interceptor_1 = require("./_services/error.interceptor");
var auth_guard_1 = require("./_guards/auth.guard");
// import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
var member_detail_resolver_1 = require("./_resolvers/member-detail.resolver");
var member_edit_resolver_1 = require("./_resolvers/member-edit.resolver");
var lists_resolver_1 = require("./_resolvers/lists.resolver");
var angular_jwt_1 = require("@auth0/angular-jwt");
var environment_1 = require("src/environments/environment");
var timeAgo_pipe_1 = require("./_pipes/timeAgo.pipe");
var my_snackbar_component_1 = require("./shared/my-snackbar/my-snackbar.component");
var forms_1 = require("@angular/forms");
function getToken() {
    return localStorage.getItem('token');
}
exports.getToken = getToken;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                http_1.HttpClientModule,
                ngx_spinner_1.NgxSpinnerModule,
                forms_1.FormsModule,
                core_2.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyA1rF9bttCxRmsNdZYjW7FzIoyrul5jb-s'
                }),
                shared_module_1.SharedModule,
                app_routing_1.AppRoutingModule,
                angular_jwt_1.JwtModule.forRoot({
                    config: {
                        tokenGetter: getToken,
                        allowedDomains: [environment_1.environment.apiUrl],
                        disallowedRoutes: [environment_1.environment.apiUrl + 'auth']
                    }
                })
            ],
            declarations: [
                app_component_1.AppComponent,
                pages_component_1.PagesComponent,
                not_found_component_1.NotFoundComponent,
                top_menu_component_1.TopMenuComponent,
                breadcrumb_component_1.BreadcrumbComponent,
                footer_component_1.FooterComponent,
                timeAgo_pipe_1.TimeAgoPipe,
                chat_component_1.ChatComponent,
                my_snackbar_component_1.MySnackbarComponent,
            ],
            providers: [
                app_settings_1.AppSettings,
                app_service_1.AppService,
                my_snackbar_service_1.MySnackbarService,
                notification_service_1.NotificationService,
                auth_service_1.AuthService,
                error_interceptor_1.ErrorInterceptorProvider,
                auth_guard_1.AuthGuard,
                user_service_1.UserService,
                member_detail_resolver_1.MemberDetailResolver,
                member_edit_resolver_1.MemberEditResolver,
                lists_resolver_1.ListsResolver,
                // PreventUnsavedChanges,
                { provide: overlay_1.OverlayContainer, useClass: custom_overlay_container_1.CustomOverlayContainer },
                { provide: menu_1.MAT_MENU_SCROLL_STRATEGY, useFactory: scroll_strategy_1.menuScrollStrategy, deps: [overlay_1.Overlay] },
                { provide: http_1.HTTP_INTERCEPTORS, useClass: app_interceptor_1.AppInterceptor, multi: true }
            ],
            entryComponents: [my_snackbar_component_1.MySnackbarComponent],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
