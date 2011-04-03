dojo.provide('app.views.People');

dojo.declare('app.views.People', [ dijit._Widget, dijit._Templated ], {
  templateString : dojo.cache('app.views', 'People/People.html'),
  personTemplate : dojo.cache('app.views', 'People/Person.html'),

  postMixInProperties : function() {
    this.listHtml = dojo.map(this.people, function(p) {
      return dojo.string.substitute(this.personTemplate, p.data);
    }, this).join('');
  },

  postCreate : function() {
    this.connect(this.domNode, 'click', '_handleClick');
  },

  _handleClick : function(e) {
    var t = e.target,
        id;

    if (t.nodeName.toLowerCase() !== 'li') { return; }

    dojo.forEach(this.domNode.children, function(c) {
      dojo.removeClass(c, 'selected');
    });

    dojo.addClass(t, 'selected');

    this.onSelect(dojo.attr(t, 'data-id'));
  },

  onSelect : function(id) {
    // stub for connection
  }
});
