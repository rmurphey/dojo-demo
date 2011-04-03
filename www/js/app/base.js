dojo.provide('app.base');
/**
 * This file is your application's base JavaScript file;
 * it is loaded into the page by the dojo.require() call in
 * index.html. You can write code in this file, use it to
 * express dependencies on other files, or both. Generally,
 * this file should be used only for bootstrapping code;
 * actual functionality should be placed in other files inside
 * the www/js/app directory.
 */

/**
 * You can specify dependencies on other files by adding
 * dojo.require() statements for them:
 *
 *    dojo.require('dijit.Dialog');
 *
 * This works for your application's files, too:
 *
 *    dojo.require('app.Foo');
 *
 * The above would look for a file located at
 * www/js/app/Foo.js; however, it's important to note
 * that this only works because we've specified a modulePath for
 * the 'app' namespace in index.html. If we do not specify a
 * modulePath for a namespace, dojo.require will assume that the
 * namespace corresponds to a directory that is a sibling of
 * the directory that contains dojo.js. The modulePath setting
 * in index.html overrides that default, providing a location
 * for the namespace relative to the location of dojo.js.
 *
 * Note also that any files you include via dojo.require()
 * MUST include a call to dojo.provide at the beginning;
 * the dojo.provide() function should be passed a string
 * that specifies how you expect the module to be referred
 * to in dojo.require() calls:
 *
 *    dojo.provide('app.Foo');
 *
 * Finally, note that you do not need to express all of your
 * application's dependencies in this one file; individual files
 * can express their own dependencies as well.
 */
dojo.require('app.views.Person');
dojo.require('app.views.People');
dojo.require('app.models.People');

/**
 * Any functionality that depends on the DOM being available
 * should be passed inside a function to dojo.ready. If you're
 * making a single-page app, this is your application controller.
 */
dojo.ready(function() {
  var peopleData = app.models.People;

  // load the initial data for the page
  dojo.when(peopleData.load(), function() {

    var people = peopleData.getPeople(),
        peopleWidget = new app.views.People({ people : people }, 'people'),
        personWidget,
        person;

    dojo.connect(peopleWidget, 'onSelect', function(personId) {

      // destroy the old person widget if there is one
      if (personWidget) { personWidget.destroy(); }

      // get an instance of the Person model for the requested person
      person = peopleData.getPerson(personId);

      // set up the person widget, passing in the person model
      personWidget = new app.views.Person({
        person : person
      }).placeAt('detail');

      // ask the model for the person's tweets, and pass them
      // to the widget once we have them
      person.getTweets().then(function(tweets) {
        personWidget.set('tweets', tweets);
      });

      // ask the model for the person's weather, and pass it
      // to the widget once we have it
      person.getWeather().then(function(weather) {
        personWidget.set('weatherData', weather);
      });

    });
  });
});
