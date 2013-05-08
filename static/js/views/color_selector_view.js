define(['jquery', 'underscore', 'backbone', 'jquery_touch'],
  function($, _, Backbone) {
    var ColorSelectorView = Backbone.View.extend({
      events: {
        "click #color-canvas": "moveSelector"
      },

      initialize: function() {
        this.canvas = this.options.canvas;
        this.canvas.width = this.options.width;
        this.canvas.height = this.options.height;
        this.ctx = this.canvas.getContext("2d");
        this.orientation = this.options.orientation;

        this.initializeDragger();
      },

      render: function() {
        this.initializeGrd();
        this.addColorStops();
        this.ctx.fillStyle = this.grd;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      },

      initializeGrd: function() {
        if (this.orientation == "horizontal") {
          this.grd = this.ctx.createLinearGradient(0,
                                                    this.canvas.width/2,
                                                    this.canvas.width,
                                                    this.canvas.width/2);
        } else {
          this.grd = this.ctx.createLinearGradient(0,
                                                    this.canvas.width/2,
                                                    0,
                                                    this.canvas.height);
        }
      },

      initializeDragger: function() {
        $(".color-picker").draggable({
          containment: "parent",
          snapMode: "inner",
          axis: "x",
          cursorAt: {
            right: 25
          }
        });
      },

      addColorStops: function() {
        this.grd.addColorStop(0, 'black');
        this.grd.addColorStop(1/8, 'red');
        this.grd.addColorStop(2/8, 'orange');
        this.grd.addColorStop(3/8, 'yellow');
        this.grd.addColorStop(4/8, 'green');
        this.grd.addColorStop(5/8, 'blue');
        this.grd.addColorStop(6/8, 'indigo');
        this.grd.addColorStop(7/8, 'violet');
        this.grd.addColorStop(1, 'black');
      },

      getColor: function(e) {
        var x = parseInt($(".color-picker").position().left, 10) - this.ctx.canvas.offsetLeft || 0;
        var y = 30;
        var pp = this.ctx.getImageData(x, y, 1, 1).data;

        return "rgba(" + pp[0] + ", " + pp[1] + ", " + pp[2] + ", " + pp[3] + ")";
      },

      moveSelector: function(e) {
        var x = e.pageX - this.ctx.canvas.offsetLeft - 5;
        $(".color-picker").css("left", x);
      }
    });

    return ColorSelectorView;
  });