
(function ($) {

  var app = $.sammy('#main', function () {
    this.get('#/', function (context) {
      $('.nawigacja .right h1:eq(3)').on('click', () => {
        context.app.setLocation("#/#login");
        location.reload();
      })
      $('.nawigacja .right h1:eq(4)').on('click', () => {
        context.app.setLocation("#/#register");
        location.reload();
      })
    });
    this.get('#/#login', function (context) {
      let users;
      fetch('https://honeti-backend.herokuapp.com/users')
        .then(response => response.json())
        .then(data => {
          users = data.slice();
          console.log(users);
        })
      $('.app').append('<div class="login"></div>');
      $('.login').append('<div class="login-form"></div>');
      $('.login-form').append('<div class="login-content"></div>');
      $('.login-content').append('<div class="cancel-button"></div>');
      $('.cancel-button').append('<button>X</button>');
      $('.login-content').append('<input type="text" value="Wpisz nazwe konta...">');
      $('.login-content').append('<p>Niepoprawne dane logowania</p>');
      $('.login-content').append('<input type="text" value="Podaj hasło...">');
      $('.login-content').append('<button>Zaloguj</button>');
      $('.cancel-button button').on('click', () => {
        context.app.setLocation("#/");
        location.reload();
      })
      $('.login-content input:eq(0)').on('focus', (e) => {
        if (e.target.value === "Wpisz nazwe konta...") {
          e.target.value = "";
        }
      })
      $('.login-content input:eq(0)').on('blur', (e) => {
        if (e.target.value === "" || e.target.value === " ") {
          e.target.value = "Wpisz nazwe konta...";
        }
      })
      $('.login-content input:eq(1)').on('focus', (e) => {
        if (e.target.value === "Podaj hasło...") {
          e.target.value = "";
          e.target.type = "password";
        }
      })
      $('.login-content input:eq(1)').on('blur', (e) => {
        if (e.target.value === "") {
          e.target.value = "Podaj hasło...";
          e.target.type = "text";
        }
      })
      $('.login-content button:eq(1)').on('click', (e) => {
        for (let item of users) {
          if (item.account === $('.login-content input:eq(0)')[0].value && item.password === $('.login-content input:eq(1)')[0].value) {
            alert('correct login');
            $('.login-content p:eq(0)').css("display", "none");
            $('.nawigacja .right').append("<h1>"+$('.login-content input:eq(0)')[0].value+"</h1>")
            $('.login-content input:eq(0)')[0].value="Wpisz nazwe konta...";
            $('.login-content input:eq(1)')[0].value="Podaj hasło...";
            $('.login-content input:eq(1)')[0].type="text";
          } else {
            $('.login-content p:eq(0)').css("display", "block");
          }
        }
      });
    });
    this.get('#/#register', function (context) {
      $('.app').append('<div class="register"></div>');
      $('.register').append('<div class="register-form"></div>');
      $('.register-form').append('<div class="register-content"></div>');
      $('.register-content').append('<div class="cancel-button"></div>');
      $('.cancel-button').append('<button>X</button>');
      $('.register-content').append('<input type="text" value="Wpisz nazwe konta...">');
      $('.register-content').append('<p>Nazwa konta musi zawierac od 3 do 12 liter lub cyfr</p>');
      $('.register-content').append('<input type="text" value="Podaj adres email...">');
      $('.register-content').append('<p>Prosze podać poprawny adres email</p>');
      $('.register-content').append('<input type="text" value="Podaj hasło...">');
      $('.register-content').append('<p>Hasło musi zawierac od 8 do 13 znaków, co najmniej jedną dużą i małą litere, znak specjalny, cyfre</p>');
      $('.register-content').append('<input type="text" value="Potwierdź hasło...">');
      $('.register-content').append('<p>Niepoprawnie potwierdzonie hasło lub złe hasło z poprzedniej rubryki</p>');
      $('.register-content').append('<button>Zarejestruj</button>');
      $('.cancel-button button').on('click', () => {
        context.app.setLocation("#/");
        location.reload();
      })
      $('.register-content input:eq(0)').on('focus', (e) => {
        if (e.target.value === "Wpisz nazwe konta...") {
          e.target.value = "";
        }
      })
      $('.register-content input:eq(0)').on('blur', (e) => {
        if (e.target.value === "" || e.target.value === " ") {
          e.target.value = "Wpisz nazwe konta...";
        }
      })
      $('.register-content input:eq(1)').on('focus', (e) => {
        if (e.target.value === "Podaj adres email...") {
          e.target.value = "";
        }
      })
      $('.register-content input:eq(1)').on('blur', (e) => {
        if (e.target.value === "" || e.target.value === " ") {
          e.target.value = "Podaj adres email...";
        }
      })
      $('.register-content input:eq(2)').on('focus', (e) => {
        if (e.target.value === "Podaj hasło...") {
          e.target.value = "";
          e.target.type = "password";
        }
      })
      $('.register-content input:eq(2)').on('blur', (e) => {
        if (e.target.value === "") {
          e.target.value = "Podaj hasło...";
          e.target.type = "text";
        }
      })
      $('.register-content input:eq(3)').on('focus', (e) => {
        if (e.target.value === "Potwierdź hasło...") {
          e.target.value = "";
          e.target.type = "password";
        }
      })
      $('.register-content input:eq(3)').on('blur', (e) => {
        if (e.target.value === "") {
          e.target.value = "Potwierdź hasło...";
          e.target.type = "text";
        }
      })
      $('.register-content button:eq(1)').on('click', (e) => {
        let correctFlag = true;
        if (!($('.register-content input:eq(0)')[0].value.match(/^[a-zA-Z0-9\.\-_]{3,12}$/) === null)) {
          console.log('correct account');
          $('.register-content p:eq(0)').css("display", "none");
        } else {
          console.log('incorrect account');
          $('.register-content p:eq(0)').css("display", "block");
          correctFlag = false;
        }
        if (!($('.register-content input:eq(1)')[0].value.match(/^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/) === null)) {
          console.log('correct email');
          $('.register-content p:eq(1)').css("display", "none");
        } else {
          console.log('incorrect email');
          $('.register-content p:eq(1)').css("display", "block");
          correctFlag = false;
        }
        if (!($('.register-content input:eq(2)')[0].value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/) === null)) {
          console.log('correct password');
          $('.register-content p:eq(2)').css("display", "none");
        } else {
          console.log('incorrect password');
          $('.register-content p:eq(2)').css("display", "block");
          correctFlag = false;
        }
        if (!($('.register-content input:eq(2)')[0].value.match(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/) === null) && $('.register-content input:eq(3)')[0].value === $('.register-content input:eq(2)')[0].value) {
          console.log('correct confirm');
          $('.register-content p:eq(3)').css("display", "none");
        } else {
          console.log('incorrect confirm');
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
            location.reload();
          });

        }
      });
    });
  });

  $(function () {
    app.run('#/');
  });

})(jQuery);
