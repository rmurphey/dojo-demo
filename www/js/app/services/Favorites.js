dojo.provide('app.services.Favorites');

dojo.require('dojo.store.Memory');

(function() {
  var storage = (function() {
        try {
          return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
          return false;
        }
      }()),

      data = storage ? window.localStorage.getItem('favorites') : null;

  dojo.declare('app.services.Favorites', [ dojo.store.Memory ], {

    constructor : function() {
      this.inherited(arguments);

      dojo.subscribe('/favorites/add', dojo.hitch(this, 'put'));
      dojo.subscribe('/favorites/remove', this, function(person) {
        this.remove(person.id);
      });
    },

    put : function() {
      this.inherited(arguments);
      this._save();
    },

    remove : function() {
      this.inherited(arguments);
      this._save();
    },

    _save : function() {
      if (!storage) { return; }
      window.localStorage.setItem('favorites', JSON.stringify(this.data));
    }

  });

  // create an instance that overwrites the constructor
  app.services.Favorites = new app.services.Favorites({
    data : data ? JSON.parse(data) : []
  });

}());
