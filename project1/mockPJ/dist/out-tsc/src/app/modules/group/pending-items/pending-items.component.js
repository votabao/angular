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
var common_service_1 = require("../../../core/services/common.service");
var config_1 = require("../../../shared/config");
var PendingItemsComponent = /** @class */ (function () {
    function PendingItemsComponent(memberService, service, router) {
        this.memberService = memberService;
        this.service = service;
        this.router = router;
        this.dateFormat = config_1.CONFIG.dateFormat;
    }
    PendingItemsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.groupId = this.router.url.substring(7, this.router.url.lastIndexOf('/'));
        this.memberService.refreshData.subscribe(function () {
            _this.getPendingItems();
        });
        this.getPendingItems();
    };
    PendingItemsComponent.prototype.getPendingItems = function () {
        var _this = this;
        this.memberService.getPendingUsers(this.groupId).subscribe(function (pendingItems) {
            _this.pendingUsers = pendingItems.pendingMembers;
            _this.pendingContents = pendingItems.pendingContents;
        });
    };
    PendingItemsComponent.prototype.declineUser = function (memberId, member) {
        this.memberService.declineUser(memberId, this.groupId, "Declined " + member.user.fullName, 'Success!');
    };
    PendingItemsComponent.prototype.approveUser = function (memberId, member) {
        var _this = this;
        this.memberService.approveUser(member, memberId, this.groupId).subscribe(function () {
            _this.service.showSuccessNotify("Approved " + member.email[0] + " success !", "Success!");
        });
    };
    PendingItemsComponent.prototype.declineContent = function (contentId, content) {
        this.memberService.declineContent(contentId, this.groupId, "Declined " + content.title, 'Success!');
    };
    PendingItemsComponent.prototype.approveContent = function (contentId, content) {
        var _this = this;
        this.memberService.approveContent(contentId, this.groupId).subscribe(function () {
            _this.service.showSuccessNotify("Approved " + content.title, 'Success!');
        });
    };
    PendingItemsComponent = __decorate([
        core_1.Component({
            selector: 'app-pending-items',
            templateUrl: './pending-items.component.html',
            styleUrls: ['./pending-items.component.styl']
        }),
        __metadata("design:paramtypes", [member_service_1.MemberService,
            common_service_1.CommonService,
            router_1.Router])
    ], PendingItemsComponent);
    return PendingItemsComponent;
}());
exports.PendingItemsComponent = PendingItemsComponent;
//# sourceMappingURL=pending-items.component.js.map