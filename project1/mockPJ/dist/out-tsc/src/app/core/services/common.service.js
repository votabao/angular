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
var ngx_toastr_1 = require("ngx-toastr");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var CommonService = /** @class */ (function () {
    function CommonService(toast, config) {
        this.toast = toast;
        this.config = config;
    }
    CommonService.prototype.showSuccessNotify = function (message, title) {
        return this.toast.success(message, title);
    };
    CommonService.prototype.showErrorNotify = function (message, title) {
        return this.toast.error(message, title);
    };
    CommonService.prototype.getCurrentDate = function () {
        var stringDate = new Date().toISOString().substring(0, 10);
        return new Date(new Date(stringDate).toISOString());
    };
    CommonService.prototype.disablePastDay = function () {
        var current = new Date();
        this.config.minDate = { year: current.getFullYear(), month: current.getMonth() + 1, day: current.getDate() };
        this.config.outsideDays = 'hidden';
    };
    CommonService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [ngx_toastr_1.ToastrService,
            ng_bootstrap_1.NgbDatepickerConfig])
    ], CommonService);
    return CommonService;
}());
exports.CommonService = CommonService;
//# sourceMappingURL=common.service.js.map