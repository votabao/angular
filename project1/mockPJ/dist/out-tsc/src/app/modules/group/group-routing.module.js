"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var content_component_1 = require("./content/content.component");
var member_component_1 = require("./member/member.component");
var group_header_layout_component_1 = require("../../shared/components/layout/group-header-layout/group-header-layout.component");
var calendar_component_1 = require("./calendar/calendar.component");
var pending_items_component_1 = require("./pending-items/pending-items.component");
var member_detail_component_1 = require("./member-detail/member-detail.component");
var event_component_1 = require("./event/event.component");
var routes = [
    {
        path: '',
        component: group_header_layout_component_1.GroupHeaderLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: ':groupID/content',
                pathMatch: 'full'
            },
            {
                path: ':groupID/content',
                component: content_component_1.ContentComponent
            },
            {
                path: ':groupID/member',
                component: member_component_1.MemberComponent
            },
            {
                path: ':groupID/calendar',
                component: calendar_component_1.CalendarComponent
            },
            {
                path: ':groupID/member/:memberID',
                component: member_detail_component_1.MemberDetailComponent
            },
            {
                path: ':groupID/pending-items',
                component: pending_items_component_1.PendingItemsComponent
            },
            {
                path: ':groupID/event',
                component: event_component_1.EventComponent
            },
            {
                path: ':groupID/attendance',
                component: event_component_1.EventComponent
            },
        ]
    }
];
var GroupRoutingModule = /** @class */ (function () {
    function GroupRoutingModule() {
    }
    GroupRoutingModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], GroupRoutingModule);
    return GroupRoutingModule;
}());
exports.GroupRoutingModule = GroupRoutingModule;
//# sourceMappingURL=group-routing.module.js.map