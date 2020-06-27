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
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var content_1 = require("../../../core/models/content");
var content_service_1 = require("src/app/core/services/content.service");
var common_service_1 = require("src/app/core/services/common.service");
var modal_service_1 = require("../../../core/services/modal.service");
var modal_edit_content_component_1 = require("../modal-edit-content/modal-edit-content.component");
var ContentComponent = /** @class */ (function () {
    function ContentComponent(modalService, contentService, config, service) {
        this.modalService = modalService;
        this.contentService = contentService;
        this.config = config;
        this.service = service;
        this.bindingContent = '';
        this.active = 1;
        this.viewAllActive = false;
        this.selectedContent = new content_1.Content();
        this.disableDate();
    }
    ContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.contentService.refresh.subscribe(function () {
            _this.getListContent();
        });
        this.getListContent();
    };
    ContentComponent.prototype.open = function (id) {
        var _this = this;
        this.contentService.getContentById(id).subscribe(function (content) {
            _this.modalService.open(modal_edit_content_component_1.ModalEditContentComponent, content).result.then(function (res) {
                _this.updateContent(res, id);
            }, function (dismiss) {
                console.log('Cross Button', dismiss);
            });
        });
    };
    ContentComponent.prototype.updateContent = function (data, id) {
        var _this = this;
        this.contentService.updateContent(data, id).subscribe(function (content) {
            _this.getListContent();
        }, function (error) {
        });
    };
    ContentComponent.prototype.deleteContent = function (id, content) {
        this.contentService.removeContent(id, "Deleted " + content.title, 'Success!');
    };
    ContentComponent.prototype.getListContent = function () {
        var _this = this;
        this.contentService.getContents().subscribe(function (contents) {
            _this.contents = contents;
        }, function (error) {
            _this.service.showErrorNotify("Error, " + error.statusText, 'Fail!');
        });
    };
    ContentComponent.prototype.createNewContent = function (title, content, startDate, endDate, level) {
        var _this = this;
        var newContent = new content_1.Content;
        newContent.title = title;
        newContent.content = content;
        newContent.startDate = startDate;
        newContent.endDate = endDate;
        newContent.level = level;
        this.contentService.addContent(newContent).subscribe(function (contents) {
            _this.contents.push(contents);
            _this.service.showSuccessNotify(newContent.title + " was created", 'Success!');
            _this.getListContent();
        }, function (error) {
            _this.service.showErrorNotify("Error " + error.statusText, 'Fail!');
        });
    };
    ContentComponent.prototype.onSelect = function (content) {
        this.selectedContent = this.bestCopy(content);
    };
    ContentComponent.prototype.bestCopy = function (src) {
        return Object.assign({}, src);
    };
    ContentComponent.prototype.disableDate = function () {
        var current = new Date();
        this.config.minDate = {
            year: current.getFullYear(),
            month: current.getMonth() + 1,
            day: current.getDate()
        };
        this.config.maxDate = { year: 2099, month: 12, day: 31 };
        this.config.outsideDays = 'hidden';
    };
    ContentComponent = __decorate([
        core_1.Component({
            selector: 'app-content',
            templateUrl: './content.component.html',
            styleUrls: ['./content.component.styl']
        }),
        __metadata("design:paramtypes", [modal_service_1.ModalService,
            content_service_1.ContentService,
            ng_bootstrap_1.NgbDatepickerConfig,
            common_service_1.CommonService])
    ], ContentComponent);
    return ContentComponent;
}());
exports.ContentComponent = ContentComponent;
//# sourceMappingURL=content.component.js.map