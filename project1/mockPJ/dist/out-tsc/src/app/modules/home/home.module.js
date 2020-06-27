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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var shared_module_1 = require("../../shared/shared.module");
var home_routing_module_1 = require("./home-routing.module");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var course_details_component_1 = require("./course-details/course-details.component");
var banner_component_1 = require("./banner/banner.component");
var modal_create_course_component_1 = require("./modal-create-course/modal-create-course.component");
var modal_edit_course_component_1 = require("./modal-edit-course/modal-edit-course.component");
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        core_1.NgModule({
            declarations: [dashboard_component_1.DashBoardComponent, course_details_component_1.CourseDetailsComponent, banner_component_1.BannerComponent, modal_create_course_component_1.ModalCreateCourseComponent, modal_edit_course_component_1.ModalEditCourseComponent],
            entryComponents: [modal_create_course_component_1.ModalCreateCourseComponent],
            imports: [
                common_1.CommonModule,
                home_routing_module_1.HomeRoutingModule,
                shared_module_1.SharedModule,
                forms_1.FormsModule,
                ng_bootstrap_1.NgbModule
            ],
        })
    ], HomeModule);
    return HomeModule;
}());
exports.HomeModule = HomeModule;
//# sourceMappingURL=home.module.js.map