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
exports.AdminService = void 0;
var common_1 = require("@nestjs/common");
var common_2 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var client_1 = require("@prisma/client");
var AdminService = function () {
    var _classDecorators = [(0, common_2.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminService = _classThis = /** @class */ (function () {
        function AdminService_1(prisma) {
            this.prisma = prisma;
        }
        AdminService_1.prototype.listUsers = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.user.findMany({
                            select: { id: true, email: true, role: true, createdAt: true },
                            orderBy: { id: 'asc' },
                        })];
                });
            });
        };
        AdminService_1.prototype.createUser = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var email, password, role, exists, passwordHash;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            email = data.email, password = data.password, role = data.role;
                            if (!email || !password || !role) {
                                throw new common_2.BadRequestException('email, password, role are required');
                            }
                            if (!data.fullName) {
                                throw new common_2.BadRequestException('fullName is required');
                            }
                            return [4 /*yield*/, this.prisma.user.findUnique({ where: { email: email } })];
                        case 1:
                            exists = _a.sent();
                            if (exists)
                                throw new common_2.BadRequestException('Email already exists');
                            // Rektor faqat TEACHER yoki STUDENT yarata olsin
                            if (role !== client_1.Role.TEACHER && role !== client_1.Role.STUDENT) {
                                throw new common_2.BadRequestException('Role must be TEACHER or STUDENT');
                            }
                            return [4 /*yield*/, bcrypt.hash(password, 10)];
                        case 2:
                            passwordHash = _a.sent();
                            return [2 /*return*/, this.prisma.$transaction(function (tx) { return __awaiter(_this, void 0, void 0, function () {
                                    var user;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, tx.user.create({
                                                    data: {
                                                        email: email,
                                                        password: passwordHash,
                                                        role: role,
                                                    },
                                                })];
                                            case 1:
                                                user = _a.sent();
                                                if (!(role === client_1.Role.TEACHER)) return [3 /*break*/, 3];
                                                return [4 /*yield*/, tx.teacherProfile.create({
                                                        data: {
                                                            userId: user.id,
                                                            fullName: data.fullName,
                                                            phone: data.phone,
                                                        },
                                                    })];
                                            case 2:
                                                _a.sent();
                                                _a.label = 3;
                                            case 3:
                                                if (!(role === client_1.Role.STUDENT)) return [3 /*break*/, 5];
                                                return [4 /*yield*/, tx.studentProfile.create({
                                                        data: {
                                                            userId: user.id,
                                                            fullName: data.fullName,
                                                            phone: data.phone,
                                                            course: data.course,
                                                        },
                                                    })];
                                            case 4:
                                                _a.sent();
                                                _a.label = 5;
                                            case 5: 
                                            // parolni qaytarmaymiz
                                            return [2 /*return*/, {
                                                    id: user.id,
                                                    email: user.email,
                                                    role: user.role,
                                                    createdAt: user.createdAt,
                                                }];
                                        }
                                    });
                                }); })];
                    }
                });
            });
        };
        // Eski TEACHER/STUDENT userlar uchun profil bo'lmasa yaratib chiqadi
        AdminService_1.prototype.backfillProfiles = function () {
            return __awaiter(this, void 0, void 0, function () {
                var users, created, skipped, _i, users_1, u, exists, exists;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findMany({
                                where: { role: { in: [client_1.Role.TEACHER, client_1.Role.STUDENT] } },
                                select: { id: true, email: true, role: true },
                                orderBy: { id: 'asc' },
                            })];
                        case 1:
                            users = _a.sent();
                            created = [];
                            skipped = [];
                            _i = 0, users_1 = users;
                            _a.label = 2;
                        case 2:
                            if (!(_i < users_1.length)) return [3 /*break*/, 9];
                            u = users_1[_i];
                            if (!(u.role === client_1.Role.TEACHER)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.prisma.teacherProfile.findUnique({
                                    where: { userId: u.id },
                                })];
                        case 3:
                            exists = _a.sent();
                            if (exists) {
                                skipped.push({ userId: u.id, role: u.role });
                                return [3 /*break*/, 8];
                            }
                            return [4 /*yield*/, this.prisma.teacherProfile.create({
                                    data: {
                                        userId: u.id,
                                        fullName: u.email.split('@')[0], // vaqtincha
                                    },
                                })];
                        case 4:
                            _a.sent();
                            created.push({ userId: u.id, role: u.role });
                            _a.label = 5;
                        case 5:
                            if (!(u.role === client_1.Role.STUDENT)) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.prisma.studentProfile.findUnique({
                                    where: { userId: u.id },
                                })];
                        case 6:
                            exists = _a.sent();
                            if (exists) {
                                skipped.push({ userId: u.id, role: u.role });
                                return [3 /*break*/, 8];
                            }
                            return [4 /*yield*/, this.prisma.studentProfile.create({
                                    data: {
                                        userId: u.id,
                                        fullName: u.email.split('@')[0], // vaqtincha
                                    },
                                })];
                        case 7:
                            _a.sent();
                            created.push({ userId: u.id, role: u.role });
                            _a.label = 8;
                        case 8:
                            _i++;
                            return [3 /*break*/, 2];
                        case 9: return [2 /*return*/, { created: created, skipped: skipped }];
                    }
                });
            });
        };
        AdminService_1.prototype.assignStudentToGroup = function (userId, groupId) {
            return __awaiter(this, void 0, void 0, function () {
                var student, group;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.studentProfile.findUnique({
                                where: { userId: userId },
                            })];
                        case 1:
                            student = _a.sent();
                            if (!student)
                                throw new common_1.NotFoundException('Student profile not found');
                            if (!(groupId !== undefined && groupId !== null)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.group.findUnique({
                                    where: { id: groupId },
                                })];
                        case 2:
                            group = _a.sent();
                            if (!group)
                                throw new common_1.NotFoundException('Group not found');
                            _a.label = 3;
                        case 3: return [2 /*return*/, this.prisma.studentProfile.update({
                                where: { userId: userId },
                                data: { groupId: groupId !== null && groupId !== void 0 ? groupId : null },
                            })];
                    }
                });
            });
        };
        AdminService_1.prototype.assignTeacherToDepartment = function (userId, departmentId) {
            return __awaiter(this, void 0, void 0, function () {
                var teacher, dep;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.teacherProfile.findUnique({
                                where: { userId: userId },
                            })];
                        case 1:
                            teacher = _a.sent();
                            if (!teacher)
                                throw new common_1.NotFoundException('Teacher profile not found');
                            if (!(departmentId !== undefined && departmentId !== null)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.prisma.department.findUnique({
                                    where: { id: departmentId },
                                })];
                        case 2:
                            dep = _a.sent();
                            if (!dep)
                                throw new common_1.NotFoundException('Department not found');
                            _a.label = 3;
                        case 3: return [2 /*return*/, this.prisma.teacherProfile.update({
                                where: { userId: userId },
                                data: { departmentId: departmentId !== null && departmentId !== void 0 ? departmentId : null },
                            })];
                    }
                });
            });
        };
        return AdminService_1;
    }());
    __setFunctionName(_classThis, "AdminService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminService = _classThis;
}();
exports.AdminService = AdminService;
