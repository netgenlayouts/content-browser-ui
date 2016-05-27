'use strict';

var Browser = require('./main');

var browser = new Browser({
  title: 'Content browser',
  tree_config: {
    root_path: 'ezcontent' // ezcontent, ezlocation, eztags
  }
}).on('apply', function(){
  alert(browser.selected_values());
}).load_and_open();


