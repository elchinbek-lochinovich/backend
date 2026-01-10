"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkAttendanceDto = void 0;
var client_1 = require("@prisma/client");
var class_validator_1 = require("class-validator");
var MarkAttendanceDto = function () {
    var _a;
    var _scheduleId_decorators;
    var _scheduleId_initializers = [];
    var _scheduleId_extraInitializers = [];
    var _studentUserId_decorators;
    var _studentUserId_initializers = [];
    var _studentUserId_extraInitializers = [];
    var _date_decorators;
    var _date_initializers = [];
    var _date_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _note_decorators;
    var _note_initializers = [];
    var _note_extraInitializers = [];
    return _a = /** @class */ (function () {
            function MarkAttendanceDto() {
                this.scheduleId = __runInitializers(this, _scheduleId_initializers, void 0);
                this.studentUserId = (__runInitializers(this, _scheduleId_extraInitializers), __runInitializers(this, _studentUserId_initializers, void 0));
                this.date = (__runInitializers(this, _studentUserId_extraInitializers), __runInitializers(this, _date_initializers, void 0)); // "2025-12-28" yoki "2025-12-28T00:00:00.000Z"
                this.status = (__runInitializers(this, _date_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.note = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _note_initializers, void 0));
                __runInitializers(this, _note_extraInitializers);
            }
            return MarkAttendanceDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _scheduleId_decorators = [(0, class_validator_1.IsInt)()];
            _studentUserId_decorators = [(0, class_validator_1.IsInt)()];
            _date_decorators = [(0, class_validator_1.IsDateString)()];
            _status_decorators = [(0, class_validator_1.IsEnum)(client_1.AttendanceStatus)];
            _note_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _scheduleId_decorators, { kind: "field", name: "scheduleId", static: false, private: false, access: { has: function (obj) { return "scheduleId" in obj; }, get: function (obj) { return obj.scheduleId; }, set: function (obj, value) { obj.scheduleId = value; } }, metadata: _metadata }, _scheduleId_initializers, _scheduleId_extraInitializers);
            __esDecorate(null, null, _studentUserId_decorators, { kind: "field", name: "studentUserId", static: false, private: false, access: { has: function (obj) { return "studentUserId" in obj; }, get: function (obj) { return obj.studentUserId; }, set: function (obj, value) { obj.studentUserId = value; } }, metadata: _metadata }, _studentUserId_initializers, _studentUserId_extraInitializers);
            __esDecorate(null, null, _date_decorators, { kind: "field", name: "date", static: false, private: false, access: { has: function (obj) { return "date" in obj; }, get: function (obj) { return obj.date; }, set: function (obj, value) { obj.date = value; } }, metadata: _metadata }, _date_initializers, _date_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _note_decorators, { kind: "field", name: "note", static: false, private: false, access: { has: function (obj) { return "note" in obj; }, get: function (obj) { return obj.note; }, set: function (obj, value) { obj.note = value; } }, metadata: _metadata }, _note_initializers, _note_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.MarkAttendanceDto = MarkAttendanceDto;
