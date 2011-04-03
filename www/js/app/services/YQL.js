dojo.provide('app.services.YQL');

dojo.require('dojo.io.script');

app.services.YQL = {
  _doQuery : function(config) {
    dojo.io.script.get({
      url : 'http://query.yahooapis.com/v1/public/yql',
      callbackParamName : 'callback',
      content : dojo.mixin({
        format : 'json'
      }, config.content),
      load : config.load
    });
  },

  weather : function(location) {
    var dfd = new dojo.Deferred();

    dojo.when(this.zip(location), dojo.hitch(this, function(zip) {
      this._doQuery({
        content : {
          q : 'select * from weather.forecast where location=' + zip
        },
        load : function(data) {
          dfd.resolve(data.query.results.channel.item);
        }
      });
    }));

    return dfd.promise;
  },

  zip : function(location) {
    var dfd = new dojo.Deferred();

    this._doQuery({
      content : {
        q : 'select * from geo.placefinder where text="' + location + '"'
      },
      load : function(data) {
        dfd.resolve(data.query.results.Result.uzip);
      }
    });

    return dfd.promise;
  }
};
