define(['jquery', 'underscore', 'backbone', 'modules/color_selector_view', 'modules/shade_selector_view'],
  function($, _, Backbone, ColorSelectorView, ShadeSelectorView) {
    var ColorPicker = Backbone.View.extend({
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

        $(".preview").css("background-color", that.square.getColor());
      }
    });

    return ColorPicker;
  });