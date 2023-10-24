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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.meetingUserDetail = exports.meetingDetail = exports.dashboardHandler = exports.endMeetingHandler = exports.cancelMeetingHandler = exports.createMeetingHandler = exports.getStatusHandler = exports.logoutTeacherHandler = exports.loginTeacherHandler = exports.createTeacherHandler = void 0;
var user_service_1 = require("../services/user.service");
var shortid_1 = __importDefault(require("shortid"));
var checkErrors_1 = __importDefault(require("../helpers/checkErrors"));
var customError_1 = __importDefault(require("../helpers/customError"));
var userType_1 = __importDefault(require("../interfaces/userType"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var meeting_service_1 = require("../services/meeting.service");
var moment_1 = __importDefault(require("moment"));
var status_1 = __importDefault(require("../enums/status"));
var maxkey_1 = __importDefault(require("../helpers/maxkey"));
function createTeacherHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var code, username, admin, user, token, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    code = Math.round(Math.random() * 8999 + 1000);
                    username = req.body.username;
                    return [4 /*yield*/, user_service_1.findUser({ username: username, type: userType_1.default.Teacher })];
                case 1:
                    admin = _a.sent();
                    if (admin) {
                        throw new customError_1.default("Bad Request", 404, "Teacher already exist");
                    }
                    return [4 /*yield*/, user_service_1.createUser(__assign(__assign({}, req.body), { type: userType_1.default.Teacher }))];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, user.generateAuthToken()];
                case 3:
                    token = _a.sent();
                    res.status(200).send({ user: user, token: token });
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    checkErrors_1.default(err_1, res);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createTeacherHandler = createTeacherHandler;
function loginTeacherHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var admin, token, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, user_service_1.validatePassword(__assign(__assign({}, req.body), { type: userType_1.default.Teacher }))];
                case 1:
                    admin = _a.sent();
                    if (!admin) {
                        throw new customError_1.default("Bad request", 404, "Please Provide Right Credientials");
                    }
                    return [4 /*yield*/, admin.generateAuthToken()];
                case 2:
                    token = _a.sent();
                    // res.cookie("jwt", "manish", { httpOnly: true });
                    console.log({ user: admin, token: token });
                    res.send({ user: admin, token: token });
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    checkErrors_1.default(err_2, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.loginTeacherHandler = loginTeacherHandler;
function logoutTeacherHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var token, decoded, admin;
        return __generator(this, function (_b) {
            try {
                token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
                console.log("token", token);
                if (!token) {
                    throw new customError_1.default("Bad request", 401, "Please Authenticate first");
                }
                decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                admin = user_service_1.findAndUpdateUser({
                    _id: decoded._id,
                    tokens: token,
                }, {
                    $pull: {
                        tokens: token,
                    },
                }, {});
                if (!admin) {
                    throw new customError_1.default("Bad request", 401, "Please Authenticate first");
                }
                res.send({ message: "You are successfully logout" });
            }
            catch (err) {
                checkErrors_1.default(err, res);
            }
            return [2 /*return*/];
        });
    });
}
exports.logoutTeacherHandler = logoutTeacherHandler;
function getStatusHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                res.send(req.user);
            }
            catch (err) {
                checkErrors_1.default(err, res);
            }
            return [2 /*return*/];
        });
    });
}
exports.getStatusHandler = getStatusHandler;
function createMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, meeting, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = req.user;
                    return [4 /*yield*/, meeting_service_1.createMeeting(__assign(__assign({}, req.body), { createdBy: user._id, meetingLink: shortid_1.default.generate() }))];
                case 1:
                    meeting = _a.sent();
                    res.send({ link: meeting.meetingLink });
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    checkErrors_1.default(err_3, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.createMeetingHandler = createMeetingHandler;
function cancelMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, meetings, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = req.user;
                    return [4 /*yield*/, meeting_service_1.findAndUpdateMeeting({
                            meetingLink: req.params.meetingId,
                            startTime: { $gt: moment_1.default().toDate() },
                            createdBy: user._id,
                        }, { $set: { status: status_1.default.Cancelled } }, {})];
                case 1:
                    meetings = _a.sent();
                    res.send({ message: "meeting successfully cancelled" });
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    checkErrors_1.default(err_4, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.cancelMeetingHandler = cancelMeetingHandler;
function endMeetingHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, meetings, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = req.user;
                    return [4 /*yield*/, meeting_service_1.findAndUpdateMeeting({
                            meetingLink: req.params.meetingId,
                            startTime: { $lte: moment_1.default().toDate() },
                            createdBy: user._id,
                        }, { $set: { status: status_1.default.Completed, endTime: moment_1.default().toDate() } }, {})];
                case 1:
                    meetings = _a.sent();
                    res.send({ message: "meeting successfully completed" });
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    checkErrors_1.default(err_5, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.endMeetingHandler = endMeetingHandler;
function dashboardHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, meetings, todaysMeetings, report_1, allMeetings, reportAll_1, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    user = req.user;
                    return [4 /*yield*/, meeting_service_1.findAllMeeting({
                            startTime: { $gt: moment_1.default().subtract(10, "minute").toDate() },
                            createdBy: user._id,
                        })];
                case 1:
                    meetings = _a.sent();
                    return [4 /*yield*/, meeting_service_1.aggregateMeeting([
                            {
                                $match: {
                                    createdBy: user._id,
                                    startTime: {
                                        $gte: moment_1.default().startOf("day").toDate(),
                                        $lt: moment_1.default().endOf("day").toDate(),
                                    },
                                },
                            },
                            {
                                $lookup: {
                                    from: "meetinglogs",
                                    let: { meetingId: "$_id" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [{ $eq: ["$meetingId", "$$meetingId"] }],
                                                },
                                            },
                                        },
                                    ],
                                    as: "logs",
                                },
                            },
                        ])];
                case 2:
                    todaysMeetings = _a.sent();
                    report_1 = { emotion: {}, drowsy: {} };
                    todaysMeetings.forEach(function (value) {
                        var exp = value.logs.reduce(function (total, value) {
                            if (total.emotion[value.emotion]) {
                                total.emotion[value.emotion] += 1;
                            }
                            else {
                                total.emotion[value.emotion] = 1;
                            }
                            if (total.drowsy[value.drowsiness]) {
                                total.drowsy[value.drowsiness] += 1;
                            }
                            else {
                                total.drowsy[value.drowsiness] = 1;
                            }
                            return total;
                        }, {
                            emotion: {},
                            drowsy: {},
                        });
                        var drowsy = maxkey_1.default(exp.drowsy);
                        var emotion = maxkey_1.default(exp.emotion);
                        if (emotion) {
                            //@ts-ignore
                            if (report_1.emotion[emotion]) {
                                //@ts-ignore
                                report_1.emotion[emotion] += 1;
                            }
                            else {
                                //@ts-ignore
                                report_1.emotion[emotion] = 1;
                            }
                        }
                        if (drowsy) {
                            //@ts-ignore
                            if (report_1.drowsy[drowsy]) {
                                //@ts-ignore
                                report_1.drowsy[drowsy] += 1;
                            }
                            else {
                                //@ts-ignore
                                report_1.drowsy[drowsy] = 1;
                            }
                        }
                    });
                    return [4 /*yield*/, meeting_service_1.aggregateMeeting([
                            {
                                $match: {
                                    createdBy: user._id,
                                },
                            },
                            { $sort: { startTime: -1 } },
                            {
                                $lookup: {
                                    from: "meetinglogs",
                                    let: { meetingId: "$_id" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [{ $eq: ["$meetingId", "$$meetingId"] }],
                                                },
                                            },
                                        },
                                    ],
                                    as: "logs",
                                },
                            },
                        ])];
                case 3:
                    allMeetings = _a.sent();
                    reportAll_1 = { emotion: {}, drowsy: {} };
                    allMeetings.forEach(function (value) {
                        var exp = value.logs.reduce(function (total, value) {
                            if (total.emotion[value.emotion]) {
                                total.emotion[value.emotion] += 1;
                            }
                            else {
                                total.emotion[value.emotion] = 1;
                            }
                            if (total.drowsy[value.drowsiness]) {
                                total.drowsy[value.drowsiness] += 1;
                            }
                            else {
                                total.drowsy[value.drowsiness] = 1;
                            }
                            return total;
                        }, {
                            emotion: {},
                            drowsy: {},
                        });
                        var drowsy = maxkey_1.default(exp.drowsy);
                        var emotion = maxkey_1.default(exp.emotion);
                        if (emotion) {
                            //@ts-ignore
                            if (reportAll_1.emotion[emotion]) {
                                //@ts-ignore
                                reportAll_1.emotion[emotion] += 1;
                            }
                            else {
                                //@ts-ignore
                                reportAll_1.emotion[emotion] = 1;
                            }
                        }
                        if (drowsy) {
                            //@ts-ignore
                            if (reportAll_1.drowsy[drowsy]) {
                                //@ts-ignore
                                reportAll_1.drowsy[drowsy] += 1;
                            }
                            else {
                                //@ts-ignore
                                reportAll_1.drowsy[drowsy] = 1;
                            }
                        }
                    });
                    console.log("report", report_1, reportAll_1);
                    res.send({
                        meetings: meetings,
                        emotion: reportAll_1.emotion,
                        allMeeting: allMeetings.length,
                        allEmotion: maxkey_1.default(reportAll_1.emotion),
                        allDrowsy: maxkey_1.default(reportAll_1.drowsy),
                        todayMeeting: todaysMeetings.length,
                        todayEmotion: maxkey_1.default(report_1.emotion),
                        todayDrowsy: maxkey_1.default(report_1.drowsy),
                    });
                    return [3 /*break*/, 5];
                case 4:
                    err_6 = _a.sent();
                    checkErrors_1.default(err_6, res);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.dashboardHandler = dashboardHandler;
function meetingDetail(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, meetings, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    user = req.user;
                    return [4 /*yield*/, meeting_service_1.aggregateMeeting([
                            {
                                $match: {
                                    createdBy: user._id,
                                },
                            },
                            { $sort: { startTime: -1 } },
                            {
                                $lookup: {
                                    from: "meetinglogs",
                                    let: { meetingId: "$_id" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [{ $eq: ["$meetingId", "$$meetingId"] }],
                                                },
                                            },
                                        },
                                    ],
                                    as: "logs",
                                },
                            },
                        ])];
                case 1:
                    meetings = _a.sent();
                    res.send(meetings);
                    return [3 /*break*/, 3];
                case 2:
                    err_7 = _a.sent();
                    checkErrors_1.default(err_7, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.meetingDetail = meetingDetail;
function meetingUserDetail(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, meeting, users, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    user = req.user;
                    console.log("req", req.params.meetingId);
                    return [4 /*yield*/, meeting_service_1.findMeeting({ _id: req.params.meetingId, createdBy: user._id }, { users: 1 })];
                case 1:
                    meeting = _a.sent();
                    if (!meeting) {
                        throw new customError_1.default("Bad Request", 404, "No such meeting found");
                    }
                    return [4 /*yield*/, user_service_1.aggregateUser([
                            {
                                $match: {
                                    _id: { $in: meeting.users },
                                },
                            },
                            {
                                $lookup: {
                                    from: "meetinglogs",
                                    let: { userId: "$_id" },
                                    pipeline: [
                                        {
                                            $match: {
                                                $expr: {
                                                    $and: [
                                                        { $eq: ["$meetingId", meeting._id] },
                                                        { $eq: ["$userId", "$$userId"] },
                                                    ],
                                                },
                                            },
                                        },
                                    ],
                                    as: "logs",
                                },
                            },
                        ])];
                case 2:
                    users = _a.sent();
                    console.log("users", users);
                    res.send(users);
                    return [3 /*break*/, 4];
                case 3:
                    err_8 = _a.sent();
                    checkErrors_1.default(err_8, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.meetingUserDetail = meetingUserDetail;
