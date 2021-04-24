# testcafe-reporter-ng-xunit
[![Build Status](https://travis-ci.org/SkyWalker1005/testcafe-reporter-ng-xunit.svg)](https://travis-ci.org/SkyWalker1005/testcafe-reporter-ng-xunit)

This is the **ng-xunit** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://raw.github.com/SkyWalker1005/testcafe-reporter-ng-xunit/master/media/preview.png" alt="preview" />
</p>

## Install

```
npm install testcafe-reporter-ng-xunit
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter ng-xunit
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('ng-xunit') // <-
    .run();
```

## Author
Lalit Sharma (https://naukrigulf.com)
