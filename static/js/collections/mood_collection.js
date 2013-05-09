define(['jquery', 'underscore', 'backbone', 'models/mood_model'],
  function($, _, Backbone, Mood) {
    var MoodsCollection = Backbone.Collection.extend({
      model: Mood,

      url: '/moods'
    });

    return MoodsCollection;
  });