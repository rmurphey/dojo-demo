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
    // this.domNode refers to the root element of the template
    // that is specified for the view
    this.connect(this.domNode, 'click', '_handleClick');
  },

  // "private" methods -- methods that should only be used
  // internally -- generally begin with an underscore
  _handleClick : function(e) {

    // when a click occurs, we look to see whether its target
    // was one of the list items
    var t = e.target,
        id;

    if (t.nodeName.toLowerCase() !== 'li') { return; }

    // if so, we mark the clicked list item as the selected item
    dojo.forEach(this.domNode.children, function(c) {
      dojo.removeClass(c, 'selected');
    });

    dojo.addClass(t, 'selected');

    // then, we call the onSelect method, which other parts
    // of the code can connect to using dojo.connect
    this.onSelect(dojo.attr(t, 'data-id'));
  },

  // this method is intended for other pieces of the code
  // to connect to using dojo.connect -- this allows other
  // pieces of code to react to a selection in the view.
  // connected functions receive the same arguments as the
  // function to which they connect -- in this case, the id
  // of the selected person.
  onSelect : function(id) { }
});
