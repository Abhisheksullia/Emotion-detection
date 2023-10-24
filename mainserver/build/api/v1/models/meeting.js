"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meeting = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var status_1 = __importDefault(require("../enums/status"));
var enumArray_1 = __importDefault(require("../helpers/enumArray"));
var userSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
}, { _id: false, timestamps: true });
var MeetingSchema = new mongoose_1.Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    title: String,
    users: [mongoose_1.default.Types.ObjectId],
    status: {
        type: String,
        enum: enumArray_1.default(status_1.default),
        default: status_1.default.Pending,
    },
    meetingLink: { type: String, required: true },
    createdBy: { type: mongoose_1.default.Types.ObjectId, required: true },
}, { timestamps: true });
exports.Meeting = mongoose_1.default.model("Meeting", MeetingSchema);
