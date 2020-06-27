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
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var common_service_1 = require("./common.service");
var config_1 = require("../../shared/config");
var MemberService = /** @class */ (function () {
    function MemberService(http, notify) {
        this.http = http;
        this.notify = notify;
        this.refreshData = new rxjs_1.Subject();
    }
    MemberService.prototype.getMembers = function (groupId) {
        return this.http.get(config_1.CONFIG.membersUrl + groupId);
    };
    MemberService.prototype.getMemberByID = function (memberId) {
        return this.http.get(config_1.CONFIG.memberDetailUrl + memberId);
    };
    MemberService.prototype.getUsersLoggedIn = function () {
        return this.http.get(config_1.CONFIG.userLoggedIn);
    };
    MemberService.prototype.addUser = function (user, groupId) {
        var _this = this;
        return this.http.post(config_1.CONFIG.addUser + groupId, user, { responseType: 'text' })
            .pipe(operators_1.tap(function () {
            _this.notify.showSuccessNotify('Added', 'Success!');
            _this.refreshData.next();
        }, function (err) { return _this.notify.showErrorNotify('You have no permission!', null); }));
    };
    MemberService.prototype.removeMember = function (memberId, groupId, message, title) {
        var _this = this;
        this.http.delete(config_1.CONFIG.removeMemberUrl + memberId + '&group_id=' + groupId, { responseType: 'text' })
            .subscribe(function () {
            _this.notify.showSuccessNotify(message, title);
            _this.refreshData.next();
        }, function (err) { return _this.notify.showErrorNotify('You have no permission!', null); });
    };
    MemberService.prototype.setCaptain = function (memberId, groupId) {
        var _this = this;
        return this.http.put(config_1.CONFIG.setCaptainUrl + memberId + '&group_id=' + groupId, {}, { responseType: 'text' })
            .subscribe(function () {
            _this.notify.showSuccessNotify('Set Captain Success', 'Success');
            _this.refreshData.next();
        }, function (err) { return _this.notify.showErrorNotify('You have no permission!', null); });
    };
    MemberService.prototype.removeMentor = function (memberId, groupId) {
        var _this = this;
        return this.http.put(config_1.CONFIG.removeMentorUrl + memberId + '&group_id=' + groupId, {}, { responseType: 'text' })
            .subscribe(function () {
            _this.notify.showSuccessNotify('Remove Mentor Success', 'Success');
            _this.refreshData.next();
        }, function (err) { return _this.notify.showErrorNotify('You have no permission!', null); });
    };
    MemberService.prototype.setMentor = function (memberId, groupId) {
        var _this = this;
        return this.http.put(config_1.CONFIG.setMentorUrl + memberId + '&group_id=' + groupId, {}, { responseType: 'text' })
            .subscribe(function () {
            _this.notify.showSuccessNotify('Set Mentor Success', 'Success');
            _this.refreshData.next();
        }, function (err) { return _this.notify.showErrorNotify('You have no permission!', null); });
    };
    MemberService.prototype.getPendingUsers = function (groupId) {
        return this.http.get(config_1.CONFIG.pendingUrl + groupId);
    };
    MemberService.prototype.declineUser = function (memberId, groupId, message, title) {
        var _this = this;
        this.http.delete(config_1.CONFIG.declinePendingUser + memberId + '&groupID=' + groupId, { responseType: 'text' })
            .subscribe(function () {
            _this.notify.showSuccessNotify(message, title);
            _this.refreshData.next();
        }, function (err) { return _this.notify.showErrorNotify('You have no permission!', null); });
    };
    MemberService.prototype.approveUser = function (member, memberId, groupId) {
        var _this = this;
        return this.http.put(config_1.CONFIG.approvePendingUser + memberId + '&groupID=' + groupId, { responseType: 'text' })
            .pipe(operators_1.tap(function () {
            _this.refreshData.next();
        }, function (err) { return _this.notify.showErrorNotify('You have no permission!', null); }));
    };
    MemberService.prototype.declineContent = function (contentId, groupId, message, title) {
        var _this = this;
        this.http.delete(config_1.CONFIG.declinePendingContent + groupId + '&contentID=' + contentId, { responseType: 'text' })
            .subscribe(function () {
            _this.notify.showSuccessNotify(message, title);
            _this.refreshData.next();
        }, function (err) { return _this.notify.showErrorNotify('You have no permission!', null); });
    };
    MemberService.prototype.approveContent = function (contentId, groupId) {
        var _this = this;
        return this.http.put(config_1.CONFIG.approvePendingContent + groupId + '&contentID=' + contentId, { responseType: 'text' })
            .pipe(operators_1.tap(function () {
            _this.refreshData.next();
        }, function (err) { return _this.notify.showErrorNotify('You have no permission!', null); }));
    };
    MemberService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient,
            common_service_1.CommonService])
    ], MemberService);
    return MemberService;
}());
exports.MemberService = MemberService;
//# sourceMappingURL=member.service.js.map