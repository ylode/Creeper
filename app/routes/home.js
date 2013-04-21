module.exports = function (app) {
  var path = require('path')
    , middlewares = require(path.join(app.get('basepath'),'/app/libs/routing-middleware'))(app)
    , _ = require('underscore');

  app.get('/', middlewares.group.main, home);

  function home(req,res,next){
    var path = require('path')
      , utilities = require(path.join(app.get('basepath'),'/app/libs/utilities'))
      , lang = app.i18n.getLocale();

      var data = JSON.parse(JSON.stringify(require(path.join(app.get('basepath'),'/app/data'))))
      , home=[];

      return res.render('home', {
      'id':'home',
      'meta':{
        'lang':lang,
        'title':''
      },
      home:data.home,
      'scripts':[
        '/javascripts/models/royalslider_widget_init.js'
      ]
    });
  };
};

