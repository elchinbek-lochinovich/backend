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
exports.StudentController = void 0;
var common_1 = require("@nestjs/common");
var jwt_guard_1 = require("../auth/jwt.guard");
var StudentController = function () {
    var _classDecorators = [(0, common_1.Controller)('student'), (0, common_1.UseGuards)(jwt_guard_1.JwtGuard)];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _me_decorators;
    var _assignments_decorators;
    var _attendance_decorators;
    var _grades_decorators;
    var StudentController = _classThis = /** @class */ (function () {
        function StudentController_1(studentService) {
            this.studentService = (__runInitializers(this, _instanceExtraInitializers), studentService);
        }
        StudentController_1.prototype.me = function (req) {
            var _a, _b, _c;
            var userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub) !== null && _b !== void 0 ? _b : (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
            if (!userId)
                throw new common_1.UnauthorizedException('No user in token');
            // Sening serviceng qanday nomlangan bo'lsa, shu qoladi.
            // Odatda: getMe(userId) yoki me(userId)
            return this.studentService.getMe(userId);
        };
        StudentController_1.prototype.assignments = function (req) {
            var _a, _b, _c;
            var userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub) !== null && _b !== void 0 ? _b : (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
            if (!userId)
                throw new common_1.UnauthorizedException('No user in token');
            return this.studentService.myAssignments(userId);
        };
        StudentController_1.prototype.attendance = function (req, from, to) {
            var _a, _b, _c;
            var userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub) !== null && _b !== void 0 ? _b : (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
            if (!userId)
                throw new common_1.UnauthorizedException('No user in token');
            return this.studentService.myAttendance(userId, from, to);
        };
        StudentController_1.prototype.grades = function (req, assignmentId) {
            var _a, _b, _c;
            var userId = (_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub) !== null && _b !== void 0 ? _b : (_c = req.user) === null || _c === void 0 ? void 0 : _c.id;
            if (!userId)
                throw new common_1.UnauthorizedException('No user in token');
            return this.studentService.myGrades(userId, assignmentId ? Number(assignmentId) : undefined);
        };
        return StudentController_1;
    }());
    __setFunctionName(_classThis, "StudentController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _me_decorators = [(0, common_1.Get)('me')];
        _assignments_decorators = [(0, common_1.Get)('assignments')];
        _attendance_decorators = [(0, common_1.Get)('attendance'), (0, common_1.UseGuards)(jwt_guard_1.JwtGuard)];
        _grades_decorators = [(0, common_1.Get)('grades'), (0, common_1.UseGuards)(jwt_guard_1.JwtGuard)];
        __esDecorate(_classThis, null, _me_decorators, { kind: "method", name: "me", static: false, private: false, access: { has: function (obj) { return "me" in obj; }, get: function (obj) { return obj.me; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _assignments_decorators, { kind: "method", name: "assignments", static: false, private: false, access: { has: function (obj) { return "assignments" in obj; }, get: function (obj) { return obj.assignments; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _attendance_decorators, { kind: "method", name: "attendance", static: false, private: false, access: { has: function (obj) { return "attendance" in obj; }, get: function (obj) { return obj.attendance; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _grades_decorators, { kind: "method", name: "grades", static: false, private: false, access: { has: function (obj) { return "grades" in obj; }, get: function (obj) { return obj.grades; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StudentController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StudentController = _classThis;
}();
exports.StudentController = StudentController;
