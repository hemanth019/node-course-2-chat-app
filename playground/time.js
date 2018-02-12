var moment = require('moment');

var date = moment();
date.subtract(1, 'hours');
console.log(date.format('hh:mm a'));

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));
