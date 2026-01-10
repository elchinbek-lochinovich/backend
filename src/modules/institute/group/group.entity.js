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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupEntity = void 0;
var typeorm_1 = require("typeorm");
var department_entity_1 = require("../department/department.entity");
var GroupEntity = function () {
    var _classDecorators = [(0, typeorm_1.Entity)('groups'), (0, typeorm_1.Index)(['departmentId', 'name'], { unique: true })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _departmentId_decorators;
    var _departmentId_initializers = [];
    var _departmentId_extraInitializers = [];
    var _department_decorators;
    var _department_initializers = [];
    var _department_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _course_decorators;
    var _course_initializers = [];
    var _course_extraInitializers = [];
    var _year_decorators;
    var _year_initializers = [];
    var _year_extraInitializers = [];
    var _createdAt_decorators;
    var _createdAt_initializers = [];
    var _createdAt_extraInitializers = [];
    var _updatedAt_decorators;
    var _updatedAt_initializers = [];
    var _updatedAt_extraInitializers = [];
    var GroupEntity = _classThis = /** @class */ (function () {
        function GroupEntity_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.departmentId = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _departmentId_initializers, void 0));
            this.department = (__runInitializers(this, _departmentId_extraInitializers), __runInitializers(this, _department_initializers, void 0));
            this.name = (__runInitializers(this, _department_extraInitializers), __runInitializers(this, _name_initializers, void 0)); // 23-IT-1
            this.course = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _course_initializers, void 0)); // 1..6
            this.year = (__runInitializers(this, _course_extraInitializers), __runInitializers(this, _year_initializers, void 0));
            this.createdAt = (__runInitializers(this, _year_extraInitializers), __runInitializers(this, _createdAt_initializers, void 0));
            this.updatedAt = (__runInitializers(this, _createdAt_extraInitializers), __runInitializers(this, _updatedAt_initializers, void 0));
            __runInitializers(this, _updatedAt_extraInitializers);
        }
        return GroupEntity_1;
    }());
    __setFunctionName(_classThis, "GroupEntity");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _departmentId_decorators = [(0, typeorm_1.Column)()];
        _department_decorators = [(0, typeorm_1.ManyToOne)(function () { return department_entity_1.Department; }, { onDelete: 'CASCADE' }), (0, typeorm_1.JoinColumn)({ name: 'departmentId' })];
        _name_decorators = [(0, typeorm_1.Column)({ type: 'varchar', length: 50 })];
        _course_decorators = [(0, typeorm_1.Column)({ type: 'int' })];
        _year_decorators = [(0, typeorm_1.Column)({ type: 'int', nullable: true })];
        _createdAt_decorators = [(0, typeorm_1.CreateDateColumn)()];
        _updatedAt_decorators = [(0, typeorm_1.UpdateDateColumn)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _departmentId_decorators, { kind: "field", name: "departmentId", static: false, private: false, access: { has: function (obj) { return "departmentId" in obj; }, get: function (obj) { return obj.departmentId; }, set: function (obj, value) { obj.departmentId = value; } }, metadata: _metadata }, _departmentId_initializers, _departmentId_extraInitializers);
        __esDecorate(null, null, _department_decorators, { kind: "field", name: "department", static: false, private: false, access: { has: function (obj) { return "department" in obj; }, get: function (obj) { return obj.department; }, set: function (obj, value) { obj.department = value; } }, metadata: _metadata }, _department_initializers, _department_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _course_decorators, { kind: "field", name: "course", static: false, private: false, access: { has: function (obj) { return "course" in obj; }, get: function (obj) { return obj.course; }, set: function (obj, value) { obj.course = value; } }, metadata: _metadata }, _course_initializers, _course_extraInitializers);
        __esDecorate(null, null, _year_decorators, { kind: "field", name: "year", static: false, private: false, access: { has: function (obj) { return "year" in obj; }, get: function (obj) { return obj.year; }, set: function (obj, value) { obj.year = value; } }, metadata: _metadata }, _year_initializers, _year_extraInitializers);
        __esDecorate(null, null, _createdAt_decorators, { kind: "field", name: "createdAt", static: false, private: false, access: { has: function (obj) { return "createdAt" in obj; }, get: function (obj) { return obj.createdAt; }, set: function (obj, value) { obj.createdAt = value; } }, metadata: _metadata }, _createdAt_initializers, _createdAt_extraInitializers);
        __esDecorate(null, null, _updatedAt_decorators, { kind: "field", name: "updatedAt", static: false, private: false, access: { has: function (obj) { return "updatedAt" in obj; }, get: function (obj) { return obj.updatedAt; }, set: function (obj, value) { obj.updatedAt = value; } }, metadata: _metadata }, _updatedAt_initializers, _updatedAt_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GroupEntity = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GroupEntity = _classThis;
}();
exports.GroupEntity = GroupEntity;
