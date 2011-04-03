dojo.provide('app.views.Person');

dojo.require('dijit._Widget');
dojo.require('dijit._Templated');

dojo.declare('app.views.Person', [ dijit._Widget, dijit._Templated ], {
  templateString : dojo.cache('app.views', 'Person/Person.html'),
  tweetTemplate : dojo.cache('app.views', 'Person/Tweet.html'),
  weatherTemplate : dojo.cache('app.views', 'Person/Weather.html'),

  // mark the weather and twitter areas as loading
  postCreate : function() {
    dojo.forEach([ 'latestTweet', 'olderTweets', 'weather' ], function(n) {
      dojo.addClass(this[n], 'loading');
    }, this);
  },

  _setTweetsAttr : function(tweets) {
    dojo.removeClass(this.olderTweets, 'loading');
    dojo.removeClass(this.latestTweet, 'loading');

    var latest = tweets.shift();

    this.olderTweets.innerHTML = dojo.map(tweets, function(t) {
      return dojo.string.substitute(this.tweetTemplate, t);
    }, this).join('');

    this.latestTweet.innerHTML = dojo.string.substitute(
      this.tweetTemplate, latest
    );
  },

  _setWeatherDataAttr : function(weather) {
    dojo.removeClass(this.weather, 'loading');
    this.weather.innerHTML = dojo.string.substitute(
      this.weatherTemplate, weather
    );
  }
});
