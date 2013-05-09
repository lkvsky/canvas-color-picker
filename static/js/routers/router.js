define(['jquery', 'underscore', 'backbone', 'views/index_mood_view'],
  function($, _, Backbone, IndexMoodView) {
    var Router = Backbone.Router.extend({
      routes: {
        "": "index"
      },

      index: function() {
        var index = new IndexMoodView({el: ".container"});
        index.render();
      }
    });

    return Router;
  });