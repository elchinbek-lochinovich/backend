"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
exports.AnalyticsService = void 0;
var common_1 = require("@nestjs/common");
var client_1 = require("@prisma/client");
var AnalyticsService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AnalyticsService = _classThis = /** @class */ (function () {
        function AnalyticsService_1(prisma, ai) {
            this.prisma = prisma;
            this.ai = ai;
        }
        AnalyticsService_1.prototype.clamp01 = function (x) {
            return Math.max(0, Math.min(1, x));
        };
        AnalyticsService_1.prototype.calcStudent = function (studentUserId, fromDate, toDate) {
            return __awaiter(this, void 0, void 0, function () {
                var student, attendances, total, present, late, excused, attendanceRate, grades, avgScore, lastScore, deltaFromAvg, attendanceRisk, gradeRisk, riskScore, insights;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.studentProfile.findUnique({
                                where: { userId: studentUserId },
                            })];
                        case 1:
                            student = _a.sent();
                            if (!student)
                                throw new common_1.NotFoundException('Student profile not found');
                            return [4 /*yield*/, this.prisma.attendance.findMany({
                                    where: {
                                        studentUserId: studentUserId,
                                        date: { gte: fromDate, lte: toDate },
                                    },
                                })];
                        case 2:
                            attendances = _a.sent();
                            total = attendances.length;
                            present = attendances.filter(function (a) { return a.status === client_1.AttendanceStatus.PRESENT; }).length;
                            late = attendances.filter(function (a) { return a.status === client_1.AttendanceStatus.LATE; })
                                .length;
                            excused = attendances.filter(function (a) { return a.status === client_1.AttendanceStatus.EXCUSED; }).length;
                            attendanceRate = total === 0 ? 1 : (present + 0.7 * late + 0.8 * excused) / total;
                            return [4 /*yield*/, this.prisma.grade.findMany({
                                    where: { studentUserId: studentUserId, createdAt: { gte: fromDate, lte: toDate } },
                                    orderBy: { createdAt: 'asc' },
                                })];
                        case 3:
                            grades = _a.sent();
                            avgScore = grades.length === 0
                                ? null
                                : grades.reduce(function (sum, g) {
                                    return sum + (g.maxScore ? (g.score / g.maxScore) * 100 : g.score);
                                }, 0) / grades.length;
                            lastScore = grades.length === 0
                                ? null
                                : grades[grades.length - 1].maxScore
                                    ? (grades[grades.length - 1].score /
                                        grades[grades.length - 1].maxScore) *
                                        100
                                    : grades[grades.length - 1].score;
                            deltaFromAvg = avgScore == null || lastScore == null
                                ? null
                                : Number((lastScore - avgScore).toFixed(1));
                            attendanceRisk = 1 - this.clamp01(attendanceRate);
                            gradeRisk = avgScore == null ? 0.25 : 1 - this.clamp01(avgScore / 100);
                            riskScore = Number(this.clamp01(0.6 * attendanceRisk + 0.4 * gradeRisk).toFixed(2));
                            insights = {
                                version: 1,
                                summary: {
                                    totalLessons: total,
                                    attendanceRate: attendanceRate,
                                    avgScore: avgScore,
                                    riskScore: riskScore,
                                },
                                signals: {
                                    attendance: {
                                        total: total,
                                        present: present,
                                        late: late,
                                        excused: excused,
                                        attendanceRate: attendanceRate,
                                    },
                                    grades: {
                                        count: grades.length,
                                        avgScore: avgScore,
                                        lastScore: lastScore == null ? null : Number(lastScore.toFixed(1)),
                                        deltaFromAvg: deltaFromAvg,
                                    },
                                    risk: {
                                        attendanceRisk: Number(attendanceRisk.toFixed(2)),
                                        gradeRisk: Number(gradeRisk.toFixed(2)),
                                        riskScore: riskScore,
                                    },
                                },
                                flags: [],
                                tips: [],
                            };
                            if (riskScore <= 0.3 && (avgScore !== null && avgScore !== void 0 ? avgScore : 0) >= 75 && attendanceRate >= 0.85) {
                                insights.flags.push('GOOD_PROGRESS');
                                insights.tips.push("Ijobiy holat: shu tempni saqlang, haftalik qisqa takrorlashlar qiling.");
                            }
                            if (riskScore >= 0.6) {
                                insights.flags.push('NEEDS_ATTENTION');
                                insights.tips.push("E'tibor kerak: davomat va baholarni yaxshilash uchun 2 haftalik reja tuzing.");
                            }
                            if (total >= 3 && attendanceRate < 0.8) {
                                insights.flags.push('LOW_ATTENDANCE');
                                insights.tips.push("Davomatni oshirish: darsga kechikish/kelmaslik sababini aniqlang va reja qiling.");
                            }
                            if (avgScore != null && avgScore < 60) {
                                insights.flags.push('LOW_GRADES');
                                insights.tips.push("Bahoni oshirish: haftalik 3 ta mini test + uy vazifa nazorati.");
                            }
                            if (riskScore > 0.7) {
                                insights.flags.push('HIGH_RISK');
                                insights.tips.push("Yuqori risk: mentor/kurator bilan 1:1 suhbat va 2 haftalik reja tuzing.");
                            }
                            return [2 /*return*/, { attendanceRate: attendanceRate, avgScore: avgScore, riskScore: riskScore, insights: insights }];
                    }
                });
            });
        };
        AnalyticsService_1.prototype.calcAndSave = function (studentUserId, fromDate, toDate) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.calcStudent(studentUserId, fromDate, toDate)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, this.prisma.studentAnalytics.upsert({
                                    where: {
                                        studentUserId_fromDate_toDate: { studentUserId: studentUserId, fromDate: fromDate, toDate: toDate },
                                    },
                                    update: {
                                        attendanceRate: result.attendanceRate,
                                        avgScore: result.avgScore,
                                        riskScore: result.riskScore,
                                        insights: result.insights,
                                    },
                                    create: {
                                        studentUserId: studentUserId,
                                        fromDate: fromDate,
                                        toDate: toDate,
                                        attendanceRate: result.attendanceRate,
                                        avgScore: result.avgScore,
                                        riskScore: result.riskScore,
                                        insights: result.insights,
                                    },
                                })];
                    }
                });
            });
        };
        // ✅ Auto-recalc: agar analyticsdan keyin attendance/grade qo‘shilsa qayta hisoblaydi
        AnalyticsService_1.prototype.getLatestForStudent = function (studentUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var student, todayEnd, latest, fromDate, newerAttendance, newerGrade;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.studentProfile.findUnique({
                                where: { userId: studentUserId },
                                select: { userId: true },
                            })];
                        case 1:
                            student = _a.sent();
                            if (!student)
                                throw new common_1.NotFoundException('Student profile not found');
                            todayEnd = new Date();
                            todayEnd.setHours(23, 59, 59, 999);
                            return [4 /*yield*/, this.prisma.studentAnalytics.findFirst({
                                    where: {
                                        studentUserId: studentUserId,
                                        toDate: { lte: todayEnd },
                                    },
                                    orderBy: [{ toDate: 'desc' }, { createdAt: 'desc' }],
                                })];
                        case 2:
                            latest = _a.sent();
                            if (!latest) {
                                fromDate = new Date(todayEnd);
                                fromDate.setDate(fromDate.getDate() - 30);
                                return [2 /*return*/, this.calcAndSave(studentUserId, fromDate, todayEnd)];
                            }
                            return [4 /*yield*/, this.prisma.attendance.findFirst({
                                    where: {
                                        studentUserId: studentUserId,
                                        createdAt: { gt: latest.createdAt },
                                    },
                                    select: { id: true },
                                })];
                        case 3:
                            newerAttendance = _a.sent();
                            return [4 /*yield*/, this.prisma.grade.findFirst({
                                    where: {
                                        studentUserId: studentUserId,
                                        createdAt: { gt: latest.createdAt },
                                    },
                                    select: { id: true },
                                })];
                        case 4:
                            newerGrade = _a.sent();
                            if (newerAttendance || newerGrade) {
                                return [2 /*return*/, this.calcAndSave(studentUserId, latest.fromDate, todayEnd)];
                            }
                            return [2 /*return*/, latest];
                    }
                });
            });
        };
        AnalyticsService_1.prototype.getStudentWeeklyTrend = function (studentUserId, weeks) {
            return __awaiter(this, void 0, void 0, function () {
                var student, todayEnd, from, records, byFromDate, _i, records_1, r, key, prev, better, uniq;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.prisma.studentProfile.findUnique({
                                where: { userId: studentUserId },
                                select: { userId: true },
                            })];
                        case 1:
                            student = _a.sent();
                            if (!student)
                                throw new common_1.NotFoundException('Student profile not found');
                            todayEnd = new Date();
                            todayEnd.setHours(23, 59, 59, 999);
                            from = new Date(todayEnd);
                            from.setDate(from.getDate() - weeks * 7);
                            return [4 /*yield*/, this.prisma.studentAnalytics.findMany({
                                    where: {
                                        studentUserId: studentUserId,
                                        toDate: { lte: todayEnd },
                                        fromDate: { gte: from },
                                    },
                                    orderBy: [{ fromDate: 'asc' }, { toDate: 'asc' }, { createdAt: 'asc' }],
                                })];
                        case 2:
                            records = _a.sent();
                            byFromDate = new Map();
                            for (_i = 0, records_1 = records; _i < records_1.length; _i++) {
                                r = records_1[_i];
                                key = r.fromDate.toISOString();
                                prev = byFromDate.get(key);
                                if (!prev)
                                    byFromDate.set(key, r);
                                else {
                                    better = r.toDate > prev.toDate
                                        ? r
                                        : r.toDate < prev.toDate
                                            ? prev
                                            : r.createdAt > prev.createdAt
                                                ? r
                                                : prev;
                                    byFromDate.set(key, better);
                                }
                            }
                            uniq = Array.from(byFromDate.values()).sort(function (a, b) { return a.fromDate.getTime() - b.fromDate.getTime(); });
                            return [2 /*return*/, {
                                    meta: {
                                        studentUserId: studentUserId,
                                        weeks: weeks,
                                        fromDate: from.toISOString(),
                                        toDate: todayEnd.toISOString(),
                                    },
                                    data: uniq.map(function (r) {
                                        var _a, _b;
                                        return ({
                                            id: r.id,
                                            fromDate: r.fromDate,
                                            toDate: r.toDate,
                                            attendanceRate: Number(r.attendanceRate.toFixed(2)),
                                            avgScore: r.avgScore == null ? null : Number(r.avgScore.toFixed(1)),
                                            riskScore: Number(r.riskScore.toFixed(2)),
                                            riskBand: r.riskScore >= 0.7 ? 'HIGH' : r.riskScore >= 0.3 ? 'MEDIUM' : 'LOW',
                                            flags: Array.from(new Set(((_b = (_a = r.insights) === null || _a === void 0 ? void 0 : _a.flags) !== null && _b !== void 0 ? _b : []))),
                                        });
                                    }),
                                }];
                    }
                });
            });
        };
        // ✅ FIXED: promptga real data qo‘shildi + AI natija DB’ga saqlandi
        AnalyticsService_1.prototype.buildStudentPromptPayload = function (studentUserId, weeks, requesterRole) {
            return __awaiter(this, void 0, void 0, function () {
                var latest, trend, latestInsights, summary, safeLatest, prompt, ai, _a;
                var _b, _c, _d, _e, _f, _g, _h, _j;
                return __generator(this, function (_k) {
                    switch (_k.label) {
                        case 0: return [4 /*yield*/, this.getLatestForStudent(studentUserId)];
                        case 1:
                            latest = _k.sent();
                            return [4 /*yield*/, this.getStudentWeeklyTrend(studentUserId, weeks)];
                        case 2:
                            trend = _k.sent();
                            latestInsights = (_b = latest.insights) !== null && _b !== void 0 ? _b : {};
                            summary = (_c = latestInsights.summary) !== null && _c !== void 0 ? _c : {
                                attendanceRate: latest.attendanceRate,
                                avgScore: latest.avgScore,
                                riskScore: latest.riskScore,
                            };
                            safeLatest = {
                                fromDate: latest.fromDate,
                                toDate: latest.toDate,
                                attendanceRate: Number(latest.attendanceRate.toFixed(2)),
                                avgScore: latest.avgScore == null ? null : Number(latest.avgScore.toFixed(1)),
                                riskScore: Number(latest.riskScore.toFixed(2)),
                                riskBand: latest.riskScore >= 0.7
                                    ? 'HIGH'
                                    : latest.riskScore >= 0.3
                                        ? 'MEDIUM'
                                        : 'LOW',
                                flags: Array.from(new Set(((_e = (_d = latest.insights) === null || _d === void 0 ? void 0 : _d.flags) !== null && _e !== void 0 ? _e : []))),
                                summary: summary,
                                signals: (_f = latestInsights.signals) !== null && _f !== void 0 ? _f : null,
                            };
                            prompt = [
                                'You are an academic advisor assistant.',
                                'Use ONLY the provided analytics data. Do not invent facts.',
                                'Return ONLY valid JSON (no markdown, no extra text).',
                                '',
                                "Context: requesterRole=".concat(requesterRole),
                                "StudentUserId: ".concat(studentUserId),
                                '',
                                'ANALYTICS_JSON:',
                                JSON.stringify({ latest: safeLatest, trend: trend.data }),
                                '',
                                'Task:',
                                '1) Provide 3 short insights based on the data.',
                                '2) Provide 3 actionable recommendations for the next 2 weeks.',
                                '3) risk_note MUST match riskBand/riskScore; do NOT escalate if riskBand is LOW.',
                                '',
                                'Return JSON with keys: insights[], recommendations[], risk_note (string).',
                            ].join('\n');
                            ai = (_h = (_g = latest.insights) === null || _g === void 0 ? void 0 : _g.ai) !== null && _h !== void 0 ? _h : null;
                            if (ai) {
                                console.log('[AI] cache HIT: using stored ai result');
                            }
                            else {
                                console.log('[AI] cache MISS: calling OpenAI');
                            }
                            if (!!ai) return [3 /*break*/, 8];
                            _k.label = 3;
                        case 3:
                            _k.trys.push([3, 7, , 8]);
                            return [4 /*yield*/, this.ai.runPrompt(prompt)];
                        case 4:
                            ai = _k.sent();
                            if (!(ai && (latest === null || latest === void 0 ? void 0 : latest.id))) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.prisma.studentAnalytics.update({
                                    where: { id: latest.id },
                                    data: {
                                        insights: __assign(__assign({}, latest.insights), { ai: ai }),
                                    },
                                })];
                        case 5:
                            _k.sent();
                            _k.label = 6;
                        case 6: return [3 /*break*/, 8];
                        case 7:
                            _a = _k.sent();
                            ai = null;
                            return [3 /*break*/, 8];
                        case 8: return [2 /*return*/, {
                                meta: {
                                    studentUserId: studentUserId,
                                    weeks: weeks,
                                    requesterRole: requesterRole,
                                    generatedAt: new Date().toISOString(),
                                },
                                data: {
                                    latest: {
                                        id: latest.id,
                                        fromDate: latest.fromDate,
                                        toDate: latest.toDate,
                                        attendanceRate: Number(latest.attendanceRate.toFixed(2)),
                                        avgScore: latest.avgScore == null
                                            ? null
                                            : Number(latest.avgScore.toFixed(1)),
                                        riskScore: Number(latest.riskScore.toFixed(2)),
                                        riskBand: latest.riskScore >= 0.7
                                            ? 'HIGH'
                                            : latest.riskScore >= 0.3
                                                ? 'MEDIUM'
                                                : 'LOW',
                                        flags: safeLatest.flags,
                                        summary: summary,
                                        signals: (_j = latestInsights.signals) !== null && _j !== void 0 ? _j : null,
                                    },
                                    trend: trend.data,
                                },
                                prompt: prompt,
                                ai: ai,
                            }];
                    }
                });
            });
        };
        // Controller ishlatadigan method
        AnalyticsService_1.prototype.getStudentForPeriod = function (studentUserId, from, to) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.calcAndSave(studentUserId, from, to)];
                });
            });
        };
        // Controller uchun: ARRAY qaytaradi (map/sort/filter ishlashi uchun)
        AnalyticsService_1.prototype.getGroupDashboard = function (groupId) {
            return __awaiter(this, void 0, void 0, function () {
                var students, data, _i, students_1, s, latest;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.prisma.studentProfile.findMany({
                                where: { groupId: groupId },
                                select: { userId: true },
                            })];
                        case 1:
                            students = _c.sent();
                            data = [];
                            _i = 0, students_1 = students;
                            _c.label = 2;
                        case 2:
                            if (!(_i < students_1.length)) return [3 /*break*/, 5];
                            s = students_1[_i];
                            return [4 /*yield*/, this.getLatestForStudent(s.userId)];
                        case 3:
                            latest = _c.sent();
                            data.push({
                                studentUserId: s.userId,
                                latest: {
                                    attendanceRate: latest.attendanceRate,
                                    avgScore: latest.avgScore,
                                    riskScore: latest.riskScore,
                                    riskBand: latest.riskScore >= 0.7
                                        ? 'HIGH'
                                        : latest.riskScore >= 0.3
                                            ? 'MEDIUM'
                                            : 'LOW',
                                    flags: Array.from(new Set(((_b = (_a = latest.insights) === null || _a === void 0 ? void 0 : _a.flags) !== null && _b !== void 0 ? _b : []))),
                                },
                            });
                            _c.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/, data];
                    }
                });
            });
        };
        AnalyticsService_1.prototype.buildGroupSummaryPayload = function (groupId, requesterRole) {
            return __awaiter(this, void 0, void 0, function () {
                var rows, safe, toDate, fromDate, existing, payload, prompt, ai, _a;
                var _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.getGroupDashboard(groupId)];
                        case 1:
                            rows = _d.sent();
                            safe = rows.map(function (x) { return ({
                                studentUserId: x.studentUserId,
                                riskScore: Number(x.latest.riskScore.toFixed(2)),
                                riskBand: x.latest.riskBand,
                                avgScore: x.latest.avgScore,
                                attendanceRate: Number(x.latest.attendanceRate.toFixed(2)),
                                flags: x.latest.flags,
                            }); });
                            toDate = new Date();
                            toDate.setHours(23, 59, 59, 999);
                            fromDate = new Date(toDate);
                            fromDate.setDate(fromDate.getDate() - 14); // 2 haftalik cache
                            return [4 /*yield*/, this.prisma.groupAiSummary.findUnique({
                                    where: { groupId_fromDate_toDate: { groupId: groupId, fromDate: fromDate, toDate: toDate } },
                                })];
                        case 2:
                            existing = _d.sent();
                            if (existing) {
                                payload = existing.payload;
                                return [2 /*return*/, {
                                        meta: {
                                            groupId: groupId,
                                            requesterRole: requesterRole,
                                            generatedAt: new Date().toISOString(),
                                            studentCount: safe.length,
                                            cached: true,
                                            fromDate: fromDate.toISOString(),
                                            toDate: toDate.toISOString(),
                                        },
                                        data: { students: safe },
                                        prompt: (_b = payload === null || payload === void 0 ? void 0 : payload.prompt) !== null && _b !== void 0 ? _b : null,
                                        ai: (_c = payload === null || payload === void 0 ? void 0 : payload.ai) !== null && _c !== void 0 ? _c : null,
                                    }];
                            }
                            prompt = [
                                'You are an academic advisor assistant for a university group dashboard.',
                                'Use ONLY the provided JSON data. Do not invent facts.',
                                'Return ONLY valid JSON.',
                                '',
                                "Context: requesterRole=".concat(requesterRole),
                                "GroupId: ".concat(groupId),
                                '',
                                'GROUP_ANALYTICS_JSON:',
                                JSON.stringify({ students: safe }),
                                '',
                                'Task:',
                                '1) Provide 5 concise insights about the group.',
                                '2) Provide 5 actionable recommendations for the next 2 weeks.',
                                '3) List high_risk_students as array of studentUserId where riskBand is HIGH.',
                                '',
                                'Return JSON with keys: insights[], recommendations[], high_risk_students[].',
                            ].join('\n');
                            ai = null;
                            _d.label = 3;
                        case 3:
                            _d.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.ai.runPrompt(prompt)];
                        case 4:
                            ai = _d.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            _a = _d.sent();
                            ai = null;
                            return [3 /*break*/, 6];
                        case 6:
                            if (!ai) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.prisma.groupAiSummary.upsert({
                                    where: { groupId_fromDate_toDate: { groupId: groupId, fromDate: fromDate, toDate: toDate } },
                                    update: { payload: { prompt: prompt, ai: ai } },
                                    create: { groupId: groupId, fromDate: fromDate, toDate: toDate, payload: { prompt: prompt, ai: ai } },
                                })];
                        case 7:
                            _d.sent();
                            _d.label = 8;
                        case 8: return [2 /*return*/, {
                                meta: {
                                    groupId: groupId,
                                    requesterRole: requesterRole,
                                    generatedAt: new Date().toISOString(),
                                    studentCount: safe.length,
                                    cached: false,
                                    fromDate: fromDate.toISOString(),
                                    toDate: toDate.toISOString(),
                                },
                                data: { students: safe },
                                prompt: prompt,
                                ai: ai,
                            }];
                    }
                });
            });
        };
        return AnalyticsService_1;
    }());
    __setFunctionName(_classThis, "AnalyticsService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AnalyticsService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AnalyticsService = _classThis;
}();
exports.AnalyticsService = AnalyticsService;
