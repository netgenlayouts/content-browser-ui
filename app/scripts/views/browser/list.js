define(['underscore', 'app', 'view', './list_item'], function(_, App, View, ListItem){
  'use strict';

  return View.extend({

    template: 'browser/list',

    extend_with: ['browser', 'tabs', 'name'],

    view_items_el: 'tbody',

    name: 'list',

    ViewItem: ListItem,

    events: {
      'contextmenu': '$show_dropdown_menu',
      'change .column-check': '$toggle_table_columns'
    },

    initialize: function(){
      View.prototype.initialize.apply(this, arguments);

      this.context.columns = this.tabs.columns;

      App.on('browser:click', this.hide_dropdown_menu);

      this.listenTo(this.collection, 'reset', this.render);

      return this;
    },

    $show_dropdown_menu: function(e){
      e.preventDefault();
      this.$('.dropdown-menu').css({
        display: 'block',
        left:  e.pageX - this.$el.offset().left,
        top: e.pageY - this.$el.offset().top
     });
    },

    hide_dropdown_menu: function(){
      $('.dropdown-menu').hide();
    },

    $toggle_table_columns: function(e){
      var name = e.target.name,
          $th = $('th[data-name="' + name + '"]'),
          $td = $('td[data-name="' + name + '"]');

      if(e.target.checked){
        $th.removeClass('hidden');
        $td.removeClass('hidden');
      }else{
        $th.addClass('hidden');
        $td.addClass('hidden');
      }

      this.tabs.columns.save_visibility(name, e.target.checked);

      this.hide_dropdown_menu();
    },

  });

});
