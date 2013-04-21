var express = require('express')
    ,   app = express()
    ,   _ = require('underscore')
    ,   path = require('path')
    ,   fs = require('fs')
    ,   lessMiddleware = require('less-middleware')
    ,   utilities = require(path.join(__dirname,'/app/libs/utilities'));

app.config = require('nconf')
    .argv()
    .env()
    .defaults({store:require(path.join(__dirname,'/app/config/default'))});

app.i18n = require('i18n');
app.i18n.configure({
    locales:app.config.get('lang:all'),
    defaultLocale:app.config.get('lang:default'),
    cookie:'l',
    extension: '.json',
    directory: path.join(__dirname,'/app/locales')
});

function commonAppConfig(){
    app.set('port', process.env.PORT || app.config.get('application:port') || 3000);
    app.set('basepath', __dirname);
    app.use(express.cookieParser());
    app.use(app.i18n.init);
    app.use(function(req, res, next) {
        app.i18n.setLocale(utilities.langResolver(req,res,app));
        next();
    });
    require(path.join(__dirname,'/app/libs/helpers'))(app);
    app.set('views', path.join(__dirname,'/app/views'));
    app.set('view engine', 'jade');
    //if(app.config.get('less')){
        app.use(lessMiddleware(_.extend({src: path.join(__dirname,'/app/src/'), dest: path.join(__dirname,'/app/public/')},app.config.get('less'))));
    //}
    //app.use(express.favicon(path.join(__dirname,'/app/public/images/icons/favicon.ico')));
    app.use(express.bodyParser());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, '/app/public')));
    if(app.config.get('errorHandler')){
        app.use(express.errorHandler(app.config.get('errorHandler')));
    }
};

app.configure('development',function(){
    commonAppConfig();
});

app.configure('production', function (){
    app.config.defaults({store:_.extend(require(path.join(__dirname, '/app/config/default')), require(path.join(__dirname, '/app/config/production')))});
    commonAppConfig();
});

require(path.join(__dirname,'/app/routes'))(app);

app.listen(app.get('port'));
if(app.config.get('application:verbose')){
    console.log('Server listening on port ' + app.get('port'));
}
