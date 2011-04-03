dojo.provide('app.controllers.People');

dojo.require('app.views.Person');
dojo.require('app.views.People');
dojo.require('app.models.People');

app.controllers.People = {
  init : function() {
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
  }
};
