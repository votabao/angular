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
var member_service_1 = require("../../../../core/services/member.service");
var common_service_1 = require("../../../../core/services/common.service");
var MemberFormComponent = /** @class */ (function () {
    function MemberFormComponent(memberService, service, fb, router) {
        this.memberService = memberService;
        this.service = service;
        this.fb = fb;
        this.router = router;
        this.disabled = false;
        this.dropdownSettings = {};
    }
    MemberFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dropdownSettings = {
            singleSelection: true,
            itemsShowLimit: 1,
            allowSearchFilter: true,
            textField: 'email'
        };
        this.memberService.getUsersLoggedIn().subscribe(function (users) {
            _this.users = users;
        });
        this.myForm = this.fb.group({
            email: new forms_1.FormControl(null, [forms_1.Validators.required]),
        });
    };
    MemberFormComponent.prototype.addUser = function (user) {
        var _this = this;
        this.memberService.addUser(user, this.groupID).subscribe(function () {
            _this.service.showSuccessNotify("Added " + user.name[0] + " success !", "Success");
            _this.selectedItems = [];
            _this.router.navigate(["group/" + _this.groupID + "/pending-items"]).then(function () { });
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MemberFormComponent.prototype, "groupID", void 0);
    MemberFormComponent = __decorate([
        core_1.Component({
            selector: 'app-member-form',
            templateUrl: './member-form.component.html',
            styleUrls: ['./member-form.component.styl']
        }),
        __metadata("design:paramtypes", [member_service_1.MemberService,
            common_service_1.CommonService,
            forms_1.FormBuilder,
            router_1.Router])
    ], MemberFormComponent);
    return MemberFormComponent;
}());
exports.MemberFormComponent = MemberFormComponent;
//# sourceMappingURL=member-form.component.js.map