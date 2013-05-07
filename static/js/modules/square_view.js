define(['jquery', 'underscore', 'backbone'],
  function($, _, Backbone) {
    var SquareView = Backbone.View.extend({
      displayColor: "black",

      events: {
        "drag .shade-picker": "getColor",
        "click #square": "moveSelector"
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
          snapMode: "inner"
        });
      },

      initializeGrd: function() {
        this.grd = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
      },

      addColorStops: function() {
        this.grd.addColorStop(0, 'white');
        this.grd.addColorStop(0.5, this.displayColor);
        this.grd.addColorStop(1, 'black');
      },

      getColor: function(e) {
        var x = parseInt($(".shade-picker").css("left"), 10) + this.ctx.canvas.offsetLeft + 20;
        var y = parseInt($(".shade-picker").css("left"), 10) + this.ctx.canvas.offsetTop + 20;
        var pp = this.ctx.getImageData(x, y, 1, 1).data;
        console.log("rgba(" + pp[0] + ", " + pp[1] + ", " + pp[2] + ", " + pp[3] + ")");
        return "rgba(" + pp[0] + ", " + pp[1] + ", " + pp[2] + ", " + pp[3] + ")";
      },

      moveSelector: function(e) {
        var x = e.pageX - this.ctx.canvas.offsetLeft - 10;
        var y = e.pageY - this.ctx.canvas.offsetTop - 410;
        $(".shade-picker").css("top", y);
        $(".shade-picker").css("left", x);
      }
    });

    return SquareView;
});
