require.config({

  paths: {
    jquery: 'lib/jquery',
    jquery_ui: 'lib/jquery-ui',
    jquery_touch: 'lib/jquery-ui-touch',
    text: 'lib/text',
    handlebars: 'lib/handlebars',
    backbone: 'lib/backbone',
    underscore: 'lib/underscore'
  },

  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },

    'underscore': {
      exports: '_'
    },

    'jquery_touch': {
      deps: ['jquery_ui']
    }
  }

});

require(['views/color_picker_view'], function(AppView){
  new AppView({el: ".picker"});
});