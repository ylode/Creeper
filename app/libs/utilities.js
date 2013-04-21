exports.langResolver = function(req,res,app){
  var langs = app.config.get('lang')
    , _ = require('underscore');

  if(req.query && req.query.l){
      if(_.indexOf(langs.all,req.query.l)>-1){
        res.cookie('l', (req.query.l).toLowerCase());
        return (req.query.l).toLowerCase();
      }
  }
  if(req.cookies && req.cookies.l) {
    if(_.indexOf(langs.all,req.cookies.l)>-1){
      return req.cookies.l;
    }
  }
  res.cookie('l', (langs.default).toLowerCase());
  return (langs.default).toLowerCase();
};

return;