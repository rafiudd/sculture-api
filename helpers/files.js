const path = require('path');

class Files {
    to(path) {
        return __basedir + path;
    }
}
module.exports = new Files();
