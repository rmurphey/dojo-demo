dojo.provide('app.services.Twitter');

dojo.require('dojo.io.script');
dojo.require('dojo.string');

app.services.Twitter = {
  tweets : function(username) {
    var url = 'http://twitter.com/status/user_timeline/' + username + '.json',
        dfd = new dojo.Deferred();

    dojo.io.script.get({
      url : url,
      callbackParamName : 'callback',
      content : { count : 10, format : 'json' },
      load : dojo.hitch(this, function(data) {
        dfd.resolve(dojo.map(data, function(t) {
          return this._processTweet(t, username);
        }, this));
      })
    });

    return dfd.promise;
  },

  _processTweet : function(t, username) {
    return {
      text : t.text,
      date : t.created_at,
      url : [ 'http://twitter.com', username, 'status', t.id_str ].join('/')
    };
  }
};
