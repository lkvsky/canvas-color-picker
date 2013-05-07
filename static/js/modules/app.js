define(['jquery', 'underscore', 'backbone', 'modules/rainbow_view', 'modules/square_view'],
  function($, _, Backbone, RainbowView, SquareView) {
    var AppView = Backbone.View.extend({
      events: {
        "click #rainbow": "changeColor"
      },

      initialize: function() {
        this.rainbow = new RainbowView({
          el: ".color-selector",
          height: 50,
          width: 400,
          orientation: "horizontal"
        });

        this.square = new SquareView({
          el: "#square",
          height: 400,
          width: 400
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