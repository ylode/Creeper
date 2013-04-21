module.exports = function(app){

  //Les Middlewares
  function oldBrowser(req, res, next){
    var useragent = require('useragent');
    require('useragent/features');

    var agent = useragent.parse(req.headers['user-agent']);

    switch(agent.family){
      case 'Safari':
        if(agent.satisfies('>=5.0')){
          return next();
        }
        break;
      case 'Mobile Safari':
        if(agent.satisfies('>=5.0')){
          return next();
        }
        break;
      case 'IE':
        if(agent.satisfies('>=9.0')){
          return next();
        }
        break;
      case 'IE Mobile':
        if(agent.satisfies('>=9.0')){
          return next();
        }
        break;
      case 'Android':
        if(agent.satisfies('>=4.1')){
          return next();
        }
        break;
      case 'Blackberry':
        break;
      case 'Nokia':
        break;
      default:
        return next();
    }
    return res.redirect('/museum');
  };

  function offline(req,res,next){
    if(app.config.get('offline')){
      return res.redirect('/offline');
    }
    return next();
  };

  // Les Public
  var exports = {};
  exports.oldBrowser = oldBrowser;
  exports.offline = offline;
  exports.group = {};
  exports.group.main = [oldBrowser,offline];

  return exports;
}