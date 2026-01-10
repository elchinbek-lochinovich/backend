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
exports.CreateAssignmentDto = void 0;
var class_validator_1 = require("class-validator");
var CreateAssignmentDto = function () {
    var _a;
    var _subjectId_decorators;
    var _subjectId_initializers = [];
    var _subjectId_extraInitializers = [];
    var _groupId_decorators;
    var _groupId_initializers = [];
    var _groupId_extraInitializers = [];
    var _teacherUserId_decorators;
    var _teacherUserId_initializers = [];
    var _teacherUserId_extraInitializers = [];
    var _academicYear_decorators;
    var _academicYear_initializers = [];
    var _academicYear_extraInitializers = [];
    var _semester_decorators;
    var _semester_initializers = [];
    var _semester_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateAssignmentDto() {
                this.subjectId = __runInitializers(this, _subjectId_initializers, void 0);
                this.groupId = (__runInitializers(this, _subjectId_extraInitializers), __runInitializers(this, _groupId_initializers, void 0));
                this.teacherUserId = (__runInitializers(this, _groupId_extraInitializers), __runInitializers(this, _teacherUserId_initializers, void 0));
                this.academicYear = (__runInitializers(this, _teacherUserId_extraInitializers), __runInitializers(this, _academicYear_initializers, void 0));
                this.semester = (__runInitializers(this, _academicYear_extraInitializers), __runInitializers(this, _semester_initializers, void 0));
                __runInitializers(this, _semester_extraInitializers);
            }
            return CreateAssignmentDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _subjectId_decorators = [(0, class_validator_1.IsInt)()];
            _groupId_decorators = [(0, class_validator_1.IsInt)()];
            _teacherUserId_decorators = [(0, class_validator_1.IsInt)()];
            _academicYear_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)()];
            _semester_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(2)];
            __esDecorate(null, null, _subjectId_decorators, { kind: "field", name: "subjectId", static: false, private: false, access: { has: function (obj) { return "subjectId" in obj; }, get: function (obj) { return obj.subjectId; }, set: function (obj, value) { obj.subjectId = value; } }, metadata: _metadata }, _subjectId_initializers, _subjectId_extraInitializers);
            __esDecorate(null, null, _groupId_decorators, { kind: "field", name: "groupId", static: false, private: false, access: { has: function (obj) { return "groupId" in obj; }, get: function (obj) { return obj.groupId; }, set: function (obj, value) { obj.groupId = value; } }, metadata: _metadata }, _groupId_initializers, _groupId_extraInitializers);
            __esDecorate(null, null, _teacherUserId_decorators, { kind: "field", name: "teacherUserId", static: false, private: false, access: { has: function (obj) { return "teacherUserId" in obj; }, get: function (obj) { return obj.teacherUserId; }, set: function (obj, value) { obj.teacherUserId = value; } }, metadata: _metadata }, _teacherUserId_initializers, _teacherUserId_extraInitializers);
            __esDecorate(null, null, _academicYear_decorators, { kind: "field", name: "academicYear", static: false, private: false, access: { has: function (obj) { return "academicYear" in obj; }, get: function (obj) { return obj.academicYear; }, set: function (obj, value) { obj.academicYear = value; } }, metadata: _metadata }, _academicYear_initializers, _academicYear_extraInitializers);
            __esDecorate(null, null, _semester_decorators, { kind: "field", name: "semester", static: false, private: false, access: { has: function (obj) { return "semester" in obj; }, get: function (obj) { return obj.semester; }, set: function (obj, value) { obj.semester = value; } }, metadata: _metadata }, _semester_initializers, _semester_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateAssignmentDto = CreateAssignmentDto;
