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
var http_1 = require("@angular/common/http");
var ngx_toastr_1 = require("ngx-toastr");
var config_1 = require("../../shared/config");
var LoginService = /** @class */ (function () {
    function LoginService(httpClient, toast) {
        this.httpClient = httpClient;
        this.toast = toast;
    }
    LoginService.prototype.getToken = function (loginInfo) {
        return this.httpClient.post(config_1.CONFIG.tokenUrl, loginInfo);
    };
    LoginService.prototype.showError = function () {
        this.toast.error('Your email is not allowed to access', 'Error!', {
            timeOut: 3000,
            progressBar: true,
            closeButton: true
        });
    };
    LoginService.prototype.showSuccess = function () {
        this.toast.success('Log in success', 'Welcome', {
            timeOut: 2500
        });
    };
    LoginService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient,
            ngx_toastr_1.ToastrService])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map