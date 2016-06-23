'use strict';

var Core = require('core_boot');

module.exports = Core.View.extend({
  template: 'preview',
  set_context: function(){
    Core.View.prototype.set_context.apply(this, arguments);
    this.context.html =  this.model.get('html') || '<h3>' + this.model.get('name') + '</h3>'
    return this;
  },
});
