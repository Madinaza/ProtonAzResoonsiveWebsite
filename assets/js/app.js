(function ($) {
  "use strict";

  $("#preloader").fadeOut("slow", function () {
    $(this).remove();
  });

  if ($(window).width() > 991) {
    if ($("#pagepiling").length) {
      $("#pagepiling").pagepiling({
        menu: "#menu",
        scrollingSpeed: 280,
        loopBottom: true,
        afterLoad: function (anchorLink, index) {
          if ($("#pagepiling-counter").length) {
            $(".counter-slider").counterUp({
              delay: 50,
              time: 5000,
            });
          }
        },
      });
    }
  }

  $(window).on("load", addNewClass);

  function addNewClass() {
    $("body")
      .imagesLoaded()
      .done(function (instance) {
        $("body").addClass("loaded");
      });
  }

  if (!!window.IntersectionObserver) {
    let observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active-animation");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "0px 0px -100px 0px",
      }
    );
    document.querySelectorAll(".has-animation").forEach((block) => {
      observer.observe(block);
    });
  } else {
    document.querySelectorAll(".has-animation").forEach((block) => {
      block.classList.remove("has-animation");
    });
  }

  /*-------------------------------------
  Offcanvas Menu activation code
  -------------------------------------*/
  $("#wrapper").on("click", ".offcanvas-menu-btn", function (e) {
    e.preventDefault();
    var $this = $(this),
      wrapper = $(this).parents("body").find(">#wrapper"),
      wrapMask = $("<div />").addClass("offcanvas-mask"),
      offCancas = $("#offcanvas-wrap"),
      position = offCancas.data("position") || "left";

    if ($this.hasClass("menu-status-open")) {
      wrapper.addClass("open").append(wrapMask);
      $this.removeClass("menu-status-open").addClass("menu-status-close");
      offCancas.css({
        transform: "translateX(0)",
      });
    } else {
      removeOffcanvas();
    }

    function removeOffcanvas() {
      wrapper.removeClass("open").find("> .offcanvas-mask").remove();
      $this.removeClass("menu-status-close").addClass("menu-status-open");
      if (position === "left") {
        offCancas.css({
          transform: "translateX(-105%)",
        });
      } else {
        offCancas.css({
          transform: "translateX(105%)",
        });
      }
    }
    $(".offcanvas-mask, .offcanvas-close").on("click", function () {
      removeOffcanvas();
    });

    return false;
  });

  var contactForm = $("#contact-form");
  if (contactForm.length) {
    contactForm.validator().on("submit", function (e) {
      var $this = $(this),
        $target = contactForm.find(".form-response");
      if (e.isDefaultPrevented()) {
        $target.html(
          "<div class='alert alert-success'><p>Please select all required field.</p></div>"
        );
      } else {
        $.ajax({
          url: "php/mailer.php",
          type: "POST",
          data: contactForm.serialize(),
          beforeSend: function () {
            $target.html(
              "<div class='alert alert-info'><p>Loading ...</p></div>"
            );
          },
          success: function (text) {
            if (text === "success") {
              $this[0].reset();
              $target.html(
                "<div class='alert alert-success'><p>Message has been sent successfully.</p></div>"
              );
            } else {
              $target.html(
                "<div class='alert alert-success'><p>" + text + "</p></div>"
              );
            }
          },
        });
        return false;
      }
    });
  }



  $(".map-layout1").each(function () {
    var $this = $(this),
      key = $this.data("key"),
      lat = $this.data("lat"),
      lng = $this.data("lng"),
      mrkr = $this.data("mrkr");

    $this
      .gmap3({
        center: [-37.81618, 144.95692],
        zoom: 12,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [
              {
                saturation: 36,
              },
              {
                color: "#333333",
              },
              {
                lightness: 40,
              },
            ],
          },
          {
            featureType: "all",
            elementType: "labels.text.stroke",
            stylers: [
              {
                visibility: "on",
              },
              {
                color: "#ffffff",
              },
              {
                lightness: 16,
              },
            ],
          },
          {
            featureType: "all",
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            featureType: "administrative",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#fefefe",
              },
              {
                lightness: 20,
              },
            ],
          },
          {
            featureType: "administrative",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#fefefe",
              },
              {
                lightness: 17,
              },
              {
                weight: 1.2,
              },
            ],
          },
          {
            featureType: "administrative.country",
            elementType: "geometry.stroke",
            stylers: [
              {
                saturation: "-9",
              },
            ],
          },
          {
            featureType: "landscape",
            elementType: "geometry",
            stylers: [
              {
                color: "#e8e8e8",
              },
              {
                lightness: 20,
              },
            ],
          },
          {
            featureType: "landscape.natural.landcover",
            elementType: "geometry.fill",
            stylers: [
              {
                saturation: "-4",
              },
              {
                color: "#cdcdcd",
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "geometry",
            stylers: [
              {
                color: "#d4f1c9",
              },
              {
                lightness: 21,
              },
            ],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
              {
                color: "#d4f1c9",
              },
              {
                lightness: 21,
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ffeea4",
              },
              {
                lightness: 60,
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.stroke",
            stylers: [
              {
                color: "#f5d681",
              },
              {
                lightness: 30,
              },
              {
                weight: 1,
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
              {
                color: "#ffffff",
              },
              {
                lightness: 18,
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "geometry",
            stylers: [
              {
                color: "#ffffff",
              },
              {
                lightness: 16,
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "geometry",
            stylers: [
              {
                color: "#f2f2f2",
              },
              {
                lightness: 19,
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#aadaff",
              },
              {
                lightness: 17,
              },
            ],
          },
        ],
      })
      .marker(function (map) {
        return {
          position: map.getCenter(),
          icon: mrkr,
        };
      });
  });

  $("[data-bg-image]").each(function () {
    var img = $(this).data("bg-image");
    $(this).css({
      backgroundImage: "url(" + img + ")",
    });
  });

  if ($.fn.owlCarousel) {
    function createCarousel(carousel) {
      var loop = carousel.data("loop"),
        items = carousel.data("items"),
        margin = carousel.data("margin"),
        stagePadding = carousel.data("stage-padding"),
        autoplay = carousel.data("autoplay"),
        autoplayTimeout = carousel.data("autoplay-timeout"),
        smartSpeed = carousel.data("smart-speed"),
        dots = carousel.data("dots"),
        nav = carousel.data("nav"),
        navSpeed = carousel.data("nav-speed"),
        rXsmall = carousel.data("r-x-small"),
        rXsmallNav = carousel.data("r-x-small-nav"),
        rXsmallDots = carousel.data("r-x-small-dots"),
        rXmedium = carousel.data("r-x-medium"),
        rXmediumNav = carousel.data("r-x-medium-nav"),
        rXmediumDots = carousel.data("r-x-medium-dots"),
        rSmall = carousel.data("r-small"),
        rSmallNav = carousel.data("r-small-nav"),
        rSmallDots = carousel.data("r-small-dots"),
        rMedium = carousel.data("r-medium"),
        rMediumNav = carousel.data("r-medium-nav"),
        rMediumDots = carousel.data("r-medium-dots"),
        rLarge = carousel.data("r-large"),
        rLargeNav = carousel.data("r-large-nav"),
        rLargeDots = carousel.data("r-large-dots"),
        rExtraLarge = carousel.data("r-extra-large"),
        rExtraLargeNav = carousel.data("r-extra-large-nav"),
        rExtraLargeDots = carousel.data("r-extra-large-dots"),
        center = carousel.data("center"),
        custom_nav = carousel.data("custom-nav") || "";
      carousel.addClass("owl-carousel");
      var owl = carousel.owlCarousel({
        loop: loop ? true : false,
        center: center ? true : false,
        items: items ? items : 4,
        lazyLoad: true,
        margin: margin ? margin : 0,
        autoplay: autoplay ? true : false,
        autoplayTimeout: autoplayTimeout ? autoplayTimeout : 1000,
        smartSpeed: smartSpeed ? smartSpeed : 250,
        dots: dots ? true : false,
        nav: nav ? true : false,
        navText: [
          '<i class="flaticon-back"></i>',
          '<i class="flaticon-next"></i>',
        ],
        navSpeed: navSpeed ? true : false,
        center: center ? true : false,
        responsiveClass: true,
        responsive: {
          0: {
            items: rXsmall ? rXsmall : 1,
            nav: rXsmallNav ? true : false,
            dots: rXsmallDots ? true : false,
          },
          576: {
            items: rXmedium ? rXmedium : 2,
            nav: rXmediumNav ? true : false,
            dots: rXmediumDots ? true : false,
          },
          768: {
            items: rSmall ? rSmall : 3,
            nav: rSmallNav ? true : false,
            dots: rSmallDots ? true : false,
          },
          992: {
            items: rMedium ? rMedium : 4,
            nav: rMediumNav ? true : false,
            dots: rMediumDots ? true : false,
          },
          1200: {
            items: rLarge ? rLarge : 5,
            nav: rLargeNav ? true : false,
            dots: rLargeDots ? true : false,
          },
          1400: {
            items: rExtraLarge ? rExtraLarge : 6,
            nav: rExtraLargeNav ? true : false,
            dots: rExtraLargeDots ? true : false,
          },
        },
      });
      if (custom_nav) {
        var nav = $(custom_nav),
          nav_next = $(".rt-next", nav),
          nav_prev = $(".rt-prev", nav);

        nav_next.on("click", function (e) {
          e.preventDefault();
          owl.trigger("next.owl.carousel");
          return false;
        });

        nav_prev.on("click", function (e) {
          e.preventDefault();
          owl.trigger("prev.owl.carousel");
          return false;
        });
      }
    }

    $(".rc-carousel").each(function () {
      var carousel = $(this),
        options = $.extend(
          {
            trigger_start: "",
            trigger_end: "",
          },
          carousel.data("options")
        );

      if (!options.trigger_start && !options.trigger_end) {
        createCarousel(carousel);
      } else {
        var tempOwl = "";
        $(window).on("resize load", function () {
          var wW = $(window).width();

          if (wW <= options.trigger_start) {
            createCarousel(carousel);
            console.log("called", "create");
          } else {
            carousel.owlCarousel("destroy").removeClass("owl-carousel");
          }
        });
      }
    });
  }

  $('[data-type="section-switch"], #dropdown > ul > li > a').on(
    "click",
    function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        if (target.length > 0) {
          target = target.length
            ? target
            : $("[name=" + this.hash.slice(1) + "]");
          $("html,body").animate(
            {
              scrollTop: target.offset().top,
            },
            1000
          );
          return false;
        }
      }
    }
  );

  $(window).on("scroll", function () {
 
    if ($(window).scrollTop() > 700) {
      $(".return-to-top").addClass("back-top");
    } else {
      $(".return-to-top").removeClass("back-top");
    }


    if ($("header").hasClass("sticky-on")) {
      var stickyPlaceHolder = $("#sticky-placeholder"),
        menu = $("#navbar-wrap"),
        menuH = menu.outerHeight(),
        topbarH = $("#topbar-wrap").outerHeight() || 0,
        targrtScroll = topbarH,
        header = $("header");
      if ($(window).scrollTop() > targrtScroll) {
        header.addClass("sticky");
        stickyPlaceHolder.height(menuH);
      } else {
        header.removeClass("sticky");
        stickyPlaceHolder.height(0);
      }
    }
  });

  $("a[href=\\#]").on("click", function (e) {
    e.preventDefault();
  });
})(jQuery);
