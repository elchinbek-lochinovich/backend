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
exports.CalcAnalyticsDto = void 0;
var class_validator_1 = require("class-validator");
var CalcAnalyticsDto = function () {
    var _a;
    var _studentUserId_decorators;
    var _studentUserId_initializers = [];
    var _studentUserId_extraInitializers = [];
    var _fromDate_decorators;
    var _fromDate_initializers = [];
    var _fromDate_extraInitializers = [];
    var _toDate_decorators;
    var _toDate_initializers = [];
    var _toDate_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CalcAnalyticsDto() {
                this.studentUserId = __runInitializers(this, _studentUserId_initializers, void 0);
                this.fromDate = (__runInitializers(this, _studentUserId_extraInitializers), __runInitializers(this, _fromDate_initializers, void 0)); // "2025-12-01"
                this.toDate = (__runInitializers(this, _fromDate_extraInitializers), __runInitializers(this, _toDate_initializers, void 0)); // "2025-12-31"
                __runInitializers(this, _toDate_extraInitializers);
            }
            return CalcAnalyticsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _studentUserId_decorators = [(0, class_validator_1.IsInt)()];
            _fromDate_decorators = [(0, class_validator_1.IsDateString)()];
            _toDate_decorators = [(0, class_validator_1.IsDateString)()];
            __esDecorate(null, null, _studentUserId_decorators, { kind: "field", name: "studentUserId", static: false, private: false, access: { has: function (obj) { return "studentUserId" in obj; }, get: function (obj) { return obj.studentUserId; }, set: function (obj, value) { obj.studentUserId = value; } }, metadata: _metadata }, _studentUserId_initializers, _studentUserId_extraInitializers);
            __esDecorate(null, null, _fromDate_decorators, { kind: "field", name: "fromDate", static: false, private: false, access: { has: function (obj) { return "fromDate" in obj; }, get: function (obj) { return obj.fromDate; }, set: function (obj, value) { obj.fromDate = value; } }, metadata: _metadata }, _fromDate_initializers, _fromDate_extraInitializers);
            __esDecorate(null, null, _toDate_decorators, { kind: "field", name: "toDate", static: false, private: false, access: { has: function (obj) { return "toDate" in obj; }, get: function (obj) { return obj.toDate; }, set: function (obj, value) { obj.toDate = value; } }, metadata: _metadata }, _toDate_initializers, _toDate_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CalcAnalyticsDto = CalcAnalyticsDto;
