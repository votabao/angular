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
var BannerComponent = /** @class */ (function () {
    function BannerComponent() {
        this.ngStyle = null;
    }
    BannerComponent.prototype.ngOnInit = function () {
        this.ngStyle = {
            'background-image': 'linear-gradient(45deg, rgba(75, 117, 160, 0.6) 55%, rgba(45,95,93,0.7)),' +
                'url(' +
                this.url +
                ')'
        };
    };
    __decorate([
        core_1.Input('title'),
        __metadata("design:type", String)
    ], BannerComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input('url'),
        __metadata("design:type", String)
    ], BannerComponent.prototype, "url", void 0);
    BannerComponent = __decorate([
        core_1.Component({
            selector: 'app-banner',
            templateUrl: './banner.component.html',
            styleUrls: ['./banner.component.styl']
        }),
        __metadata("design:paramtypes", [])
    ], BannerComponent);
    return BannerComponent;
}());
exports.BannerComponent = BannerComponent;
//# sourceMappingURL=banner.component.js.map