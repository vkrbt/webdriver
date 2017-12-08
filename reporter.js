const util = require('util');
const events = require('events');

const start = 'start';
const suiteStart = 'suite:start';
const testStart = 'test:start';
const testPass = 'test:pass';
const testFail = 'test:fail';
const suiteEnd = 'suite:end';
const end = 'end';

let failed = 0;
let passed = 0;
let suits = 0;

const Reporter = function (options) {
  this.on(start, () => {
    console.log('Test started');
  });
  this.on(end, () => {
    console.log(`Test ended.`);
    console.log(`+ Passed tests: ${passed}`);
    console.log(`- Failed tests: ${failed}`);
  });

  this.on(suiteStart, ({ title }) => {
    console.log(`${++suits}. Start suite ${title} >`);
  });
  this.on(suiteEnd, ({ title }) => {
    console.log('--------------------------')
  });

  this.on(testPass, ({ title, parent }) => {
    console.log(`+ ${parent} ${title} passed.`);
    ++passed;
  });

  this.on(testFail, ({ title, parent, err: { message, }, specs }) => {
    console.log();
    console.log(`- ${parent} ${title} failed.`);
    console.log(`Reason: ${message}`);
    console.log('Call Stack: ');
    console.log(specs.join('\n'));
    console.log();
    ++failed;
  });
};

Reporter.reporterName = 'vkrbt reporter';

util.inherits(Reporter, events.EventEmitter);

exports = module.exports = Reporter;