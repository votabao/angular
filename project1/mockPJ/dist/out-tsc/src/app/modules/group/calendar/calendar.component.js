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
var daygrid_1 = require("@fullcalendar/daygrid");
var interaction_1 = require("@fullcalendar/interaction");
var timegrid_1 = require("@fullcalendar/timegrid");
var angular_1 = require("@fullcalendar/angular");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var config_1 = require("../../../shared/config");
var modal_create_event_component_1 = require("../modal-create-event/modal-create-event.component");
var event_service_1 = require("src/app/core/services/event.service");
var common_service_1 = require("src/app/core/services/common.service");
var modal_edit_event_component_1 = require("../modal-edit-event/modal-edit-event.component");
var modal_service_1 = require("src/app/core/services/modal.service");
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(modalService, eventService, service, modal) {
        this.modalService = modalService;
        this.eventService = eventService;
        this.service = service;
        this.modal = modal;
        this.dateFormat = config_1.CONFIG.dateFormat;
        this.event = {};
        this.calendarPlugins = [daygrid_1.default, timegrid_1.default, interaction_1.default];
        this.calendarEvents = [];
    }
    CalendarComponent.prototype.ngOnInit = function () {
        this.options = {
            editable: true,
            header: {
                left: 'prev,next',
                center: 'title',
                right: 'today'
            },
            plugins: [daygrid_1.default, interaction_1.default]
        };
        this.getEvents();
    };
    CalendarComponent.prototype.eventClick = function (model) {
    };
    CalendarComponent.prototype.getEvents = function () {
        var _this = this;
        this.eventService.getEvent().subscribe(function (events) {
            _this.events = _this.showEventHistory(events);
            var eventClone = [];
            events.forEach(function (event) {
                var e = {
                    id: event.id,
                    title: event.title,
                    start: new Date(event.startDate),
                    description: event.content,
                    document: event.document,
                    speaker: event.speaker,
                    timeStart: event.startTime,
                    timeEnd: event.endTime,
                    duration: event.duration
                };
                eventClone.push(e);
            });
            _this.calendarEvents = eventClone;
        });
    };
    CalendarComponent.prototype.showEventHistory = function (events) {
        var _this = this;
        events = events.filter(function (event) {
            return _this.getDate(new Date(event.startDate)) < _this.getDate(new Date());
        });
        events.sort(function (a, b) {
            return _this.getDate(new Date(b.startDate)) -
                _this.getDate(new Date(a.startDate));
        });
        return events;
    };
    CalendarComponent.prototype.addEvent = function (event) {
        var _this = this;
        this.eventService.addEvent(event).subscribe(function () {
            _this.getEvents();
            _this.service.showSuccessNotify(null, 'Create event success!');
        }, function (err) {
            _this.service.showErrorNotify(null, 'Unable to add event!');
        });
    };
    CalendarComponent.prototype.getDate = function (dates) {
        this.month = dates.getMonth();
        this.date = dates.getDate();
        if (dates.getMonth() < 10) {
            this.month = '0' + dates.getMonth();
        }
        if (dates.getDate() < 10) {
            this.date = '0' + dates.getDate();
        }
        return (dates.getFullYear().toString() +
            this.month.toString() +
            this.date.toString());
    };
    CalendarComponent.prototype.updateEvent = function (data, id) {
        var _this = this;
        this.eventService.updateEvent(data, id).subscribe(function (event) {
            _this.service.showSuccessNotify('Edit successfully', 'Success!!');
            _this.getEvents();
        }, function (error) {
            _this.service.showErrorNotify("Error " + error.statusText, 'Fail!');
        });
    };
    CalendarComponent.prototype.deleteEvent = function (id) {
        var _this = this;
        this.eventService.deleteEvent(id).subscribe(function () {
            _this.service.showSuccessNotify('Delete Successfully !!', 'Success!!');
            _this.getEvents();
        }, function (error) {
            _this.service.showErrorNotify('Something went wrong!!', 'Fail!!');
        });
    };
    CalendarComponent.prototype.openCreateEvent = function (event) {
        var _this = this;
        if (this.getDate(event.date) < this.getDate(new Date())) {
            this.service.showErrorNotify('End date due to greater than start date', 'Attention');
            return;
        }
        this.modalService
            .open(modal_create_event_component_1.ModalCreateEventComponent, {
            size: 'lg',
            centered: true
        })
            .result.then(function (data) {
            _this.event = {
                title: data.title,
                content: data.content,
                document: data.link,
                speaker: data.speaker,
                timeStart: data.startTime,
                timeEnd: data.duration,
                startDate: event.date.toISOString()
            };
            _this.addEvent(_this.event);
        })
            .catch(function (err) {
            _this.service.showErrorNotify('Error', 'Fail!');
        });
    };
    CalendarComponent.prototype.openEventDetail = function (event) {
        var _this = this;
        event = {
            id: event.event.id,
            title: event.event._def.title,
            content: event.event._def.extendedProps.description,
            document: event.event._def.extendedProps.document,
            speaker: event.event._def.extendedProps.speaker,
            startTime: event.event._def.extendedProps.timeStart,
            endTime: event.event._def.extendedProps.timeEnd
        };
        this.modal.open(modal_edit_event_component_1.ModalEditEventComponent, event).result.then(function (res) {
            if (res.action === modal_edit_event_component_1.ACTION.update) {
                _this.updateEvent(res.data, event.id);
            }
            else if (res.action === modal_edit_event_component_1.ACTION.delete) {
                if (confirm('Are you sure to delete!')) {
                    _this.deleteEvent(event.id);
                }
                else {
                    return false;
                }
            }
        }, function (dismiss) {
        });
    };
    __decorate([
        core_1.ViewChild('fullcalendar', { static: false }),
        __metadata("design:type", angular_1.FullCalendarComponent)
    ], CalendarComponent.prototype, "fullcalendar", void 0);
    CalendarComponent = __decorate([
        core_1.Component({
            selector: 'app-calendar',
            templateUrl: './calendar.component.html',
            styleUrls: ['./calendar.component.styl']
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal,
            event_service_1.EventService,
            common_service_1.CommonService,
            modal_service_1.ModalService])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map