define(['jquery', 'underscore', 'backbone', 'handlebars', 'collections/mood_collection', 'views/new_mood_view', 'text!templates/index-mood.html'],
  function($, _, Backbone, Handlebars, MoodsCollection, NewMoodView, MoodsTpl) {
    var IndexMoodView = Backbone.View.extend({
      events: {
        "click #submit-mood": "saveMood"
      },

      initialize: function() {
        this.newMoodView = new NewMoodView({el: ".mood-new"});
        this.collection = new MoodsCollection();
        this.collection.fetch();

        this.collection.on("add change reset", _.bind(this.render, this));
      },

      render: function() {
        var template = Handlebars.compile(MoodsTpl);

        $('.mood-index').html(template({moods: this.collection.toJSON()}));
      },

      saveMood: function() {
        var that = this;
        var mood = this.newMoodView.saveMood();

        mood.save({}, {
          success: function() {
            that.collection.add(mood);
          }
        });
      }
    });

    return IndexMoodView;
  });