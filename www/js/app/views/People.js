dojo.provide('app.views.People');

dojo.declare('app.views.People', [ dijit._Widget, dijit._Templated ], {
  templateString : dojo.cache('app.views', 'People/People.html'),
  personTemplate : dojo.cache('app.views', 'People/Person.html'),

  postCreate : function() {
    this.domNode.innerHTML = dojo.map(this.people, function(p) {
      return dojo.string.substitute(this.personTemplate, p.data);
    }, this).join('');
  }
});
