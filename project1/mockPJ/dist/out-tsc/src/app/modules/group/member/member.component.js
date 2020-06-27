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
var group_service_1 = require("../../../core/services/group.service");
var MemberComponent = /** @class */ (function () {
    function MemberComponent(groupService, route) {
        this.groupService = groupService;
        this.route = route;
    }
    MemberComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            _this.groupID = params.get('groupID');
        });
        this.groupService.getGroup().subscribe(function (group) {
            _this.group = group;
        });
    };
    MemberComponent = __decorate([
        core_1.Component({
            selector: 'app-member',
            templateUrl: './member.component.html',
            styleUrls: ['./member.component.styl']
        }),
        __metadata("design:paramtypes", [group_service_1.GroupService,
            router_1.ActivatedRoute])
    ], MemberComponent);
    return MemberComponent;
}());
exports.MemberComponent = MemberComponent;
//# sourceMappingURL=member.component.js.map