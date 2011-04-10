dojo.provide('app.controllers.People');

dojo.require('app.views.Person');
dojo.require('app.views.People');
dojo.require('app.models.People');
dojo.require('dojo.Stateful');

(function() {

var peopleData = app.models.People;

app.controllers.People = new dojo.Stateful({
  init: function() {
    this.watch('personId', this._showPerson);

    // load the initial data for the page
    return dojo.when(peopleData.load(), function() {
      // create the view using the data and place it in
      // the element with id="people"
      this.peopleWidget = new app.views.People({
        // ask the people model for the list of people
        people: peopleData.getPeople()
      }, 'people');
    });
  },

  _showPerson : function(propName, oldVal, newVal) {
    if (oldVal === newVal) { return; }

    // destroy the old person widget if there is one
    if (this.personWidget) {
      this.personWidget.destroy();
    }

    var person = peopleData.getPerson(newVal);

    // set up the person widget, passing in the person model
    var personWidget = this.personWidget = new app.views.Person({
      // get an instance of the Person model for the requested person
      person: person
    }).placeAt('detail');

    // ask the model for the person's tweets, and pass them
    // to the widget once we have them
    person.getTweets().then(
      dojo.hitch(personWidget, 'set', 'tweets')
    );

    // ask the model for the person's weather, and pass it
    // to the widget once we have it
    person.getWeather().then(
      dojo.hitch(personWidget, 'set', 'weatherData')
    );
  }
});

}());
