const filesystem = require('fs')

var reader = function (readPath) {
  if (typeof readPath !== 'string' || !readPath) {
    this.readPath = 'data.json';
  } else {
    this.readPath = readpath;
  }
  this.readData = function () {
    var path = this.readPath;
    console.log(this);
    var _data =  filesystem.readFileSync(path, {encoding: 'utf8'});
    return JSON.parse(_data);
  }
};
// pass file path on instanciation

module.exports = new reader();
