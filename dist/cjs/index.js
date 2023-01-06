"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMulticalendarYScrollPosition = exports.Multicalendar = void 0;
const Multicalendar_1 = __importDefault(require("./components/Multicalendar/Multicalendar"));
exports.Multicalendar = Multicalendar_1.default;
const MulticalendarStatesAndSettings_1 = require("./Services/MulticalendarStatesAndSettings");
Object.defineProperty(exports, "setMulticalendarYScrollPosition", { enumerable: true, get: function () { return MulticalendarStatesAndSettings_1.setMulticalendarYScrollPosition; } });
