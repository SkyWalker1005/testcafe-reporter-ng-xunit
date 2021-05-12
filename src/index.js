/* eslint-disable */
var XRAYSupport_1 = require("../src/XRAYSupport");
var express = require('express');
var app = express();
app.use(express.json());
var xray = new XRAYSupport_1.XRAYSupport();
var minimist = require('minimist');
var args = minimist(process.argv.slice(2));
var environment = args.env;
var ProjectName = args.TestProjectName; //"NGRES"
var PlanName = args.TestPlanName; //"NGRES-7527"
var TestCaseList = new Map();
var TestRunList = new Map();
var list = []; //Issues list read from meta
var listOfNGTMIssueIds = new Array();
var listOfTestRunIds = new Array();

module.exports = function () {
    return {
        noColors:           true,
        report:             '',
        startTime:          null,
        uaList:             null,
        currentFixtureName: null,
        testCount:          0,
        skipped:            0,

        reportTaskStart (startTime, userAgents, testCount) {
            this.startTime = startTime;
            this.uaList    = userAgents.join(', ');
            this.testCount = testCount;

            const time = this.moment(startTime).format('MMM/DD/YYYY hh:mm:ss a');

            console.log('---------------------------------------------------------------------------', '\n\n', '## Testing started: ', time, '##', '\n', 'Running ', testCount, ' tests in: ', userAgents, '\n\n', '----------------------------------------------------------------------------', '\n');
        },

        reportFixtureStart (name) {
            this.currentFixtureName = this.escapeHtml(name);

            console.log('\n', '>>>Starting fixture: ', name, '\n');
        },

        reportTestStart (name) {
            console.log('- Starting test: ', name, '\n');
        },

        _renderErrors (errs) {
            this.report += this.indentString('<failure>\n', 4);
            this.report += this.indentString('<![CDATA[', 4);

            errs.forEach((err, idx) => {
                err = this.formatError(err, `${idx + 1}) `);

                this.report += '\n';
                this.report += this.indentString(err, 6);
                this.report += '\n';
            });

            this.report += this.indentString(']]>\n', 4);
            this.report += this.indentString('</failure>\n', 4);
        },

        reportTestDone (name, testRunInfo, meta) {
            var metaData = meta;
            list.push(metaData.key);
            var hasErr = !!testRunInfo.errs.length;
            var result = hasErr ? 'failed' : 'passed';

            const testEndTime = this.moment().utc().format();
            const testStartTime = this.moment(testEndTime).subtract(testRunInfo.durationMs, 'milliseconds').utc().format();

            if (testRunInfo.unstable)
                name += ' (unstable)';

            name = this.escapeHtml(name);

            console.log('- Execution done for test: ', name, '| ', 'Status: ', result);

            var openTag = `<testcase classname="${this.currentFixtureName}" ` +
                          `name="${name}" time="${testRunInfo.durationMs}" ` +
                          `status="${result}" started-at="${testStartTime}" finished-at="${testEndTime}">\n`;

            this.report += this.indentString(openTag, 2);

            if (testRunInfo.skipped) {
                this.skipped++;
                this.report += this.indentString('<skipped/>\n', 4);
            }
            else if (hasErr)
                this._renderErrors(testRunInfo.errs);

            this.report += this.indentString('</testcase>\n', 2);
        },

        _renderWarnings (warnings) {
            this.setIndent(2)
                .write('<system-out>')
                .newline()
                .write('<![CDATA[')
                .newline()
                .setIndent(4)
                .write(`Warnings (${warnings.length}):`)
                .newline();

            warnings.forEach(msg => {
                this.setIndent(4)
                    .write('--')
                    .newline()
                    .setIndent(0)
                    .write(this.indentString(msg, 6))
                    .newline();
            });

            this.setIndent(2)
                .write(']]>')
                .newline()
                .write('</system-out>')
                .newline();
        },

        reportTaskDone (endTime, passed, warnings) {
            var name     = `TestCafe Tests: ${this.escapeHtml(this.uaList)}`;
            var failures = this.testCount - passed;
            var time     = endTime - this.startTime;

            const taskEndTime = this.moment(endTime).utc().format();
            const taskStartTime = this.moment(this.startTime).utc().format();

            this.write('<?xml version="1.0" encoding="UTF-8" ?>')
                .newline()
                .write(`<testsuite name="${name}" tests="${this.testCount}" failures="${failures}" skipped="${this.skipped}"` +
                       ` errors="${failures}" time="${time}" timestamp="${endTime.toUTCString()}"` +
                       ` started-at="${taskStartTime}" finished-at="${taskEndTime}" >`)
                .newline()
                .write(this.report);

            if (warnings.length)
                this._renderWarnings(warnings);

            this.setIndent(0)
                .write('</testsuite>');


            //Xray Code----------------------->

            //Call to Get All Plan List---------------------->>>>>>>>>>>>>>>>>
            xray.getTestPlansKeyAPI(ProjectName)
            .then(function (data) {
            //console.log(data.data.createTestExecution.testExecution.issueId)
            var PlanIssueKey;
            data.data.getTestPlans.results.forEach(function (results) {
                if (results.jira.key == PlanName) {
                    PlanIssueKey = results.issueId;
                }
            });
            console.log("IssueID for " + ProjectName + " is :: " + PlanIssueKey);
            //Call to get TestCase List by Key
            xray.getTestCasesKeysAPI(PlanIssueKey)
                .then(function (data) {
                console.log('Trying to get TestCases for Plan issue Key:: >', PlanIssueKey);
                data.data.getTestPlan.tests.results.forEach(function (results) {
                    for (var y = 0; y < list.length; y++) {
                        //console.log('List of Y::'+list[y]+ '  Key from Xray::' + results.jira.key)
                        if (results.jira.key == list[y]) {
                            //console.log('List of Y::'+list[y]+'results from xray:: '+results.issueId)
                            TestCaseList.set(list[y], results.issueId);
                            listOfNGTMIssueIds[y] = results.issueId;
                        }
                    }
                });
                console.log('List have ::>>' + TestCaseList);
                console.log('List have ::>>' + listOfNGTMIssueIds);
                var res = listOfNGTMIssueIds.toString().split(",");
                var op = listOfNGTMIssueIds.join("\",\"");
                var TestCaseIssueIDList = "\"" + op + "\"";
                console.log(TestCaseIssueIDList);
                xray.createTestExecutionAPI(TestCaseIssueIDList, ProjectName)
                    .then(function (data) {
                    console.log("Test Execution ID is: " + data.data.createTestExecution.testExecution.issueId);
                    var TestExecutionID = data.data.createTestExecution.testExecution.issueId;
                    var TestExecutionKEY = data.data.createTestExecution.testExecution.jira.key;
                    console.log('Test Execution key is :' + TestExecutionKEY);
                    xray.getTestRunsAPI(TestExecutionID)
                        .then(function (data) {
                        data.data.getTestRuns.results.forEach(function (results) {
                            for (var q = 0; q < list.length; q++) {
                                if (results.test.jira.key == list[q]) {
                                    //console.log("TestRUnID for NGTM-2340 is :: "+results.id)
                                    TestRunList.set(list[q], results.id);
                                    listOfTestRunIds[q] = results.id;
                                }
                            }
                        });
                        //console.log(TestRunList)
                        //console.log(TestRunList.get('NGTM-2340'))
                        for (var s = 0; s < TestRunList.size; s++) {
                            console.log('Updating for ::>>>' + listOfTestRunIds[s]);
                            xray.updateTestRunsAPI(listOfTestRunIds[s], "PASSED")
                                .then(function (data) {
                            }); // Ending of updateTestRunsAPI
                        }
                        console.log('Adding this plankey::>' + PlanIssueKey + " with this exec :: " + TestExecutionID);
                        xray.addTestExecutionAPI(PlanIssueKey, TestExecutionID)
                            .then(function (data) {
                            console.log(data.data.addTestExecutionsToTestPlan);
                        }); // Ending of addTestExecutionAPI
                    }); // Ending of getTestRunsAPI
                }); // Ending of getTestCasesKeysAPI
            }); // Ending of getTestCasesKeysAPI
            }); // Ending of getTestPlansKeyAPI

        }
    };
};
