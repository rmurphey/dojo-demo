dojo.provide('app.views.Weather');

dojo.require('dijit._Widget');
dojo.require('dijit._Templated');
dojo.require('app.services.YQL');

dojo.declare('app.views.Weather', [ dijit._Widget, dijit._Templated ], {
  templateString : dojo.cache('app.views', 'Weather/Weather.html'),

  postCreate : function() {
    dojo.when(app.services.YQL.weather(this.location),
  }
});
