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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var common_service_1 = require("../../../../core/services/common.service");
var config_1 = require("../../../config");
var avatar_cover_service_1 = require("src/app/core/services/avatar-cover.service");
var GroupHeaderComponent = /** @class */ (function () {
    function GroupHeaderComponent(fb, avatarService, service, route, router) {
        this.fb = fb;
        this.avatarService = avatarService;
        this.service = service;
        this.route = route;
        this.router = router;
        this.groupImg = {};
        this.uploadForm = this.fb.group({
            avatar: [null],
            name: ['']
        });
    }
    GroupHeaderComponent.prototype.ngOnInit = function () {
        this.param = this.router.url.substring(7, this.router.url.lastIndexOf('/'));
        this.getGroupFromRoute();
    };
    GroupHeaderComponent.prototype.getGroupFromRoute = function () {
        var groupId = this.route.snapshot.paramMap.get('id') || '2';
    };
    GroupHeaderComponent.prototype.showPreview = function (event) {
        var _this = this;
        var file = event.target.files[0];
        var x = this.validateImageSize(file);
        if (!x) {
            return;
        }
        this.uploadForm.get('avatar').updateValueAndValidity();
        var reader = new FileReader();
        reader.onload = function () {
            _this.imageURL = reader.result;
            _this.groupImg.fileData = _this.imageURL;
            _this.groupImg.fileName = file.name;
            _this.uploadAvatar();
        };
        reader.onloadend = this.handleReaderLoaded.bind(this);
        reader.readAsDataURL(file);
    };
    GroupHeaderComponent.prototype.uploadAvatar = function () {
        var _this = this;
        this.avatarService
            .uploadAvatar(this.groupImg)
            .subscribe(function () { return (_this.groupImg.imageURL = _this.imageURL); });
    };
    GroupHeaderComponent.prototype.validateImageSize = function (file) {
        if (file.size > config_1.CONFIG.maxSizeImg) {
            this.service.showErrorNotify(null, 'File is too big! Please upload file less than 1MB');
            return false;
        }
        else {
            this.uploadForm.patchValue({
                avatar: file
            });
            this.service.showSuccessNotify(null, 'Upload avatar success!');
            return true;
        }
    };
    GroupHeaderComponent.prototype.handleReaderLoaded = function (e) {
        var reader = e.target;
        var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
        this.DriversLicenseString = base64result;
    };
    __decorate([
        core_1.ViewChild('fileImg', { static: true }),
        __metadata("design:type", core_1.ElementRef)
    ], GroupHeaderComponent.prototype, "file", void 0);
    GroupHeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-group-header',
            templateUrl: './group-header.component.html',
            styleUrls: ['./group-header.component.styl']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            avatar_cover_service_1.AvatarCoverService,
            common_service_1.CommonService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], GroupHeaderComponent);
    return GroupHeaderComponent;
}());
exports.GroupHeaderComponent = GroupHeaderComponent;
//# sourceMappingURL=group-header.component.js.map