define(['jquery', 'underscore', 'backbone'],
  function($, _, Backbone) {
    var Mood = Backbone.Model.extend({
      defaults: {
        "name": "blank",
        "color": "white",
        "user_id": null
      },

      urlRoot: '/moods'
    });

    return Mood;
  });