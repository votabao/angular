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
var config_1 = require("src/app/shared/config");
var common_service_1 = require("./common.service");
var ContentService = /** @class */ (function () {
    function ContentService(http, service) {
        this.http = http;
        this.service = service;
        this.refresh = new rxjs_1.Subject();
    }
    ContentService.prototype.getContents = function () {
        return this.http.get(config_1.CONFIG.contentsUrl);
    };
    ContentService.prototype.addContent = function (content) {
        return this.http.post(config_1.CONFIG.addContentUrl, content);
    };
    ContentService.prototype.getContentById = function (id) {
        var _this = this;
        return rxjs_1.Observable.create(function (obs) {
            obs.next(_this.content[id - 1]);
            obs.complete();
        });
    };
    ContentService.prototype.updateContent = function (content, id) {
        return this.http.put(config_1.CONFIG.editContentUrl + "/" + id, content);
    };
    ContentService.prototype.removeContent = function (id, message, title) {
        var _this = this;
        this.http
            .delete(config_1.CONFIG.contentsUrl + "/" + id)
            .subscribe(function () {
            _this.service.showSuccessNotify(message, title);
            _this.refresh.next();
        });
    };
    ContentService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [http_1.HttpClient, common_service_1.CommonService])
    ], ContentService);
    return ContentService;
}());
exports.ContentService = ContentService;
//# sourceMappingURL=content.service.js.map