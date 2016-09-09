// loadmodule.js

var hello1 = require('./module');
hello1.setName('Lixiaochun');

var hello2 = require('./module');
hello2.setName('lixiaochun');

hello1.sayHello();