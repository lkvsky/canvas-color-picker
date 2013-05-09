require.config({
  baseUrl: '/static/js',

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
    },

    'handlebars': {
      exports: 'Handlebars'
    }
  }

});

require(['views/index_mood_view'], function(IndexMoodView){
  new IndexMoodView({el: ".container"});
});