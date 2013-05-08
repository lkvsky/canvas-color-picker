define(['jquery', 'underscore', 'backbone', 'jquery_touch'],
  function($, _, Backbone) {
    var ShadeSelectorView = Backbone.View.extend({
      displayColor: "black",

      events: {
        "click #shade-canvas": "moveSelector"
      },

      initialize: function() {
        this.canvas = this.options.canvas;
        this.canvas.width = this.options.width;
        this.canvas.height = this.options.height;
        this.ctx = this.canvas.getContext("2d");

        this.initializeDragger();
      },

      render: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.initializeGrd();
        this.addColorStops();
        this.ctx.fillStyle = this.grd;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      },

      initializeDragger: function() {
        $(".shade-picker").draggable({
          containment: "parent",
          snapMode: "inner",
          axis: "x",
          cursorAt: {
            right: 20
          }
        });
      },

      initializeGrd: function() {
          this.grd = this.ctx.createLinearGradient(0,
                                                    this.canvas.width/2,
                                                    this.canvas.width,
                                                    this.canvas.width/2);
      },

      addColorStops: function() {
        this.grd.addColorStop(0, 'white');
        this.grd.addColorStop(0.5, this.displayColor);
        this.grd.addColorStop(1, 'black');
      },

      getColor: function(e) {
        var x = parseInt($(".shade-picker").position().left, 10) - this.ctx.canvas.offsetLeft || 0;
        var y = 30;
        var pp = this.ctx.getImageData(x, y, 1, 1).data;

        return "rgba(" + pp[0] + ", " + pp[1] + ", " + pp[2] + ", " + pp[3] + ")";
      },

      moveSelector: function(e) {
        var x = e.pageX - this.ctx.canvas.offsetLeft - 5;

        $(".shade-picker").css("left", x);
      }
    });

    return ShadeSelectorView;
});
