"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherController = void 0;
var common_1 = require("@nestjs/common");
var jwt_guard_1 = require("../auth/jwt.guard");
var TeacherController = function () {
    var _classDecorators = [(0, common_1.Controller)('teacher'), (0, common_1.UseGuards)(jwt_guard_1.JwtGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _me_decorators;
    var _assignments_decorators;
    var _markAttendance_decorators;
    var _attendanceList_decorators;
    var _createGrade_decorators;
    var _gradeList_decorators;
    var TeacherController = _classThis = /** @class */ (function () {
        function TeacherController_1(teacherService) {
            this.teacherService = (__runInitializers(this, _instanceExtraInitializers), teacherService);
        }
        TeacherController_1.prototype.me = function (req) {
            var _a, _b, _c;
            var userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub) !== null && _b !== void 0 ? _b : (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
            if (!userId)
                throw new common_1.UnauthorizedException('No user in token');
            return this.teacherService.getMe(userId);
        };
        TeacherController_1.prototype.assignments = function (req) {
            var _a, _b, _c;
            var userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub) !== null && _b !== void 0 ? _b : (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
            if (!userId)
                throw new common_1.UnauthorizedException('No user in token');
            return this.teacherService.myAssignments(userId);
        };
        TeacherController_1.prototype.markAttendance = function (req, dto) {
            var _a, _b, _c;
            var userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub) !== null && _b !== void 0 ? _b : (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
            if (!userId)
                throw new common_1.UnauthorizedException('No user in token');
            return this.teacherService.markAttendance(userId, dto);
        };
        TeacherController_1.prototype.attendanceList = function (req, scheduleId, date) {
            var _a, _b, _c;
            var userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub) !== null && _b !== void 0 ? _b : (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
            if (!userId)
                throw new common_1.UnauthorizedException('No user in token');
            if (!scheduleId)
                throw new common_1.UnauthorizedException('scheduleId is required');
            return this.teacherService.attendanceList(userId, Number(scheduleId), date);
        };
        TeacherController_1.prototype.createGrade = function (req, dto) {
            var _a, _b, _c;
            var userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub) !== null && _b !== void 0 ? _b : (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
            if (!userId)
                throw new common_1.UnauthorizedException('No user in token');
            return this.teacherService.createGrade(userId, dto);
        };
        TeacherController_1.prototype.gradeList = function (req, assignmentId, studentUserId) {
            var _a, _b, _c;
            var userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub) !== null && _b !== void 0 ? _b : (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
            if (!userId)
                throw new common_1.UnauthorizedException('No user in token');
            if (!assignmentId)
                throw new common_1.UnauthorizedException('assignmentId is required');
            return this.teacherService.gradeList(userId, Number(assignmentId), studentUserId ? Number(studentUserId) : undefined);
        };
        return TeacherController_1;
    }());
    __setFunctionName(_classThis, "TeacherController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _me_decorators = [(0, common_1.Get)('me')];
        _assignments_decorators = [(0, common_1.Get)('assignments')];
        _markAttendance_decorators = [(0, common_1.Post)('attendance')];
        _attendanceList_decorators = [(0, common_1.Get)('attendance')];
        _createGrade_decorators = [(0, common_1.Post)('grades')];
        _gradeList_decorators = [(0, common_1.Get)('grades')];
        __esDecorate(_classThis, null, _me_decorators, { kind: "method", name: "me", static: false, private: false, access: { has: function (obj) { return "me" in obj; }, get: function (obj) { return obj.me; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _assignments_decorators, { kind: "method", name: "assignments", static: false, private: false, access: { has: function (obj) { return "assignments" in obj; }, get: function (obj) { return obj.assignments; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _markAttendance_decorators, { kind: "method", name: "markAttendance", static: false, private: false, access: { has: function (obj) { return "markAttendance" in obj; }, get: function (obj) { return obj.markAttendance; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _attendanceList_decorators, { kind: "method", name: "attendanceList", static: false, private: false, access: { has: function (obj) { return "attendanceList" in obj; }, get: function (obj) { return obj.attendanceList; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createGrade_decorators, { kind: "method", name: "createGrade", static: false, private: false, access: { has: function (obj) { return "createGrade" in obj; }, get: function (obj) { return obj.createGrade; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _gradeList_decorators, { kind: "method", name: "gradeList", static: false, private: false, access: { has: function (obj) { return "gradeList" in obj; }, get: function (obj) { return obj.gradeList; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TeacherController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TeacherController = _classThis;
}();
exports.TeacherController = TeacherController;
