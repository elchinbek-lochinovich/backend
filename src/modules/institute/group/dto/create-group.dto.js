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
exports.CreateGroupDto = void 0;
var class_validator_1 = require("class-validator");
var CreateGroupDto = function () {
    var _a;
    var _departmentId_decorators;
    var _departmentId_initializers = [];
    var _departmentId_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _course_decorators;
    var _course_initializers = [];
    var _course_extraInitializers = [];
    var _year_decorators;
    var _year_initializers = [];
    var _year_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateGroupDto() {
                this.departmentId = __runInitializers(this, _departmentId_initializers, void 0);
                this.name = (__runInitializers(this, _departmentId_extraInitializers), __runInitializers(this, _name_initializers, void 0));
                this.course = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _course_initializers, void 0));
                this.year = (__runInitializers(this, _course_extraInitializers), __runInitializers(this, _year_initializers, void 0));
                __runInitializers(this, _year_extraInitializers);
            }
            return CreateGroupDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _departmentId_decorators = [(0, class_validator_1.IsInt)()];
            _name_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.MaxLength)(50)];
            _course_decorators = [(0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(6)];
            _year_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)()];
            __esDecorate(null, null, _departmentId_decorators, { kind: "field", name: "departmentId", static: false, private: false, access: { has: function (obj) { return "departmentId" in obj; }, get: function (obj) { return obj.departmentId; }, set: function (obj, value) { obj.departmentId = value; } }, metadata: _metadata }, _departmentId_initializers, _departmentId_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _course_decorators, { kind: "field", name: "course", static: false, private: false, access: { has: function (obj) { return "course" in obj; }, get: function (obj) { return obj.course; }, set: function (obj, value) { obj.course = value; } }, metadata: _metadata }, _course_initializers, _course_extraInitializers);
            __esDecorate(null, null, _year_decorators, { kind: "field", name: "year", static: false, private: false, access: { has: function (obj) { return "year" in obj; }, get: function (obj) { return obj.year; }, set: function (obj, value) { obj.year = value; } }, metadata: _metadata }, _year_initializers, _year_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateGroupDto = CreateGroupDto;
