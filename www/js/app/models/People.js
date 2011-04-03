dojo.provide('app.models.People');

dojo.require('dojo.store.Memory');
dojo.require('app.models.Person');

(function() {

var store;

app.models.People = {
  load : function() {
    if (store) { return store.data; }

    return dojo.xhrGet({
      url : 'data/people.json',
      handleAs : 'json',
      load : function(data) {
        store = new dojo.store.Memory({ data : data });
      }
    });
  },

  getPerson : function(id) {
    return new app.models.Person(store.get(id));
  },

  getPeople : function() {
    return dojo.map(store.data, function(p) {
      return new app.models.Person(p);
    });
  }
};

}());
