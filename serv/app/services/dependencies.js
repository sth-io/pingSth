var rootPath = GLOBAL.conf.rootPath;

var Deps =  {
    Log: require(rootPath+'app/services/log'),
    Email: require(rootPath+'app/services/email'),
    Model: {
        Website: require(rootPath+'app/models/website'),
        Status: require(rootPath+'app/models/status')
    }
}


module.exports = Deps;
