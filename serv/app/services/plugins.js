 // var Deps = require(GLOBAL.conf.srvcPath+'dependencies'),
    var fs = require('fs'),
    path = require('path');

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function(file) {
        return fs.statSync(path.join(srcpath, file)).isDirectory();
    });
}

var rootPath = function() {
    var root = path.dirname(require.main.filename),
        idx = root.indexOf('/serv');
    root = root.substr(0, idx + 5)+'/';
    return root;
}

var plugins = getDirectories(rootPath() + 'plugins');

function Init(Deps) {
    for (var i = 0, len = plugins.length; i < len; i++) {
        console.log('loading plugin: ' + plugins[i]);
        var prevent = false;
        try {
            require.resolve(rootPath() + 'plugins/' + plugins[i] + '/init.js');
        } catch (e) {
            console.log(e.code)
            prevent = true;
        }
        if (prevent === false) {
            console.log('starting plugin: ' + plugins[i]);
            var plug = require(rootPath() +'plugins/'+ plugins[i] + '/init.js');
            new plug();
        }
    }
}

module.exports = Init();
