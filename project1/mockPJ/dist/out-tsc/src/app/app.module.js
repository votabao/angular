"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var animations_1 = require("@angular/platform-browser/animations");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var ng_multiselect_dropdown_1 = require("ng-multiselect-dropdown");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var ngx_toastr_1 = require("ngx-toastr");
var angularx_social_login_1 = require("angularx-social-login");
var app_component_1 = require("./app.component");
var angular_font_awesome_1 = require("angular-font-awesome");
var app_routing_module_1 = require("./app-routing.module");
var config_1 = require("./shared/config");
var auth_interceptor_1 = require("./core/interceptor/auth-interceptor");
var not_found_component_1 = require("./shared/components/not-found/not-found.component");
var config = new angularx_social_login_1.AuthServiceConfig([
    {
        id: angularx_social_login_1.GoogleLoginProvider.PROVIDER_ID,
        provider: new angularx_social_login_1.GoogleLoginProvider(config_1.CONFIG.googleOauthClientId)
    }
]);
var routes = [];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                not_found_component_1.NotFoundComponent
            ],
            imports: [
                router_1.RouterModule.forRoot(routes),
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                angularx_social_login_1.SocialLoginModule.initialize(config),
                animations_1.BrowserAnimationsModule,
                ngx_toastr_1.ToastrModule.forRoot(),
                angular_font_awesome_1.AngularFontAwesomeModule,
                ng_bootstrap_1.NgbModule,
                http_1.HttpClientModule,
                app_routing_module_1.AppRoutingModule,
                ng_multiselect_dropdown_1.NgMultiSelectDropDownModule.forRoot()
            ],
            providers: [
                { provide: http_1.HTTP_INTERCEPTORS, useClass: auth_interceptor_1.AuthInterceptor, multi: true }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map