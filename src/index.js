/* eslint-disable */
const fs = require('fs');

module.exports = function () {
    return {
        noColors:           true,
        report:             '',
        startTime:          null,
        uaList:             null,
        currentFixtureName: null,
        testCount:          0,
        skipped:            0,
        testMetaWithExec:   new Map(),

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
            var hasErr = !!testRunInfo.errs.length;
            var result = hasErr ? 'failed' : 'passed';

            const testEndTime = this.moment().utc().format();
            const testStartTime = this.moment(testEndTime).subtract(testRunInfo.durationMs, 'milliseconds').utc().format();

            if (testRunInfo.unstable)
                name += ' (unstable)';

            name = this.escapeHtml(name);

            console.log('- Execution done for test[', metaData.key, ']: ', name, '| ', 'Status: ', result);

            //Adding test meta with exexution result in Map object
            this.testMetaWithExec.set(metaData.key, result);

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

            //Save meta in a file
            var testMetaWithExecJSON = this.map_to_object(this.testMetaWithExec);
            console.log('\nCreated execution JSON: ', JSON.stringify(testMetaWithExecJSON), '\n\nSaved to testMetaData.json file!!!\n')

            fs.writeFileSync('testMetaData.json', JSON.stringify(testMetaWithExecJSON), function (err) {
                if (err) throw err;
                console.log('Saved!');
              })
        },
        map_to_object(map) {
            const out = Object.create(null)
            map.forEach((value, key) => {
              if (value instanceof Map) {
                out[key] = map_to_object(value)
              }
              else {
                out[key] = value
              }
            })
            return out
          }
    };
};
