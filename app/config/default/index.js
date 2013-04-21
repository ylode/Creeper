module.exports = {
    'application':{
        'port':'5000',
        'verbose':true
    },
    'baseURL':"http://mtl-summit.herokuapp.com/",
    'lang':{
      'all':[
        'fr',
        'en'
      ],
      'default':'fr'
    },
    'less':{
      'once':false,
      'force': true,
      'debug':true,
      'compress': false,
      'optimization': 0
    },
    'errorHandler':{
      'dumpExceptions': true,
      'showStack': true
    },
    'analytics':{
      'UA-Code':'UA-39673007-1',
      'GTM-Code':'GTM-XKLC'
    }
};