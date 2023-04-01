"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildURL = void 0;
var build_url_ts_1 = require("build-url-ts");
var regExp = /{\d+}/g; // identify structures -> {1}
function buildURL(url) {
    var baseURL = url.baseURL, params = url.params, queryParams = url.queryParams;
    params = params != null ? params : [];
    queryParams = queryParams != null ? queryParams : undefined;
    var baseURLWithParams = buildBaseURLWithParams(baseURL, params);
    return (0, build_url_ts_1.default)(baseURLWithParams, { queryParams: queryParams });
}
exports.buildURL = buildURL;
function buildBaseURLWithParams(base, params) {
    var _a;
    var replacers = (_a = base.match(regExp)) === null || _a === void 0 ? void 0 : _a.map(function (r) { return r.toString(); });
    if (replacers === undefined) {
        return base;
    }
    params.forEach(function (value, key) {
        base = base.replace(replacers[key], value);
    });
    return base;
}
