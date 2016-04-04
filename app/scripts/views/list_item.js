'use strict';

var ListBaseView = require('./list_base');
var Items = require('../collections/items');

module.exports = ListBaseView.extend({

  tagName: 'tr',

  className: 'item',

  browse_tab: function(){
    return this.parent.tabs;
  },

  events:{
    'click a': '$open'
  },

  $open: function(e){
    e.preventDefault();
    if(this.model.has_children()){
      if(this.parent.name === 'search'){
        this.open_search_item();
      }else{
        var result = this.parent.tabs.tree_view.click_item_by_id(this.model.id);
        if(!result){
          this.open_list_item_with_root();
        }
        this.setup_root_model();
      }
    }
  },

  open_search_item: function(){
    var items = new Items();
    items.browser = this.parent.browser;

    items.fetch_list_by_model_id(this.model.id, {
      success: function(){
        this.parent.collection.reset(items.models);
        this.show_search_breadcrumb(items);
        this.disable_search_panel();
      }.bind(this)
    });
  },

  disable_search_panel: function(){
    $('.search-left-panel').find('*').prop('disabled', true);
  },

  open_list_item_with_root: function(){
    var items = new Items();
    items.browser = this.parent.browser;

    items.fetch_list_by_model_id(this.model.id, {
      success: function(){
        this.parent.collection.reset(items.models);
        this.show_breadcrumb(items);
      }.bind(this)
    });
  },

  setup_root_model: function(){
    this.parent.tabs.root_model = this.model;
  },

  show_breadcrumb: function(collection){
    this.parent.tabs.render_breadcrumb(collection);
  },

  show_search_breadcrumb: function(collection){
    this.parent.tabs.render_search_breadcrumb(collection);
  }

});
