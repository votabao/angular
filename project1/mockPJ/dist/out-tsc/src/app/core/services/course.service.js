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
var config_1 = require("src/app/shared/config");
var CourseService = /** @class */ (function () {
    function CourseService(http) {
        this.http = http;
    }
    CourseService.prototype.getCourses = function () {
        return this.http.get(config_1.CONFIG.courseUrl);
    };
    CourseService.prototype.addCourse = function (course) {
        return this.http.post(config_1.CONFIG.addCourseUrl, course);
    };
    CourseService.prototype.editCourse = function (course, id) {
        return this.http.put("" + config_1.CONFIG.editCourse + id, course, { responseType: 'text' });
    };
    CourseService.prototype.getCourseById = function (id) {
        return this.http.get(config_1.CONFIG.courseId + id);
    };
    CourseService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], CourseService);
    return CourseService;
}());
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map