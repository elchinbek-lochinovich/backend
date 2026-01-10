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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsController = void 0;
var common_1 = require("@nestjs/common");
var jwt_guard_1 = require("../../../../../../../src/auth/jwt.guard");
var roles_guard_1 = require("../../../../../../../src/auth/roles.guard");
var swagger_1 = require("@nestjs/swagger");
var AnalyticsController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Analytics'), (0, swagger_1.ApiBearerAuth)(), (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, roles_guard_1.RolesGuard), (0, common_1.Controller)('analytics')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _calcStudentAnalytics_decorators;
    var _getStudentPrompt_decorators;
    var _getGroupAnalytics_decorators;
    var _groupSummary_decorators;
    var AnalyticsController = _classThis = /** @class */ (function () {
        function AnalyticsController_1(analyticsService) {
            this.analyticsService = (__runInitializers(this, _instanceExtraInitializers), analyticsService);
        }
        /* ================= STUDENT MANUAL CALC ================= */
        AnalyticsController_1.prototype.calcStudentAnalytics = function (studentUserId, fromDate, toDate) {
            return __awaiter(this, void 0, void 0, function () {
                var from, to, todayEnd, clamped, rec;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            from = new Date("".concat(fromDate, "T00:00:00.000Z"));
                            to = new Date("".concat(toDate, "T23:59:59.999Z"));
                            if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
                                throw new common_1.BadRequestException('Invalid date');
                            }
                            if (from > to) {
                                throw new common_1.BadRequestException('fromDate must be <= toDate');
                            }
                            todayEnd = new Date();
                            todayEnd.setHours(23, 59, 59, 999);
                            clamped = false;
                            if (to > todayEnd) {
                                to.setTime(todayEnd.getTime());
                                clamped = true;
                            }
                            return [4 /*yield*/, this.analyticsService.calcAndSave(studentUserId, from, to)];
                        case 1:
                            rec = _a.sent();
                            return [2 /*return*/, {
                                    meta: { studentUserId: studentUserId, fromDate: from.toISOString(), toDate: to.toISOString(), clampedToToday: clamped },
                                    data: rec,
                                }];
                    }
                });
            });
        };
        /* ================= STUDENT PROMPT ================= */
        AnalyticsController_1.prototype.getStudentPrompt = function (studentUserIdRaw, weeksRaw, req) {
            return __awaiter(this, void 0, void 0, function () {
                var role, selfId, studentUserId, weeks;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    if (!req.user)
                        throw new common_1.UnauthorizedException('Missing or invalid token');
                    role = String((_a = req.user.role) !== null && _a !== void 0 ? _a : '').toUpperCase();
                    selfId = Number((_c = (_b = req.user.sub) !== null && _b !== void 0 ? _b : req.user.id) !== null && _c !== void 0 ? _c : req.user.userId);
                    studentUserId = role === 'STUDENT' ? selfId : Number(studentUserIdRaw);
                    if (role !== 'STUDENT' && (!studentUserIdRaw || Number.isNaN(studentUserId))) {
                        throw new common_1.BadRequestException('studentUserId is required');
                    }
                    weeks = weeksRaw ? Number(weeksRaw) : 8;
                    if (!Number.isFinite(weeks) || weeks < 1 || weeks > 52) {
                        throw new common_1.BadRequestException('weeks must be between 1 and 52');
                    }
                    return [2 /*return*/, this.analyticsService.buildStudentPromptPayload(studentUserId, weeks, role)];
                });
            });
        };
        /* ================= GROUP DASHBOARD ================= */
        AnalyticsController_1.prototype.getGroupAnalytics = function (groupId, fromDate, toDate) {
            return __awaiter(this, void 0, void 0, function () {
                var data, from_1, to_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.analyticsService.getGroupDashboard(groupId)];
                        case 1:
                            data = _a.sent();
                            if (!(fromDate && toDate)) return [3 /*break*/, 3];
                            from_1 = new Date("".concat(fromDate, "T00:00:00.000Z"));
                            to_1 = new Date("".concat(toDate, "T23:59:59.999Z"));
                            return [4 /*yield*/, Promise.all(data.map(function (x) { return __awaiter(_this, void 0, void 0, function () {
                                    var rec;
                                    var _a, _b;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0: return [4 /*yield*/, this.analyticsService.getStudentForPeriod(x.studentUserId, from_1, to_1)];
                                            case 1:
                                                rec = _c.sent();
                                                return [2 /*return*/, {
                                                        studentUserId: x.studentUserId,
                                                        latest: rec
                                                            ? {
                                                                attendanceRate: Number(rec.attendanceRate.toFixed(2)),
                                                                avgScore: rec.avgScore == null ? null : Number(rec.avgScore.toFixed(1)),
                                                                riskScore: Number(rec.riskScore.toFixed(2)),
                                                                riskBand: rec.riskScore >= 0.7
                                                                    ? 'HIGH'
                                                                    : rec.riskScore >= 0.3
                                                                        ? 'MEDIUM'
                                                                        : 'LOW',
                                                                flags: Array.from(new Set(((_b = (_a = rec.insights) === null || _a === void 0 ? void 0 : _a.flags) !== null && _b !== void 0 ? _b : []))),
                                                            }
                                                            : null,
                                                    }];
                                        }
                                    });
                                }); }))];
                        case 2:
                            data = _a.sent();
                            _a.label = 3;
                        case 3:
                            data.sort(function (a, b) { var _a, _b, _c, _d; return ((_b = (_a = b.latest) === null || _a === void 0 ? void 0 : _a.riskScore) !== null && _b !== void 0 ? _b : -1) - ((_d = (_c = a.latest) === null || _c === void 0 ? void 0 : _c.riskScore) !== null && _d !== void 0 ? _d : -1); });
                            return [2 /*return*/, { groupId: groupId, data: data }];
                    }
                });
            });
        };
        AnalyticsController_1.prototype.groupSummary = function (groupId, req) {
            return __awaiter(this, void 0, void 0, function () {
                var role;
                var _a, _b;
                return __generator(this, function (_c) {
                    role = String((_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== null && _b !== void 0 ? _b : '').toUpperCase();
                    return [2 /*return*/, this.analyticsService.buildGroupSummaryPayload(groupId, role)];
                });
            });
        };
        return AnalyticsController_1;
    }());
    __setFunctionName(_classThis, "AnalyticsController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _calcStudentAnalytics_decorators = [(0, roles_guard_1.Roles)('TEACHER', 'RECTOR'), (0, common_1.Post)('student')];
        _getStudentPrompt_decorators = [(0, swagger_1.ApiOperation)({ summary: 'LLM-ready prompt payload' }), (0, swagger_1.ApiQuery)({ name: 'studentUserId', required: false, type: Number }), (0, swagger_1.ApiQuery)({ name: 'weeks', required: false, type: Number, example: 8 }), (0, common_1.Get)('student/prompt')];
        _getGroupAnalytics_decorators = [(0, roles_guard_1.Roles)('TEACHER', 'RECTOR'), (0, common_1.Get)('group')];
        _groupSummary_decorators = [(0, roles_guard_1.Roles)('TEACHER', 'RECTOR'), (0, common_1.Get)('group/summary')];
        __esDecorate(_classThis, null, _calcStudentAnalytics_decorators, { kind: "method", name: "calcStudentAnalytics", static: false, private: false, access: { has: function (obj) { return "calcStudentAnalytics" in obj; }, get: function (obj) { return obj.calcStudentAnalytics; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getStudentPrompt_decorators, { kind: "method", name: "getStudentPrompt", static: false, private: false, access: { has: function (obj) { return "getStudentPrompt" in obj; }, get: function (obj) { return obj.getStudentPrompt; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getGroupAnalytics_decorators, { kind: "method", name: "getGroupAnalytics", static: false, private: false, access: { has: function (obj) { return "getGroupAnalytics" in obj; }, get: function (obj) { return obj.getGroupAnalytics; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _groupSummary_decorators, { kind: "method", name: "groupSummary", static: false, private: false, access: { has: function (obj) { return "groupSummary" in obj; }, get: function (obj) { return obj.groupSummary; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AnalyticsController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AnalyticsController = _classThis;
}();
exports.AnalyticsController = AnalyticsController;
