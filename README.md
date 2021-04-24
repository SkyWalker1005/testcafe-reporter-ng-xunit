# testcafe-reporter-ng-xunit
[![Build Status](https://travis-ci.org/SkyWalker1005/testcafe-reporter-ng-xunit.svg)](https://travis-ci.org/SkyWalker1005/testcafe-reporter-ng-xunit)

This is the **ng-xunit** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://user-images.githubusercontent.com/48923623/115972633-31c5d880-a56d-11eb-964f-cc369f7506ca.PNG" alt="preview" />
</p>
<p align="center">
    <img src="https://user-images.githubusercontent.com/48923623/115972657-5d48c300-a56d-11eb-9487-c8255d7102bb.PNG" alt="preview" />
</p>
<p align="center">
    <img src="https://user-images.githubusercontent.com/48923623/115972662-620d7700-a56d-11eb-9d30-9b45fa682e24.PNG" alt="preview" />
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
