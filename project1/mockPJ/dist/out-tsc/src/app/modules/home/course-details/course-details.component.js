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
var course_1 = require("../../../core/models/course");
var common_service_1 = require("../../../core/services/common.service");
var config_1 = require("../../../shared/config");
var course_service_1 = require("src/app/core/services/course.service");
var group_service_1 = require("src/app/core/services/group.service");
var CourseDetailsComponent = /** @class */ (function () {
    function CourseDetailsComponent(courseService, groupService, service, modalService, route) {
        this.courseService = courseService;
        this.groupService = groupService;
        this.service = service;
        this.modalService = modalService;
        this.route = route;
        this.dateFormat = config_1.CONFIG.dateFormat;
        this.groupComing = [];
        this.groupRunning = [];
        this.title = 'Course';
        this.bgUrl = '../../../../assets/img/banner.jpg';
        this.service.disablePastDay();
    }
    CourseDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.courseService.getCourses().subscribe(function (courses) {
            _this.courses = courses;
        });
        this.route.paramMap.subscribe(function (params) {
            _this.courseID = params.get('id');
            _this.groupService.getGroupsById(_this.courseID).subscribe(function (matchGroup) {
                for (var i = 0; i < matchGroup.length; i++) {
                    var getStartDate = new Date(new Date(matchGroup[i].startDate));
                    if (_this.service.getCurrentDate() - getStartDate < 0) {
                        _this.groupComing.push(matchGroup[i]);
                    }
                    else if (_this.service.getCurrentDate() - getStartDate >= 0) {
                        _this.groupRunning.push(matchGroup[i]);
                    }
                }
                _this.sortDate(_this.groupComing);
                _this.sortDate(_this.groupRunning);
            });
        });
    };
    CourseDetailsComponent.prototype.open = function (content) {
        this.modalRef = this.modalService.open(content, {
            size: 'lg',
            centered: true
        });
    };
    CourseDetailsComponent.prototype.createGroup = function (createdGroup) {
        var _this = this;
        this.groupService.addGroup(createdGroup, this.courseID).subscribe(function () {
            _this.service.showSuccessNotify(createdGroup.name + " was created", 'Success!');
            _this.modalRef.close();
        }, function (error) {
            _this.service.showErrorNotify("Error: " + createdGroup.name + " has been existed", 'Fail!');
        });
    };
    CourseDetailsComponent.prototype.sortDate = function (array) {
        return array.sort(function (a, b) {
            return new Date(b.startDate) - new Date(a.startDate) || a.name.localeCompare(b.name);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", course_1.Course)
    ], CourseDetailsComponent.prototype, "course", void 0);
    CourseDetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-course-details',
            templateUrl: './course-details.component.html',
            styleUrls: ['./course-details.component.styl']
        }),
        __metadata("design:paramtypes", [course_service_1.CourseService,
            group_service_1.GroupService,
            common_service_1.CommonService,
            ng_bootstrap_1.NgbModal,
            router_1.ActivatedRoute])
    ], CourseDetailsComponent);
    return CourseDetailsComponent;
}());
exports.CourseDetailsComponent = CourseDetailsComponent;
//# sourceMappingURL=course-details.component.js.map