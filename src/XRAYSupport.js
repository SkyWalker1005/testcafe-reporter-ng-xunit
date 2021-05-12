/* eslint-disable */
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
exports.__esModule = true;
exports.XRAYSupport = void 0;
//npm install node-fetch
var fetch = require('node-fetch');
var GraphQLURI = "http://xray.cloud.xpand-it.com/api/v1/graphql";
var glbdata;
var test;
var XRAYSupport = /** @class */ (function () {
    function XRAYSupport() {
        this.somedata = "sample";
    }
    XRAYSupport.prototype.XRAYAuthenticationAPI = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('https://xray.cloud.xpand-it.com/api/v1/authenticate', {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                "client_id": "7C26EB6401AE4C0FB4081DE3DB76413C",
                                "client_secret": "1ec6ce2d4dbca8149624f31641bca7541ceacb60a6294075521ba0f56bd38ba8"
                            })
                        })];
                    case 1:
                        response = _a.sent();
                        globalThis.temper = response.json();
                        return [2 /*return*/, temper];
                }
            });
        });
    };
    XRAYSupport.prototype.getTestPlansKeyAPI = function (ProjectName) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            var _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = fetch;
                        _b = [GraphQLURI];
                        _e = {
                            method: "Post"
                        };
                        _f = { "Content-Type": "application/json" };
                        _c = "Authorization";
                        _d = "Bearer ";
                        return [4 /*yield*/, this.XRAYAuthenticationAPI()];
                    case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([(_e.headers = (_f[_c] = _d + (_g.sent()) + "", _f),
                                _e.body = JSON.stringify({
                                    query: "\n                        query {\n                        getTestPlans(jql: \"project = '" + ProjectName + "'\", start:0,limit:20) {\n                            total\n                        \n                                results {\n                                    jira(fields: [\"key\",\"assignee\", \"reporter\"])\n                                    issueId\n                                    tests(limit: 100)\n                                                {\n                    \n                                \n                                                total\n                                                results{\n                                                    issueId\n                                                    testType{\n                                                        name\n                                                    }\n                                                        jira(fields: [\"key\",\"assignee\", \"reporter\"])  \n                                                        }\n                                                        \n                                                }\n                                \n                                        }\n                                        \n                                        }\n                                        \n                    }\n                    \n\n\n                    "
                                }),
                                _e)]))];
                    case 2:
                        response = _g.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    XRAYSupport.prototype.getTestCasesKeysAPI = function (PlanId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            var _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = fetch;
                        _b = [GraphQLURI];
                        _e = {
                            method: "Post"
                        };
                        _f = { "Content-Type": "application/json" };
                        _c = "Authorization";
                        _d = "Bearer ";
                        return [4 /*yield*/, this.XRAYAuthenticationAPI()];
                    case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([(_e.headers = (_f[_c] = _d + (_g.sent()) + "", _f),
                                _e.body = JSON.stringify({
                                    query: "\n                                                 query {\n                                                 getTestPlan(issueId:\"" + PlanId + "\") {\n                                                      \n                                                     issueId\n                                                     projectId\n                                                     tests(limit: 100)\n                                                                         {\n                                                                         total\n                                                                         results{\n                                                                             issueId\n                                                                             testType{\n                                                                                 name\n                                                                             }\n                                                                                 jira(fields: [\"key\",\"assignee\", \"reporter\",\"description\"])  \n                                                                                 }\n                                                                                \n                                                                         }\n                                                     jira(fields: [\"assignee\", \"reporter\",\"key\",\"description\"])\n                                                \n                                                 }\n                                             }\n                                            \n                        \n                        \n                                             "
                                }),
                                _e)]))];
                    case 2:
                        response = _g.sent();
                        return [2 /*return*/, response.json()
                            // var data=await response.json()
                            // this.somedata= data.data.getTestPlan.tests.results[1].jira.key
                        ];
                }
            });
        });
    };
    XRAYSupport.prototype.createTestExecutionAPI = function (TestCasesissueID, ProjectName) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            var _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = fetch;
                        _b = [GraphQLURI];
                        _e = {
                            method: "Post"
                        };
                        _f = { "Content-Type": "application/json" };
                        _c = "Authorization";
                        _d = "Bearer ";
                        return [4 /*yield*/, this.XRAYAuthenticationAPI()];
                    case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([(_e.headers = (_f[_c] = _d + (_g.sent()) + "", _f),
                                _e.body = JSON.stringify({
                                    query: "\n                        mutation\t{\n\t\t\tcreateTestExecution(\n\t\t\t\ttestIssueIds: [" + TestCasesissueID + "] \n\t\t\t\t        \n\t\t\t\t\tjira: {            \n\t\t\t\t\t\tfields: \n\t\t\t\t\t\t\t{ \n\t\t\t\t\t\t\tsummary: \"Test Execution\", project: {key: \"" + ProjectName + "\"}\n\t\t\t\t\t\t\t}       \n\t\t\t\t\t\t  }   \n\t\t\t\t\t\t\t\t)\n\t\t\t{\n\t\t\t\ttestExecution \n\t\t\t\t\t{\n\t\t\t\t\t\tissueId        \n\t\t\t\t\t\t\tjira(fields: [\"key\"])\n\t\t\t\t\t\t\ttestRuns(limit: 100)\n\t\t\t\t\t\t\t\t{      \n\t\t\t\t\t\t\t\ttotal \n\t\t\t\t\t\t\t\tlimit   \n\t\t\t\t\t\t\t\tstart   \n\t\t\t\t\t\t\t\tresults{\n\t\t\t\t\t\t\t\t\tid   \n\t\t\t\t\t\t\t\t\tstatus \n\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t\t\t\tcolor\n\t\t\t\t\t\t\t\t\t\t\tdescription\n\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\tgherkin\n\t\t\t\t\t\t\t\t\t\texamples \n\t\t\t\t\t\t\t\t\t\t\t{ \n\t\t\t\t\t\t\t\t\t\t\tid   \n\t\t\t\t\t\t\t\t\t\t\tstatus \n\t\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\t\t\tname\n\t\t\t\t\t\t\t\t\t\t\t\t\tcolor\n\t\t\t\t\t\t\t\t\t\t\t\t\tdescription  \n\t\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t\t\ttest \n\t\t\t\t\t\t\t\t\t\t\t{\n\t\t\t\t\t\t\t\t\t\t\tissueId \n\t\t\t\t\t\t\t\t\t\t\t}  \n\t\t\t\t\t\t\t\t\t\ttestExecution {\n\t\t\t\t\t\t\t\t\t\tissueId          \n\t\t\t\t\t\t\t\t\t\t\t\t\t}      \n\t\t\t\t\t\t\t\t\t\t}      \n\t\t\t\t\t\t\t}        \n\t\t\t\t}        warnings\n\t\t\t\t\t\tcreatedTestEnvironments\n\t\t\t\t\t\t}\n\n\t\t\n        }\n                        "
                                }),
                                _e)]))];
                    case 2:
                        response = _g.sent();
                        return [2 /*return*/, response.json()
                            //var ret =data.data.createTestExecution.testExecution.issueId
                        ];
                }
            });
        });
    };
    XRAYSupport.prototype.XRAYAuthenticationTESTAPI = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch('https://xray.cloud.xpand-it.com/api/v1/authenticate', {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                "client_id": "7C26EB6401AE4C0FB4081DE3DB76413C",
                                "client_secret": "1ec6ce2d4dbca8149624f31641bca7541ceacb60a6294075521ba0f56bd38ba8"
                            })
                        })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    XRAYSupport.prototype.getTestRunsAPI = function (issueId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            var _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = fetch;
                        _b = [GraphQLURI];
                        _e = {
                            method: "Post"
                        };
                        _f = { "Content-Type": "application/json" };
                        _c = "Authorization";
                        _d = "Bearer ";
                        return [4 /*yield*/, this.XRAYAuthenticationAPI()];
                    case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([(_e.headers = (_f[_c] = _d + (_g.sent()) + "", _f),
                                _e.body = JSON.stringify({
                                    query: "\n                                        {getTestRuns( testExecIssueIds: [\"" + issueId + "\"], start:0, limit: 100 )\n                                        {\n                                            total\n                                            limit   \n                                            start    \n                                            results\n                                                {\n                                                    id\n                                                    test \n                                                        {       \n                                                            issueId  \n                                                                jira(fields: [\"key\"])\n                                                        }        \n                                                } \n                                        }\n                                    }\n                                \n                                        "
                                }),
                                _e)]))];
                    case 2:
                        response = _g.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    XRAYSupport.prototype.updateTestRunsAPI = function (TestRunId, Status) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            var _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = fetch;
                        _b = [GraphQLURI];
                        _e = {
                            method: "Post"
                        };
                        _f = { "Content-Type": "application/json" };
                        _c = "Authorization";
                        _d = "Bearer ";
                        return [4 /*yield*/, this.XRAYAuthenticationAPI()];
                    case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([(_e.headers = (_f[_c] = _d + (_g.sent()) + "", _f),
                                _e.body = JSON.stringify({
                                    query: "\n                        mutation \n                        {    \n                        updateTestRunStatus( id: \"" + TestRunId + "\", status: \"" + Status + "\")    \n                        }\n                        \n                \n                        "
                                }),
                                _e)]))];
                    case 2:
                        response = _g.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    XRAYSupport.prototype.addTestExecutionAPI = function (testPlanIssueid, TestExecutionIssueId) {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b, _c, _d;
            var _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = fetch;
                        _b = [GraphQLURI];
                        _e = {
                            method: "Post"
                        };
                        _f = { "Content-Type": "application/json" };
                        _c = "Authorization";
                        _d = "Bearer ";
                        return [4 /*yield*/, this.XRAYAuthenticationAPI()];
                    case 1: return [4 /*yield*/, _a.apply(void 0, _b.concat([(_e.headers = (_f[_c] = _d + (_g.sent()) + "", _f),
                                _e.body = JSON.stringify({
                                    query: "\n                       mutation {\n                            addTestExecutionsToTestPlan(issueId: \"" + testPlanIssueid + "\", testExecIssueIds: [\"" + TestExecutionIssueId + "\"])\n                                {\n                                    addedTestExecutions\n                                    warning\n                                }\n                        }\n                \n                        "
                                }),
                                _e)]))];
                    case 2:
                        response = _g.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    return XRAYSupport;
}());
exports.XRAYSupport = XRAYSupport;
exports["default"] = XRAYSupport;
