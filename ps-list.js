const psList = require('ps-list');

psList().then(data => {
    console.log(data);
    //=> [{pid: 3213, name: 'node', cmd: 'node test.js', cpu: '0.1'}, ...]
});

