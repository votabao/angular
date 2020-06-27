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
var modal_service_1 = require("../../../core/services/modal.service");
var content_service_1 = require("../../../core/services/content.service");
var ModalEditContentComponent = /** @class */ (function () {
    function ModalEditContentComponent(activeModal, modalService, contentService) {
        this.activeModal = activeModal;
        this.modalService = modalService;
        this.contentService = contentService;
        this.data = null;
        this.selectedContent = {};
    }
    ModalEditContentComponent.prototype.ngOnInit = function () {
    };
    ModalEditContentComponent.prototype.close = function () {
        this.activeModal.close(this.data);
    };
    ModalEditContentComponent.prototype.closeModal = function () {
        this.activeModal.dismiss();
    };
    ModalEditContentComponent = __decorate([
        core_1.Component({
            selector: 'app-modal-edit-content',
            templateUrl: './modal-edit-content.component.html',
            styleUrls: ['./modal-edit-content.component.styl']
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbActiveModal,
            modal_service_1.ModalService,
            content_service_1.ContentService])
    ], ModalEditContentComponent);
    return ModalEditContentComponent;
}());
exports.ModalEditContentComponent = ModalEditContentComponent;
//# sourceMappingURL=modal-edit-content.component.js.map