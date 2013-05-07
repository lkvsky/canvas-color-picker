define(['jquery', 'underscore', 'backbone'],
  function($, _, Backbone) {
    var SquareView = Backbone.View.extend({
      displayColor: "red",

      initialize: function() {
        this.el.width = this.options.width;
        this.el.height = this.options.height;
        this.ctx = this.el.getContext("2d");
      },

      render: function() {
        this.ctx.clearRect(0, 0, this.el.width, this.el.height);
        this.initializeGrd();
        this.addColorStops();
        this.ctx.fillStyle = this.grd;
        this.ctx.fillRect(0, 0, this.el.width, this.el.height);
      },

      initializeGrd: function() {
        this.grd = this.ctx.createLinearGradient(0, 0, this.el.width, this.el.height);
      },

      addColorStops: function() {
        this.grd.addColorStop(0, 'white');
        this.grd.addColorStop(0.5, this.displayColor);
        this.grd.addColorStop(1, 'black');
      }
    });

    return SquareView;
});
