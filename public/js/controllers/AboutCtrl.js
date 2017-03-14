angular.module('AboutCtrl', []).controller('AboutController', function ($scope) {
  
  /***************** Nav Transformicon ******************/

  /* When user clicks the Icon */
  $('.nav-toggle').click(function() {
      $(this).toggleClass('active');
      $('.header-nav').toggleClass('open');
      event.preventDefault();
  });
  /* When user clicks a link */
  $('.header-nav li a').click(function() {
      $('.nav-toggle').toggleClass('active');
      $('.header-nav').toggleClass('open');
  });

  /***************** Header BG Scroll ******************/

  $(function() {
      $(window).scroll(function() {
          var scroll = $(window).scrollTop();

          if (scroll >= 20) {
              $('section.navigation.transform').addClass('fixed');
              $('header').css({
                  "border-bottom": "none",
                  "padding": "28px 0"
              });
              $('header .visitor-actions').css({
                  "top": "22px",
              });
              $('header .navicon').css({
                  "top": "35px",
              });
          } else {
              $('section.navigation.transform').removeClass('fixed');
              $('header').css({
                  "padding": "41px 0 36px 0"
              });
              $('header.transform').css({
                  "border-bottom": "solid 1px rgba(255, 255, 255, 0.2)",
              });
              $('header .visitor-actions').css({
                  "top": "38px",
              });
              $('header .navicon').css({
                  "top": "48px",
              });
          }
      });
  });
});
