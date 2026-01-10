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
exports.InstituteModule = void 0;
var common_1 = require("@nestjs/common");
var prisma_module_1 = require("../../../../../../../src/prisma/prisma.module");
var faculty_controller_1 = require("./faculty/faculty.controller");
var faculty_service_1 = require("./faculty/faculty.service");
var department_controller_1 = require("./department/department.controller");
var department_service_1 = require("./department/department.service");
var group_controller_1 = require("./group/group.controller");
var group_service_1 = require("./group/group.service");
var subject_controller_1 = require("./subject/subject.controller");
var subject_service_1 = require("./subject/subject.service");
var assignment_controller_1 = require("./assignment/assignment.controller");
var assignment_service_1 = require("./assignment/assignment.service");
var schedule_controller_1 = require("./schedule/schedule.controller");
var schedule_service_1 = require("./schedule/schedule.service");
var InstituteModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [prisma_module_1.PrismaModule],
            controllers: [
                faculty_controller_1.FacultyController,
                department_controller_1.DepartmentController,
                group_controller_1.GroupController,
                subject_controller_1.SubjectController,
                assignment_controller_1.AssignmentController,
                schedule_controller_1.ScheduleController,
            ],
            providers: [
                faculty_service_1.FacultyService,
                department_service_1.DepartmentService,
                group_service_1.GroupService,
                subject_service_1.SubjectService,
                assignment_service_1.AssignmentService,
                schedule_service_1.ScheduleService,
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var InstituteModule = _classThis = /** @class */ (function () {
        function InstituteModule_1() {
        }
        return InstituteModule_1;
    }());
    __setFunctionName(_classThis, "InstituteModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InstituteModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InstituteModule = _classThis;
}();
exports.InstituteModule = InstituteModule;
