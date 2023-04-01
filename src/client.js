"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPClient = void 0;
var axios_1 = require("axios");
var rax = require("retry-axios");
var url_1 = require("./url");
var HTTPClient = /** @class */ (function () {
    function HTTPClient(options) {
        this.axios = axios_1.default;
        this.axios.defaults.raxConfig = {
            retry: (options === null || options === void 0 ? void 0 : options.retry) != null ? options.retry : 0,
            retryDelay: (options === null || options === void 0 ? void 0 : options.delayRetry) != null ? options === null || options === void 0 ? void 0 : options.delayRetry : 0,
        };
        rax.attach(this.axios);
        this.axios.interceptors.request.use(function (request) {
            request.validateStatus = function (status) {
                return status < 300 || status === 404;
            };
            request.timeout = (options === null || options === void 0 ? void 0 : options.timeout) != null ? options.timeout : 0;
            return request;
        });
    }
    HTTPClient.prototype.get = function (url, headers) {
        return __awaiter(this, void 0, void 0, function () {
            var builtURL, res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        builtURL = (0, url_1.buildURL)(url);
                        return [4 /*yield*/, this.axios.get(builtURL, {
                                headers: headers,
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, this.resolveResponse(res)];
                    case 2:
                        e_1 = _a.sent();
                        return [2 /*return*/, this.rejectResponse(e_1)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HTTPClient.prototype.post = function (url, body, headers) {
        return __awaiter(this, void 0, void 0, function () {
            var builtURL, res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        builtURL = (0, url_1.buildURL)(url);
                        return [4 /*yield*/, this.axios.post(builtURL, body, {
                                headers: headers,
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, this.resolveResponse(res)];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, this.rejectResponse(e_2)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HTTPClient.prototype.put = function (url, body, headers) {
        return __awaiter(this, void 0, void 0, function () {
            var builtURL, res, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        builtURL = (0, url_1.buildURL)(url);
                        return [4 /*yield*/, this.axios.put(builtURL, body, {
                                headers: headers,
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, this.resolveResponse(res)];
                    case 2:
                        e_3 = _a.sent();
                        return [2 /*return*/, this.rejectResponse(e_3)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HTTPClient.prototype.patch = function (url, patch, headers) {
        return __awaiter(this, void 0, void 0, function () {
            var builtURL, res, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        builtURL = (0, url_1.buildURL)(url);
                        return [4 /*yield*/, this.axios.patch(builtURL, patch, {
                                headers: headers,
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, this.resolveResponse(res)];
                    case 2:
                        e_4 = _a.sent();
                        return [2 /*return*/, this.rejectResponse(e_4)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HTTPClient.prototype.delete = function (url, headers) {
        return __awaiter(this, void 0, void 0, function () {
            var builtURL, res, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        builtURL = (0, url_1.buildURL)(url);
                        return [4 /*yield*/, this.axios.delete(builtURL, {
                                headers: headers,
                            })];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, this.resolveResponse(res)];
                    case 2:
                        e_5 = _a.sent();
                        return [2 /*return*/, this.rejectResponse(e_5)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    HTTPClient.prototype.getCurrentRetryAttempt = function (config) {
        var _a;
        return ((_a = config === null || config === void 0 ? void 0 : config.raxConfig) === null || _a === void 0 ? void 0 : _a.currentRetryAttempt) !== undefined
            ? config.raxConfig.currentRetryAttempt
            : 1;
    };
    HTTPClient.prototype.resolveResponse = function (res) {
        var config = res.config, status = res.status, data = res.data;
        var currentRetryAttempt = this.getCurrentRetryAttempt(config);
        return {
            status: status,
            data: data,
            retryAttempt: currentRetryAttempt,
        };
    };
    HTTPClient.prototype.rejectResponse = function (error) {
        var response = error.response, message = error.message;
        var status = response != null ? response.status : 500;
        return {
            status: status,
            message: message,
        };
    };
    return HTTPClient;
}());
exports.HTTPClient = HTTPClient;
