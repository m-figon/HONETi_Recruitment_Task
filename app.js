
(function ($) {

  var app = $.sammy('#main', function () {
    this.get('#/', function (context) {

    });
    this.get('#/login', function (context) {
      console.log('hello');
      $('.app').append('<div class="login"></div>');
      $('.login').append('<div class="login-form"></div>');
      $('.login-form').append('<div class="login-content"></div>');
      $('.login-content').append('<div class="cancel-button"></div>');
      $('.cancel-button').append('<button>X</button>');
      $('.login-content').append('<input type="text" value="Wpisz nazwe konta...">');
      $('.login-content').append('<p>Niepoprawne dane logowania</p>');
      $('.login-content').append('<input type="text" value="Podaj hasło...">');
      $('.login-content').append('<button>Zaloguj</button>');
      $('.cancel-button button').on('click',()=>{
        $('.app .login').remove();
      })
    });
    this.get('#/register', function (context) {
      $('.app').append('<div class="register"></div>');
      $('.register').append('<div class="register-form"></div>');
      $('.register-form').append('<div class="register-content"></div>');
      $('.register-content').append('<div class="cancel-button"></div>');
      $('.cancel-button').append('<button>X</button>');
      $('.register-content').append('<input type="text" value="Wpisz nazwe konta...">');
      $('.register-content').append('<p>Nazwa konta musi zawierac od 4 do 10 liter lub cyfr</p>');
      $('.register-content').append('<input type="text" value="Podaj adres email...">');
      $('.register-content').append('<p>Prosze podać poprawny adres email</p>');
      $('.register-content').append('<input type="text" value="Podaj hasło...">');
      $('.register-content').append('<p>Hasło musi zawierac od 4 do 12 znaków, co najmniej jedną dużą i małą litere, znak specjalny, cyfre</p>');
      $('.register-content').append('<input type="text" value="Potwierdz hasło...">');
      $('.register-content').append('<p>Niepoprawnie potwierdzonie hasło lub złe hasło z poprzedniej rubryki</p>');
      $('.register-content').append('<button>Zarejestruj</button>');
      $('.cancel-button button').on('click',()=>{
        $('.app .register').remove();
      })
    });
  });

  $(function () {
    app.run('#/');
  });

})(jQuery);
