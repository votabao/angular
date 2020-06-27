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
var config_1 = require("../../../../shared/config");
var member_service_1 = require("../../../../core/services/member.service");
var MemberListComponent = /** @class */ (function () {
    function MemberListComponent(memberService) {
        this.memberService = memberService;
        this.dateFormat = config_1.CONFIG.dateFormat;
    }
    MemberListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.memberService.refreshData.subscribe(function () {
            _this.getMembers();
        });
        this.getMembers();
    };
    MemberListComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    MemberListComponent.prototype.getMembers = function () {
        var _this = this;
        this.memberService.getMembers(this.groupID).subscribe(function (members) {
            var captain = _this.getCaptain(members);
            var mentor = _this.getMentor(members);
            _this.sortByName(members);
            _this.members = captain.concat(mentor).concat(members);
        });
    };
    MemberListComponent.prototype.deleteMember = function (memberID, member) {
        this.memberService.removeMember(memberID, this.groupID, "Deleted", 'Success!');
    };
    MemberListComponent.prototype.sortByName = function (arr) {
        arr.sort(function (a, b) {
            var nameA = a.name;
            var nameB = b.name;
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
    };
    MemberListComponent.prototype.getCaptain = function (arr) {
        var captain = [];
        arr.forEach(function (item, index) {
            if (item.caption) {
                captain = arr.splice(index, 1);
            }
        });
        return captain;
    };
    MemberListComponent.prototype.getMentor = function (arr) {
        var mentor = [];
        arr.forEach(function (item, index) {
            if (item.mentor) {
                mentor = arr.splice(index, 1);
            }
        });
        return mentor;
    };
    MemberListComponent.prototype.removeMentor = function (memberID) {
        this.memberService.removeMentor(memberID, this.groupID);
    };
    MemberListComponent.prototype.setCaptain = function (memberID) {
        this.memberService.setCaptain(memberID, this.groupID);
    };
    MemberListComponent.prototype.setMentor = function (memberID) {
        this.memberService.setMentor(memberID, this.groupID);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MemberListComponent.prototype, "groupID", void 0);
    MemberListComponent = __decorate([
        core_1.Component({
            selector: 'app-member-list',
            templateUrl: './member-list.component.html',
            styleUrls: ['./member-list.component.styl']
        }),
        __metadata("design:paramtypes", [member_service_1.MemberService])
    ], MemberListComponent);
    return MemberListComponent;
}());
exports.MemberListComponent = MemberListComponent;
//# sourceMappingURL=member-list.component.js.map