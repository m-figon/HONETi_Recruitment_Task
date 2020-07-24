
(function ($) {

  var app = $.sammy(function () {
    function navigationFunc(context) {
      let str = ['#/#login', '#/#register'];
      for (let i = 0; i < str.length; i++) {
        $('.nav-bar .right h1:eq(' + (i + 3) + ')').on('click', () => {
          context.app.setLocation(str[i]);
        })
      }
      $('.middle-item button').on('click', () => {
        $('.jak-to-dziala').css('display', 'none');
      })
      for (let i = 0; i < str.length; i++) {
        $(".single-line button:eq(" + i + ")").on('click', () => {
          context.app.setLocation(str[i]);
        })
      }
      for (let i = 1; i < 3; i++) {
        $('#show' + i).on('click', () => {
          $('.jak-to-dziala').css('display', 'flex');
        })
      }
    }
    function addForm(string) {
      $('.app').append('<div class="' + string + '"></div>');
      $('.' + string).append('<div class="' + string + '-form"></div>');
      $('.' + string + '-form').append('<div class="' + string + '-content"></div>');
      $('.' + string + '-content').append('<div class="cancel-button"></div>');
      $('.cancel-button').append('<button>X</button>');
      $('.' + string + '-content').append('<input type="text" value="Wpisz nazwe konta...">');
    }
    this.get('#/', function (context) {
      navigationFunc(context);
      $('.login').remove();
      $('.register').remove();
    });
    this.get('#/#login', function (context) {
      navigationFunc(context);
      let users;
      fetch('https://honeti-backend.herokuapp.com/users')
        .then(response => response.json())
        .then(data => {
          users = data.slice();
          console.log(users);
        })
      addForm('login');
      $('.login-content').append('<p>Niepoprawne dane logowania</p>');
      $('.login-content').append('<input type="text" value="Podaj hasło...">');
      $('.login-content').append('<button>Zaloguj</button>');
      $('.cancel-button button').on('click', () => {
        $('.login').remove();
        context.app.setLocation("#/");
      })
      let str = ['Wpisz nazwe konta...', 'Podaj hasło...'];
      for (let i = 0; i < str.length; i++) {
        $('.login-content input:eq(' + i + ')').on('focus', (e) => {
          if (e.target.value === str[i]) {
            e.target.value = "";
            if (i % 2 === 1) {
              e.target.type = "password";
            }
          }
        })
      }
      for (let i = 0; i < str.length; i++) {
        $('.login-content input:eq(' + i + ')').on('blur', (e) => {
          if (e.target.value === "") {
            e.target.value = str[i];
            if (i % 2 === 1) {
              e.target.type = "text";
            }
          }
        })
      }
      $('.login-content button:eq(1)').on('click', (e) => {
        let correctFlag;
        for (let item of users) {
          if (item.account === $('.login-content input:eq(0)')[0].value && item.password === $('.login-content input:eq(1)')[0].value) {
            alert('correct login');
            $('.nav-bar .right').append("<h1>" + $('.login-content input:eq(0)')[0].value + "</h1>")
            $('.nav-bar .right h1:eq(3)')[0].innerText = "Wyloguj";
            $('.nav-bar .right h1:eq(3)').off();
            $('.login-content input:eq(0)')[0].value = "Wpisz nazwe konta...";
            $('.login-content input:eq(1)')[0].value = "Podaj hasło...";
            $('.login-content input:eq(1)')[0].type = "text";
            $('.login-content p:eq(0)').css("display", "none");
            correctFlag = true;
            $('.nav-bar .right h1:eq(3)').on('click', () => {
              $('.nav-bar .right h1:eq(5)')[0].remove();
              $('.nav-bar .right h1:eq(3)')[0].innerText = "Zaloguj";
              $('.nav-bar .right h1:eq(3)').off();
              $('.nav-bar .right h1:eq(3)').on('click', () => {
                context.app.setLocation("#/#login");
              })
            })
          }
          if (!correctFlag) {
            $('.login-content p:eq(0)').css("display", "block");
          }
        }
      });
    });
    this.get('#/#register', function (context) {
      navigationFunc(context);
      addForm('register');
      $('.register-content').append('<p>Nazwa konta musi zawierac od 3 do 12 liter lub cyfr</p>');
      $('.register-content').append('<input type="text" value="Podaj adres email...">');
      $('.register-content').append('<p>Prosze podać poprawny adres email</p>');
      $('.register-content').append('<input type="text" value="Podaj hasło...">');
      $('.register-content').append('<p>Hasło musi zawierac od 8 do 13 znaków, co najmniej jedną dużą i małą litere, znak specjalny, cyfre</p>');
      $('.register-content').append('<input type="text" value="Potwierdź hasło...">');
      $('.register-content').append('<p>Niepoprawnie potwierdzonie hasło lub złe hasło z poprzedniej rubryki</p>');
      $('.register-content').append('<button>Zarejestruj</button>');
      $('.cancel-button button').on('click', () => {
        $('.register').remove();
        context.app.setLocation("#/");
      })
      let str = ['Wpisz nazwe konta...', 'Podaj adres email...', 'Podaj hasło...', 'Potwierdź hasło...'];
      for (let i = 0; i < str.length; i++) {
        $('.register-content input:eq(' + i + ')').on('focus', (e) => {
          if (e.target.value === str[i]) {
            e.target.value = "";
            if (i > 1) {
              e.target.type = "password";
            }
          }
        })
      }
      for (let i = 0; i < str.length; i++) {
        $('.register-content input:eq(' + i + ')').on('blur', (e) => {
          if (e.target.value === "") {
            e.target.value = str[i];
            if (i > 1) {
              e.target.type = "text";
            }
          }
        })
      }
      $('.register-content button:eq(1)').on('click', (e) => {
        let correctFlag = true;
        let conditions = [/^[a-zA-Z0-9\.\-_]{3,12}$/, /^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/, /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/]
        for (let i = 0; i < conditions.length; i++) {
          if (!($('.register-content input:eq(' + i + ')')[0].value.match(conditions[i]) === null)) {
            $('.register-content p:eq(' + i + ')').css("display", "none");
          } else {
            $('.register-content p:eq(' + i + ')').css("display", "block");
            correctFlag = false;
          }
        }
        if (!($('.register-content input:eq(2)')[0].value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/) === null) && $('.register-content input:eq(3)')[0].value === $('.register-content input:eq(2)')[0].value) {
          $('.register-content p:eq(3)').css("display", "none");
        } else {
          $('.register-content p:eq(3)').css("display", "block");
          correctFlag = false;
        }
        if (correctFlag) {
          fetch('https://honeti-backend.herokuapp.com/users', {
            method: 'POST',
            body: JSON.stringify({
              email: $('.register-content input:eq(1)')[0].value,
              account: $('.register-content input:eq(0)')[0].value,
              password: $('.register-content input:eq(2)')[0].value,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(data => {
            alert('Rejestracja przebiegła pomyślnie');
            context.app.setLocation("#/");
          });
        }
      });
    });
    this.get('#/:default', function (context) {
      navigationFunc(context);
      $('.login').remove();
      $('.register').remove();
      console.log(context.params.default);
      $('html, body').animate({
        scrollTop: $(context.params.default).offset().top
      }, 1000);
    });
  });

  $(function () {
    app.run('#/');
  });

})(jQuery);
