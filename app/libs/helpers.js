return module.exports = function (app) {
  app.locals.__ = function(str){
    return app.i18n.__(str);
  };
  app.locals.__n = function(str){
    return app.i18n.__n(str);
  };
  app.locals.returnRes = function(str){
      str = str.replace(".jpg","@2x.jpg")
     return str;
  };
  app.locals.$config = function(params){
    return app.config.get(params);
  };
  app.locals.$translate = function(object){
    var dLang = app.config.get('lang:default')
      , lang = app.i18n.getLocale();

    if (object.hasOwnProperty(lang)) return object = object[lang];
    if (object.hasOwnProperty(dLang)) return object = object[dLang];
    return object;
  };
  app.locals.$linkedIn = function(link){
    var obj = {};
    if(link.indexOf("/")>-1){
      obj.link = link;
      obj.label = "LinkedIn";
    } else {
      obj.link = "https://www.linkedin.com/in/"+link;
      obj.label = link;
    }
    return obj;
  };
    
};