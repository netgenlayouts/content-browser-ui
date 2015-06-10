define(['underscore', 'backbone'], function(_, Backbone){
  'use strict';

  return Backbone.Model.extend({

    get: function(attr) {
      // Call the getter if available
      if (attr in this) {
        return _.isFunction(this[attr]) ? this[attr].call(this) : this[attr];
      }

      return Backbone.Model.prototype.get.call(this, attr);
    },

    set: function(key, value, options) {
      var attrs, attr, setter;

      // Normalize the key-value into an object
      if (_.isObject(key) || key == null) {
        attrs = key;
        options = value;
      } else {
        attrs = {};
        attrs[key] = value;
      }

      // always pass an options hash around. This allows modifying
      // the options inside the setter
      options = options || {};

      // Go over all the set attributes and call the setter if available
      for (attr in attrs) {
        setter = '$'+attr;
        if (_.isFunction(this[setter])) {
          attrs[attr] = this[setter].call(this, attrs[attr], options);
        }
      }

      return Backbone.Model.prototype.set.call(this, attrs, options);
    },

    set_if_empty: function(key, value){
      console.log(this.get(key));
      return !this.has(key) && this.set(key, value);
    },


    is_selected: function(){
      return this.get('selected');
    },

    selected_children: function(){
      return _.filter(this.children(), function(item){
        return item.get('selected');
      });     
    },

    select: function(){
      this.children && _.invoke(this.children(), 'select');
      this.set({selected: true, indeterminate: false});      
      this.children && this.detect_indeterminate();
      this.trigger('select');
      return this;
    },

    unselect: function(){
      this.children && _.invoke(this.children(), 'unselect');
      this.set({selected: false, indeterminate: false});
      this.children && this.detect_indeterminate();
      this.trigger('unselect');
      return this;
    },

    countable: function(){
      if(this.parent && this.parent()){
        return this.parent().get('indeterminate') !== false && this.get('selected') && !this.get('indeterminate');
      }else{
        return this.get('selected') && !this.get('indeterminate');
      }
    },


    detect_indeterminate: function(){
      var parent = this.parent(),
          selected_siblings = _.filter(this.siblings(), function(m){ return m.get('selected'); }),
          _l = selected_siblings.length;
      if(parent){
        if(_l === 0){
          parent.set({selected: false, indeterminate: false});
        }else{
          parent.set({selected: true, indeterminate: parent.children().length !== _l});
        }
      }
      return this;
    },


    add_to_set: function(attr, value){
      this.set(attr, _.union(this.get(attr) || [], [value]));
      return this;
    },

    remove_from_set: function(attr, value){
      this.set(attr, _.without(this.get(attr) || [], value));
      return this;
    },

    snapshot: function(){
      this.state = _.extend({}, this.attributes);
      console.log(this.state);
      return this;
    },

    revert: function(opts){
      opts || (opts = {});
      this.attributes = _.extend({}, this.state);
      !opts.silent && this.trigger('change', this.attributes);
      return this;
    }


  });
  

});