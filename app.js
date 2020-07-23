
(function ($) {

  var app = $.sammy('#main', function () {
    this.get('#/', function (context) {
      
    });
    this.get('#/:type', function (context) {
      urlNavigation(context);
      console.log(context.params.type);
    });
    this.get('#/:type/:id', function (context) {
      urlNavigation(context);
      console.log(context.params.type);
      let animals = [];
    });
  });

  $(function () {
    app.run('#/');
  });

})(jQuery);
