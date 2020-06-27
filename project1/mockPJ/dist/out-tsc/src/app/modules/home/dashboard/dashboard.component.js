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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var common_service_1 = require("../../../core/services/common.service");
var course_service_1 = require("../../../core/services/course.service");
var modal_create_course_component_1 = require("../modal-create-course/modal-create-course.component");
var DashBoardComponent = /** @class */ (function () {
    function DashBoardComponent(service, courseService, modalService, router) {
        this.service = service;
        this.courseService = courseService;
        this.modalService = modalService;
        this.router = router;
        this.title = 'Welcome to lsn';
        this.bgUrl = '../../../../assets/img/banner2.jpg';
    }
    DashBoardComponent.prototype.ngOnInit = function () {
        var token = localStorage.getItem('token');
        this.isLogin = !!token;
        this.getCourses();
    };
    DashBoardComponent.prototype.accessDenied = function (courseID) {
        if (!this.isLogin) {
            this.service.showErrorNotify(null, 'You have to login first!');
            return;
        }
        this.router.navigate(['/course', courseID]);
    };
    DashBoardComponent.prototype.getCourses = function () {
        var _this = this;
        this.courseService.getCourses().subscribe(function (courses) {
            _this.courses = courses;
        });
    };
    DashBoardComponent.prototype.createCourse = function () {
        var _this = this;
        this.modalService
            .open(modal_create_course_component_1.ModalCreateCourseComponent, {
            size: 'lg',
            centered: true
        })
            .result.then(function (course) {
            _this.courseService.addCourse(course).subscribe(function () {
                _this.getCourses();
                _this.service.showSuccessNotify(course.name + " was created", 'Success!');
            }, function (error) {
                _this.service.showErrorNotify("Error: name is existed", 'Fail!');
            });
        })
            .catch(function (err) {
            _this.service.showErrorNotify('Error', 'Fail!');
        });
    };
    DashBoardComponent = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.component.html',
            styleUrls: ['./dashboard.component.styl']
        }),
        __metadata("design:paramtypes", [common_service_1.CommonService,
            course_service_1.CourseService,
            ng_bootstrap_1.NgbModal,
            router_1.Router])
    ], DashBoardComponent);
    return DashBoardComponent;
}());
exports.DashBoardComponent = DashBoardComponent;
//# sourceMappingURL=dashboard.component.js.map