require.config({

  paths: {
    jquery: 'lib/jquery',
    jquery_ui: 'lib/jquery-ui',
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
    }
  }

});

require(['modules/color_picker_view'], function(AppView){
  new AppView({el: ".picker"});
});