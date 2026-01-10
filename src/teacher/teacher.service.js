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
exports.TeacherService = void 0;
var common_1 = require("@nestjs/common");
var TeacherService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TeacherService = _classThis = /** @class */ (function () {
        function TeacherService_1(prisma) {
            this.prisma = prisma;
        }
        TeacherService_1.prototype.getMe = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.user.findUnique({
                                where: { id: userId },
                                select: {
                                    id: true,
                                    email: true,
                                    role: true,
                                    createdAt: true,
                                    teacherProfile: {
                                        select: {
                                            fullName: true,
                                            phone: true,
                                            department: true,
                                            createdAt: true,
                                        },
                                    },
                                },
                            })];
                        case 1:
                            user = _a.sent();
                            if (!user)
                                throw new common_1.NotFoundException('User not found');
                            if (!user.teacherProfile)
                                throw new common_1.NotFoundException('Teacher profile not found');
                            return [2 /*return*/, {
                                    id: user.id,
                                    email: user.email,
                                    role: user.role,
                                    createdAt: user.createdAt,
                                    profile: user.teacherProfile,
                                }];
                    }
                });
            });
        };
        TeacherService_1.prototype.myAssignments = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.prisma.teachingAssignment.findMany({
                            where: { teacherUserId: userId },
                            include: { subject: true, group: true },
                            orderBy: { id: 'asc' },
                        })];
                });
            });
        };
        TeacherService_1.prototype.ensureScheduleBelongsToTeacher = function (scheduleId, teacherUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var schedule;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.schedule.findUnique({
                                where: { id: scheduleId },
                                include: { assignment: true },
                            })];
                        case 1:
                            schedule = _a.sent();
                            if (!schedule)
                                throw new common_1.NotFoundException('Schedule not found');
                            if (schedule.assignment.teacherUserId !== teacherUserId) {
                                throw new common_1.ForbiddenException('This schedule does not belong to you');
                            }
                            return [2 /*return*/, schedule];
                    }
                });
            });
        };
        TeacherService_1.prototype.markAttendance = function (teacherUserId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var schedule, student, dateObj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ensureScheduleBelongsToTeacher(dto.scheduleId, teacherUserId)];
                        case 1:
                            schedule = _a.sent();
                            return [4 /*yield*/, this.prisma.studentProfile.findUnique({
                                    where: { userId: dto.studentUserId },
                                })];
                        case 2:
                            student = _a.sent();
                            if (!student)
                                throw new common_1.NotFoundException('Student profile not found');
                            if (!student.groupId || student.groupId !== schedule.assignment.groupId) {
                                throw new common_1.ForbiddenException('Student is not in this group');
                            }
                            dateObj = new Date(dto.date);
                            return [2 /*return*/, this.prisma.attendance.upsert({
                                    where: {
                                        scheduleId_date_studentUserId: {
                                            scheduleId: dto.scheduleId,
                                            date: dateObj,
                                            studentUserId: dto.studentUserId,
                                        },
                                    },
                                    update: { status: dto.status, note: dto.note },
                                    create: {
                                        scheduleId: dto.scheduleId,
                                        studentUserId: dto.studentUserId,
                                        date: dateObj,
                                        status: dto.status,
                                        note: dto.note,
                                    },
                                })];
                    }
                });
            });
        };
        TeacherService_1.prototype.attendanceList = function (teacherUserId, scheduleId, date) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.ensureScheduleBelongsToTeacher(scheduleId, teacherUserId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.prisma.attendance.findMany({
                                    where: {
                                        scheduleId: scheduleId,
                                        date: date ? new Date(date) : undefined,
                                    },
                                    include: { student: { include: { user: true } } },
                                    orderBy: [{ date: 'asc' }, { studentUserId: 'asc' }],
                                })];
                    }
                });
            });
        };
        TeacherService_1.prototype.createGrade = function (teacherUserId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var assignment, student;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.prisma.teachingAssignment.findUnique({
                                where: { id: dto.assignmentId },
                            })];
                        case 1:
                            assignment = _b.sent();
                            if (!assignment)
                                throw new common_1.NotFoundException('Assignment not found');
                            if (assignment.teacherUserId !== teacherUserId) {
                                throw new common_1.ForbiddenException('This assignment does not belong to you');
                            }
                            return [4 /*yield*/, this.prisma.studentProfile.findUnique({
                                    where: { userId: dto.studentUserId },
                                })];
                        case 2:
                            student = _b.sent();
                            if (!student)
                                throw new common_1.NotFoundException('Student profile not found');
                            if (!student.groupId || student.groupId !== assignment.groupId) {
                                throw new common_1.ForbiddenException('Student is not in this group');
                            }
                            return [2 /*return*/, this.prisma.grade.create({
                                    data: {
                                        assignmentId: dto.assignmentId,
                                        studentUserId: dto.studentUserId,
                                        kind: dto.kind,
                                        score: dto.score,
                                        maxScore: (_a = dto.maxScore) !== null && _a !== void 0 ? _a : 100,
                                        note: dto.note,
                                    },
                                })];
                    }
                });
            });
        };
        TeacherService_1.prototype.gradeList = function (teacherUserId, assignmentId, studentUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var assignment;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.teachingAssignment.findUnique({
                                where: { id: assignmentId },
                            })];
                        case 1:
                            assignment = _a.sent();
                            if (!assignment)
                                throw new common_1.NotFoundException('Assignment not found');
                            if (assignment.teacherUserId !== teacherUserId) {
                                throw new common_1.ForbiddenException('This assignment does not belong to you');
                            }
                            return [2 /*return*/, this.prisma.grade.findMany({
                                    where: {
                                        assignmentId: assignmentId,
                                        studentUserId: studentUserId !== null && studentUserId !== void 0 ? studentUserId : undefined,
                                    },
                                    include: { student: { include: { user: true } } },
                                    orderBy: [{ createdAt: 'asc' }],
                                })];
                    }
                });
            });
        };
        return TeacherService_1;
    }());
    __setFunctionName(_classThis, "TeacherService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TeacherService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TeacherService = _classThis;
}();
exports.TeacherService = TeacherService;
