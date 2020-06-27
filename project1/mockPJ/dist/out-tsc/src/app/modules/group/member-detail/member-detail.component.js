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
var member_service_1 = require("../../../core/services/member.service");
var config_1 = require("../../../shared/config");
var MemberDetailComponent = /** @class */ (function () {
    function MemberDetailComponent(route, memberService) {
        this.route = route;
        this.memberService = memberService;
        this.dateFormat = config_1.CONFIG.dateFormat;
    }
    MemberDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            _this.memberID = params.get('memberID');
            _this.memberService.getMemberByID(_this.memberID).subscribe(function (member) {
                _this.member = member;
            });
        });
    };
    MemberDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-member-detail',
            templateUrl: './member-detail.component.html',
            styleUrls: ['./member-detail.component.styl']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            member_service_1.MemberService])
    ], MemberDetailComponent);
    return MemberDetailComponent;
}());
exports.MemberDetailComponent = MemberDetailComponent;
//# sourceMappingURL=member-detail.component.js.map