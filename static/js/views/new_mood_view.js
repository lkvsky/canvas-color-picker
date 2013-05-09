define(['jquery', 'underscore', 'backbone', 'views/color_selector_view', 'views/shade_selector_view', 'models/mood_model'],
  function($, _, Backbone, ColorSelectorView, ShadeSelectorView, Mood) {
    var NewMoodView = Backbone.View.extend({
      events: {
        "click #color-canvas": "changeColor",
        "click #shade-canvas": "changeColor",
        "drag .color-picker": "changeColor",
        "drag .shade-picker": "changeColor"
      },

      initialize: function() {
        this.rainbow = new ColorSelectorView({
          el: ".color-selector",
          height: 50,
          width: 300,
          orientation: "horizontal",
          canvas: $("#color-canvas")[0]
        });

        this.square = new ShadeSelectorView({
          el: ".shade-selector",
          height: 50,
          width: 300,
          canvas: $("#shade-canvas")[0]
        });

        this.rainbow.render();
        this.square.render();
        this.changeColor();
      },

      changeColor: function(e) {
        this.square.displayColor = this.rainbow.getColor(e);
        this.square.render();
        this.changePreview();
      },

      changePreview: function() {
        var that = this;
        var color = that.square.getColor();

        if (color == "rgba(0, 0, 0, 0)") {
          color = "white";
        }

        $(".preview").css("background-color", color);
        $("#submit-mood").css("background-color", color);
      },

      saveMood: function() {
        var color = this.square.getColor();
        var name = $("#mood-name").val();
        var mood = new Mood({name: name, color: color});
        
        return mood;
      }
    });

    return NewMoodView;
  });