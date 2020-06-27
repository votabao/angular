"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var common_service_1 = require("../../../../core/services/common.service");
var angularx_social_login_1 = require("angularx-social-login");
var login_service_1 = require("../../../../core/services/login.service");
var group_service_1 = require("../../../../core/services/group.service");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(authService, loginService, service, groupService, router) {
        this.authService = authService;
        this.loginService = loginService;
        this.service = service;
        this.groupService = groupService;
        this.router = router;
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var user = localStorage.getItem('user');
        if (user) {
            this.user = JSON.parse(user);
        }
        this.getAllGroupsService();
    };
    HeaderComponent.prototype.signIn = function (platform) {
        var _this = this;
        platform = angularx_social_login_1.GoogleLoginProvider.PROVIDER_ID;
        this.authService.signIn(platform).then(function (user) {
            if (user.email.includes('@ntq-solution.com.vn')) {
                _this.loginService
                    .getToken({ email: user.email, idToken: user.idToken })
                    .subscribe(function (response) {
                    location.reload();
                    localStorage.setItem('token', response.body.token);
                    _this.user = user;
                    localStorage.setItem('user', JSON.stringify(user));
                    _this.loginService.showSuccess();
                }, function () {
                    _this.signOut();
                });
            }
            else {
                _this.loginService.showError();
            }
        });
    };
    HeaderComponent.prototype.signOut = function () {
        this.authService.signOut().then(function () { });
        this.user = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/dashboard']).then(function () { return location.reload(); });
    };
    HeaderComponent.prototype.getAllGroupsService = function () {
        var _this = this;
        this.groupService.getJoinedGroups().subscribe(function (groups) {
            _this.groups = groups;
        });
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.styl']
        }),
        __metadata("design:paramtypes", [angularx_social_login_1.AuthService,
            login_service_1.LoginService,
            common_service_1.CommonService,
            group_service_1.GroupService,
            router_1.Router])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map