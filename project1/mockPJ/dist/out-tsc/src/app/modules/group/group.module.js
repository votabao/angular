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
var forms_1 = require("@angular/forms");
var tinymce_angular_1 = require("@tinymce/tinymce-angular");
var ng_multiselect_dropdown_1 = require("ng-multiselect-dropdown");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var shared_module_1 = require("src/app/shared/shared.module");
var group_routing_module_1 = require("./group-routing.module");
var angular_1 = require("@fullcalendar/angular");
var content_component_1 = require("./content/content.component");
var member_component_1 = require("./member/member.component");
var modal_service_1 = require("../../core/services/modal.service");
var member_list_component_1 = require("./member/member-list/member-list.component");
var member_calendar_component_1 = require("./member/member-calendar/member-calendar.component");
var info_group_component_1 = require("./member/info-group/info-group.component");
var important_document_component_1 = require("./member/important-document/important-document.component");
var member_form_component_1 = require("./member/member-form/member-form.component");
var pending_items_component_1 = require("./pending-items/pending-items.component");
var member_detail_component_1 = require("./member-detail/member-detail.component");
var event_component_1 = require("./event/event.component");
var modal_create_event_component_1 = require("./modal-create-event/modal-create-event.component");
var calendar_component_1 = require("./calendar/calendar.component");
var modal_edit_content_component_1 = require("./modal-edit-content/modal-edit-content.component");
var GroupModule = /** @class */ (function () {
    function GroupModule() {
    }
    GroupModule = __decorate([
        core_1.NgModule({
            declarations: [
                content_component_1.ContentComponent,
                member_component_1.MemberComponent,
                modal_edit_content_component_1.ModalEditContentComponent,
                member_calendar_component_1.MemberCalendarComponent,
                info_group_component_1.InfoGroupComponent,
                important_document_component_1.ImportantDocumentComponent,
                member_form_component_1.MemberFormComponent,
                pending_items_component_1.PendingItemsComponent,
                member_detail_component_1.MemberDetailComponent,
                event_component_1.EventComponent,
                modal_create_event_component_1.ModalCreateEventComponent,
                calendar_component_1.CalendarComponent,
                member_list_component_1.MemberListComponent
            ],
            entryComponents: [modal_create_event_component_1.ModalCreateEventComponent, modal_edit_content_component_1.ModalEditContentComponent],
            imports: [
                common_1.CommonModule,
                tinymce_angular_1.EditorModule,
                group_routing_module_1.GroupRoutingModule,
                shared_module_1.SharedModule,
                forms_1.FormsModule,
                angular_1.FullCalendarModule,
                ng_bootstrap_1.NgbModule,
                forms_1.ReactiveFormsModule,
                ng_multiselect_dropdown_1.NgMultiSelectDropDownModule,
                ng_bootstrap_1.NgbModule,
                forms_1.FormsModule
            ],
            providers: [modal_service_1.ModalService]
        })
    ], GroupModule);
    return GroupModule;
}());
exports.GroupModule = GroupModule;
//# sourceMappingURL=group.module.js.map