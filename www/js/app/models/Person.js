dojo.provide('app.models.Person');

dojo.require('app.services.Twitter');
dojo.require('app.services.YQL');

(function() {

dojo.declare('app.models.Person', [], {
  constructor : function(data) {
    this.data = data;
  },

  getTweets : function() {
    return app.services.Twitter.tweets(this.data.twitter);
  },

  getWeather : function() {
    return app.services.YQL.weather(this.data.location);
  }
});

}());
