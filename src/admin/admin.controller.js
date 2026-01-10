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
exports.AdminController = void 0;
var common_1 = require("@nestjs/common");
var jwt_guard_1 = require("../auth/jwt.guard");
var roles_guard_1 = require("../auth/roles.guard");
var AdminController = function () {
    var _classDecorators = [(0, common_1.Controller)('admin'), (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard), (0, roles_guard_1.Roles)('RECTOR')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _stats_decorators;
    var _listUsers_decorators;
    var _createUser_decorators;
    var _backfillProfiles_decorators;
    var _assignStudentGroup_decorators;
    var _assignTeacherDepartment_decorators;
    var AdminController = _classThis = /** @class */ (function () {
        function AdminController_1(admin) {
            this.admin = (__runInitializers(this, _instanceExtraInitializers), admin);
        }
        AdminController_1.prototype.stats = function () {
            return { ok: true, message: 'Hello Rector 👑' };
        };
        AdminController_1.prototype.listUsers = function () {
            return this.admin.listUsers();
        };
        AdminController_1.prototype.createUser = function (body) {
            return this.admin.createUser(body);
        };
        AdminController_1.prototype.backfillProfiles = function () {
            return this.admin.backfillProfiles();
        };
        AdminController_1.prototype.assignStudentGroup = function (userId, dto) {
            return this.admin.assignStudentToGroup(userId, dto.groupId);
        };
        AdminController_1.prototype.assignTeacherDepartment = function (userId, dto) {
            return this.admin.assignTeacherToDepartment(userId, dto.departmentId);
        };
        return AdminController_1;
    }());
    __setFunctionName(_classThis, "AdminController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _stats_decorators = [(0, common_1.Get)('stats')];
        _listUsers_decorators = [(0, common_1.Get)('users')];
        _createUser_decorators = [(0, common_1.Post)('users')];
        _backfillProfiles_decorators = [(0, common_1.Post)('backfill-profiles')];
        _assignStudentGroup_decorators = [(0, common_1.Patch)('students/:userId/group')];
        _assignTeacherDepartment_decorators = [(0, common_1.Patch)('teachers/:userId/department')];
        __esDecorate(_classThis, null, _stats_decorators, { kind: "method", name: "stats", static: false, private: false, access: { has: function (obj) { return "stats" in obj; }, get: function (obj) { return obj.stats; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _listUsers_decorators, { kind: "method", name: "listUsers", static: false, private: false, access: { has: function (obj) { return "listUsers" in obj; }, get: function (obj) { return obj.listUsers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createUser_decorators, { kind: "method", name: "createUser", static: false, private: false, access: { has: function (obj) { return "createUser" in obj; }, get: function (obj) { return obj.createUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _backfillProfiles_decorators, { kind: "method", name: "backfillProfiles", static: false, private: false, access: { has: function (obj) { return "backfillProfiles" in obj; }, get: function (obj) { return obj.backfillProfiles; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _assignStudentGroup_decorators, { kind: "method", name: "assignStudentGroup", static: false, private: false, access: { has: function (obj) { return "assignStudentGroup" in obj; }, get: function (obj) { return obj.assignStudentGroup; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _assignTeacherDepartment_decorators, { kind: "method", name: "assignTeacherDepartment", static: false, private: false, access: { has: function (obj) { return "assignTeacherDepartment" in obj; }, get: function (obj) { return obj.assignTeacherDepartment; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminController = _classThis;
}();
exports.AdminController = AdminController;
