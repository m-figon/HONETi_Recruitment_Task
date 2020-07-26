
(function ($) {

  var app = $.sammy(function () {
    function navigationFunc(context) { //adding listener which allow to change state of page
      let str = ['#/#register', '#/#login'];
      $('.nav-bar .right h1:eq(4)').on('click', () => { //changing to login url
        context.app.setLocation('#/#login');
      })
      $('.nav-bar .right h1:eq(5)').on('click', () => { //signing-out functionality
        $('.nav-bar .right h1:eq(5)')[0].innerText = "";
        $('.nav-bar .right h1:eq(7)').remove();
        $('.nav-bar .right h1:eq(4)')[0].innerText = "Logowanie";
      })
      $('.nav-bar .right h1:eq(6)').on('click', () => { //changing to register url
        context.app.setLocation('#/#register');
      })
      $('.how-does-it-work3 button').on('click', () => { //hide how-does-it-work part
        $('.how-does-it-work').css('display', 'none');
        $('.how-does-it-work3').css('display', 'none');
        $('.how-does-it-work2').css('display', 'flex');
      })
      for (let i = 0; i < str.length; i++) { //login and register link buttons in price-list part
        $(".single-line button:eq(" + i + ")").on('click', () => {
          context.app.setLocation(str[i]);
        })
      }
      for (let i = 1; i < 4; i++) {
        $('#show' + i).on('click', () => { //show how-does-it-work part
          $('.how-does-it-work2').css('display', 'none');
          $('.how-does-it-work').css('display', 'flex');
          $('.how-does-it-work3').css('display', 'flex');
        })
      }
    }
    function loading() { //hiding loading screen, showing app screen
      window.onload = function () {
        $('.loading').css("display", "none");
        $('.app').css("display", "block");
      };
    }
    function load(){
      $('.loading').css("display", "flex");
      $('.app').css("display", "none");
    }
    function addForm(string) { //adding some part of login or register form
      $('.app').append('<div class="' + string + '"></div>');
      $('.' + string).append('<div class="' + string + '-form"></div>');
      $('.' + string + '-form').append('<div class="' + string + '-content"></div>');
      $('.' + string + '-content').append('<div class="cancel-button"></div>');
      $('.cancel-button').append('<button>X</button>');
      $('.' + string + '-content').append('<input type="text" value="Wpisz nazwe konta...">');
    }
    this.get('#/', function (context) { //home url functionality
      loading();
      navigationFunc(context);
      $('.login').remove();
      $('.register').remove();
    });
    this.get('#/#login', function (context) { //login url functionality
      load();
      navigationFunc(context);
      let users;
      fetch('https://honeti-backend.herokuapp.com/users')
        .then(response => response.json())
        .then(data => {
          users = data.slice();
          console.log(users);
          $('.loading').css("display", "none"); //displaying app class instead of loading one when users data is ready
          $('.app').css("display", "block");
        })
      addForm('login'); //function to avoid code repetition - adding login form elements
      $('.login-content').append('<p>Niepoprawne dane logowania</p>'); //rest of adding login-form elements
      $('.login-content').append('<input type="text" value="Podaj hasło...">');
      $('.login-content').append('<button>Zaloguj</button>');
      $('.cancel-button button').on('click', () => { //x button in login form functionality
        $('.login').remove();
        context.app.setLocation("#/");
      })
      let str = ['Wpisz nazwe konta...', 'Podaj hasło...'];
      for (let i = 0; i < str.length; i++) { //focusing inputs functionality
        $('.login-content input:eq(' + i + ')').on('focus', (e) => {
          if (e.target.value === str[i]) {
            e.target.value = "";
            if (i % 2 === 1) {
              e.target.type = "password";
            }
          }
        })
      }
      for (let i = 0; i < str.length; i++) { //bluring inputs functionality
        $('.login-content input:eq(' + i + ')').on('blur', (e) => {
          if (e.target.value === "") {
            e.target.value = str[i];
            if (i % 2 === 1) {
              e.target.type = "text";
            }
          }
        })
      }
      $('.login-content button:eq(1)').on('click', (e) => { //login button functionality
        let correctFlag;
        for (let item of users) {
          if (item.account === $('.login-content input:eq(0)')[0].value && item.password === $('.login-content input:eq(1)')[0].value) { //checking if user exists
            alert('Pomyślnie zalogowano');
            $('.nav-bar .right').append("<h1>" + $('.login-content input:eq(0)')[0].value + "</h1>")
            $('.nav-bar .right h1:eq(5)')[0].innerText = "Wyloguj";
            $('.nav-bar .right h1:eq(4)')[0].innerText = "";
            $('.login-content input:eq(0)')[0].value = "Wpisz nazwe konta...";
            $('.login-content input:eq(1)')[0].value = "Podaj hasło...";
            $('.login-content input:eq(1)')[0].type = "text";
            $('.login-content p:eq(0)').css("display", "none");
            correctFlag = true;
          }
          if (!correctFlag) { //if data is not correct p tag is displayed
            $('.login-content p:eq(0)').css("display", "block");
          }
        }
      });
    });
    this.get('#/#register', function (context) { //register url functionality
      loading();
      navigationFunc(context);
      addForm('register'); //function to avoid code repetition - adding register form elements
      $('.register-content').append('<p>Nazwa konta musi zawierac od 3 do 12 liter lub cyfr</p>'); //rest of adding register form elements
      $('.register-content').append('<input type="text" value="Podaj adres email...">');
      $('.register-content').append('<p>Prosze podać poprawny adres email</p>');
      $('.register-content').append('<input type="text" value="Podaj hasło...">');
      $('.register-content').append('<p>Hasło musi zawierac od 8 do 13 znaków, co najmniej jedną dużą i małą litere, znak specjalny, cyfre</p>');
      $('.register-content').append('<input type="text" value="Potwierdź hasło...">');
      $('.register-content').append('<p>Niepoprawnie potwierdzonie hasło lub złe hasło z poprzedniej rubryki</p>');
      $('.register-content').append('<button>Zarejestruj</button>');
      $('.cancel-button button').on('click', () => { //x button in register form functionality
        $('.register').remove();
        context.app.setLocation("#/");
      })
      let str = ['Wpisz nazwe konta...', 'Podaj adres email...', 'Podaj hasło...', 'Potwierdź hasło...'];
      for (let i = 0; i < str.length; i++) { //focusing inputs functionality
        $('.register-content input:eq(' + i + ')').on('focus', (e) => {
          if (e.target.value === str[i]) {
            e.target.value = "";
            if (i > 1) {
              e.target.type = "password";
            }
          }
        })
      }
      for (let i = 0; i < str.length; i++) { //bluring inputs functionality
        $('.register-content input:eq(' + i + ')').on('blur', (e) => {
          if (e.target.value === "") {
            e.target.value = str[i];
            if (i > 1) {
              e.target.type = "text";
            }
          }
        })
      }
      $('.register-content button:eq(1)').on('click', (e) => { //register button functionality
        let correctFlag = true;
        let conditions = [/^[a-zA-Z0-9\.\-_]{3,12}$/, /^[a-z0-9\._\-]+@[a-z0-9\.\-]+\.[a-z]{2,4}$/, /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\.\-_@$!%*#?&])[A-Za-z\d\.\-_@$!%*#?&]{8,13}$/]
        for (let i = 0; i < conditions.length; i++) { //checking if inputs values are correct
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
        if (correctFlag) { //if inputs are correct - new user is created
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
            context.app.setLocation("#/"); //when registration is correct, user is redirected to home page
          });
        }
      });
    });
    this.get('#/:default', function (context) { //default url functionality
      loading();
      navigationFunc(context);
      $('.login').remove();
      $('.register').remove();
      $('html, body').animate({ //navigate to how-does-it-work or price-list section
        scrollTop: $(context.params.default).offset().top
      }, 1000);
    });
  });

  $(function () {
    app.run('#/');
  });

})(jQuery);
