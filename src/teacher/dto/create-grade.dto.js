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
exports.CreateGradeDto = void 0;
var class_validator_1 = require("class-validator");
var CreateGradeDto = function () {
    var _a;
    var _assignmentId_decorators;
    var _assignmentId_initializers = [];
    var _assignmentId_extraInitializers = [];
    var _studentUserId_decorators;
    var _studentUserId_initializers = [];
    var _studentUserId_extraInitializers = [];
    var _kind_decorators;
    var _kind_initializers = [];
    var _kind_extraInitializers = [];
    var _score_decorators;
    var _score_initializers = [];
    var _score_extraInitializers = [];
    var _maxScore_decorators;
    var _maxScore_initializers = [];
    var _maxScore_extraInitializers = [];
    var _note_decorators;
    var _note_initializers = [];
    var _note_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateGradeDto() {
                this.assignmentId = __runInitializers(this, _assignmentId_initializers, void 0);
                this.studentUserId = (__runInitializers(this, _assignmentId_extraInitializers), __runInitializers(this, _studentUserId_initializers, void 0));
                this.kind = (__runInitializers(this, _studentUserId_extraInitializers), __runInitializers(this, _kind_initializers, void 0)); // "quiz" | "midterm" | ...
                this.score = (__runInitializers(this, _kind_extraInitializers), __runInitializers(this, _score_initializers, void 0));
                this.maxScore = (__runInitializers(this, _score_extraInitializers), __runInitializers(this, _maxScore_initializers, void 0));
                this.note = (__runInitializers(this, _maxScore_extraInitializers), __runInitializers(this, _note_initializers, void 0));
                __runInitializers(this, _note_extraInitializers);
            }
            return CreateGradeDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _assignmentId_decorators = [(0, class_validator_1.IsInt)()];
            _studentUserId_decorators = [(0, class_validator_1.IsInt)()];
            _kind_decorators = [(0, class_validator_1.IsString)()];
            _score_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _maxScore_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1)];
            _note_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _assignmentId_decorators, { kind: "field", name: "assignmentId", static: false, private: false, access: { has: function (obj) { return "assignmentId" in obj; }, get: function (obj) { return obj.assignmentId; }, set: function (obj, value) { obj.assignmentId = value; } }, metadata: _metadata }, _assignmentId_initializers, _assignmentId_extraInitializers);
            __esDecorate(null, null, _studentUserId_decorators, { kind: "field", name: "studentUserId", static: false, private: false, access: { has: function (obj) { return "studentUserId" in obj; }, get: function (obj) { return obj.studentUserId; }, set: function (obj, value) { obj.studentUserId = value; } }, metadata: _metadata }, _studentUserId_initializers, _studentUserId_extraInitializers);
            __esDecorate(null, null, _kind_decorators, { kind: "field", name: "kind", static: false, private: false, access: { has: function (obj) { return "kind" in obj; }, get: function (obj) { return obj.kind; }, set: function (obj, value) { obj.kind = value; } }, metadata: _metadata }, _kind_initializers, _kind_extraInitializers);
            __esDecorate(null, null, _score_decorators, { kind: "field", name: "score", static: false, private: false, access: { has: function (obj) { return "score" in obj; }, get: function (obj) { return obj.score; }, set: function (obj, value) { obj.score = value; } }, metadata: _metadata }, _score_initializers, _score_extraInitializers);
            __esDecorate(null, null, _maxScore_decorators, { kind: "field", name: "maxScore", static: false, private: false, access: { has: function (obj) { return "maxScore" in obj; }, get: function (obj) { return obj.maxScore; }, set: function (obj, value) { obj.maxScore = value; } }, metadata: _metadata }, _maxScore_initializers, _maxScore_extraInitializers);
            __esDecorate(null, null, _note_decorators, { kind: "field", name: "note", static: false, private: false, access: { has: function (obj) { return "note" in obj; }, get: function (obj) { return obj.note; }, set: function (obj, value) { obj.note = value; } }, metadata: _metadata }, _note_initializers, _note_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateGradeDto = CreateGradeDto;
