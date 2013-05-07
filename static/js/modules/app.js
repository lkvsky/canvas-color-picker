define(['jquery', 'underscore', 'backbone', 'modules/rainbow_view', 'modules/square_view'],
  function($, _, Backbone, RainbowView, SquareView) {
    var AppView = Backbone.View.extend({
      events: {
        "click #rainbow": "changeColor",
        "drag .color-picker": "changeColor"
      },

      initialize: function() {
        this.rainbow = new RainbowView({
          el: ".color-selector",
          height: 50,
          width: 400,
          orientation: "horizontal",
          canvas: $("#rainbow")[0]
        });

        this.square = new SquareView({
          el: ".shade-selector",
          height: 400,
          width: 400,
          canvas: $("#square")[0]
        });

        this.rainbow.render();
        this.square.render();
      },

      changeColor: function(e) {
        this.square.displayColor = this.rainbow.getColor(e);
        this.square.render();
      }
    });

    return AppView;
  });