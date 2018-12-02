// ==================================================
// MedWay - HTML5 Template

// File:           js Base
// Version:        1.0
// Last change:    11/10/2017
// Author:         HTMLMATE
// ==================================================


(function ($) {
    "use strict";


    // search box - start
    // --------------------------------------------------
    $('.toggle-overlay').on('click', function () {
        $('.search-body').toggleClass('search-open');
    });
    // search box - end
    // --------------------------------------------------


    // main-slider - start
    // --------------------------------------------------
    $('.slider-section').slick({
        dots: true,
        fade: true,
        speed: 400,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: 'linear'
    });
    // main-slider - end
    // --------------------------------------------------


    // service-slider - start
    // --------------------------------------------------
    $('.service-slider').owlCarousel({
        nav: true,
        loop: true,
        margin: 30,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: {
            1100: {
                items: 3
            },
            1024: {
                items: 2
            },
            768: {
                items: 2
            },
            360: {
                items: 1
            },
            320: {
                items: 1
            }
        }
    });
    // service-slider - end
    // --------------------------------------------------


    // testimonial-section > carousel - start
    // --------------------------------------------------
    $('.testimonial-carousel').owlCarousel({
        items: 2,
        nav: false,
        loop: true,
        margin: 80,
        responsive: {
            1100: {
                items: 2
            },
            1024: {
                items: 1
            },
            768: {
                items: 1
            },
            360: {
                items: 1
            },
            320: {
                items: 1
            }
        }
    });
    // testimonial-section > carousel - end
    // --------------------------------------------------


    // slickslide-about - start
    // --------------------------------------------------
    $().ready(function (e) {
        $('.slickslide-about').slick({
            dots: true,
            speed: 400,
            slide: 'li',
            arrows: false,
            infinite: true,
            slidesToShow: 1,
            cssEase: 'linear',
            autoplaySpeed: 4000,
            responsive: [{
                breakpoint: 800,
                settings: {
                    dots: true,
                    slidesToShow: 1
                },
                breakpoint: 1200,
                settings: {
                    dots: true,
                    slidesToShow: 1

                }
            }],
            customPaging: function (slider, i) {
                return '<button class="tab">' + $('.slick-thumbs li:nth-child(' + (i + 1) + ')').html() + '</button>';
            }
        });
    });
    // slickslide-about - end
    // --------------------------------------------------


    // back to top - start
    // --------------------------------------------------
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 200) {
            $('.backtotop:hidden').stop(true, true).fadeIn();
        } else {
            $('.backtotop').stop(true, true).fadeOut();
        }
    });
    $(function () {
        $(".scroll").on('click', function () {
            $("html,body").animate({
                scrollTop: $(".thetop").offset().top
            }, "slow");
            return false
        })
    });
    // back to top - end
    // --------------------------------------------------

    // preloader - start
    // --------------------------------------------------
    $(window).on('load', function () {
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });
    // preloader - end
    // --------------------------------------------------


    // header-section - Start
    // --------------------------------------------------
    var mainHeader = $('.cd-auto-hide-header'),
        secondaryNavigation = $('.cd-secondary-nav'),
        //this applies only if secondary nav is below intro section
        belowNavHeroContent = $('.sub-nav-hero'),
        headerHeight = mainHeader.height();

    //set scrolling variables
    var scrolling = false,
        previousTop = 0,
        currentTop = 0,
        scrollDelta = 10,
        scrollOffset = 150;

    $(window).on('scroll', function () {
        if (!scrolling) {
            scrolling = true;
            (!window.requestAnimationFrame)
                ? setTimeout(autoHideHeader, 250)
                : requestAnimationFrame(autoHideHeader);
        }
    });

    $(window).on('resize', function () {
        headerHeight = mainHeader.height();
    });

    function autoHideHeader() {
        var currentTop = $(window).scrollTop();

        (belowNavHeroContent.length > 0)
            ? checkStickyNavigation(currentTop) // secondary navigation below intro
            : checkSimpleNavigation(currentTop);

        previousTop = currentTop;
        scrolling = false;
    }

    function checkSimpleNavigation(currentTop) {
        //there's no secondary nav or secondary nav is below primary nav
        if (previousTop - currentTop > scrollDelta) {
            //if scrolling up...
            mainHeader.removeClass('is-hidden');
        } else if (currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
            //if scrolling down...
            mainHeader.addClass('is-hidden');
        }
    }

    function checkStickyNavigation(currentTop) {
        //secondary nav below intro section - sticky secondary nav
        var secondaryNavOffsetTop = belowNavHeroContent.offset().top - secondaryNavigation.height() - mainHeader.height();

        if (previousTop >= currentTop) {
            //if scrolling up...
            if (currentTop < secondaryNavOffsetTop) {
                //secondary nav is not fixed
                mainHeader.removeClass('is-hidden');
                secondaryNavigation.removeClass('fixed slide-up');
                belowNavHeroContent.removeClass('secondary-nav-fixed');
            } else if (previousTop - currentTop > scrollDelta) {
                //secondary nav is fixed
                mainHeader.removeClass('is-hidden');
                secondaryNavigation.removeClass('slide-up').addClass('fixed');
                belowNavHeroContent.addClass('secondary-nav-fixed');
            }

        } else {
            //if scrolling down...
            if (currentTop > secondaryNavOffsetTop + scrollOffset) {
                //hide primary nav
                mainHeader.addClass('is-hidden');
                secondaryNavigation.addClass('fixed slide-up');
                belowNavHeroContent.addClass('secondary-nav-fixed');
            } else if (currentTop > secondaryNavOffsetTop) {
                //once the secondary nav is fixed, do not hide primary nav if you haven't scrolled more than scrollOffset
                mainHeader.removeClass('is-hidden');
                secondaryNavigation.addClass('fixed').removeClass('slide-up');
                belowNavHeroContent.addClass('secondary-nav-fixed');
            }

        }
    };
    // header-section - end
    // --------------------------------------------------


    // google map - start
    // --------------------------------------------------
    function isMobile() {
        return ('ontouchstart' in document.documentElement);
    }

    function init_gmap() {
        if (typeof google == 'undefined') return;
        var options = {
            center: [23.7806286, 90.2793692],
            zoom: 14,
            styles: [
                {elementType: 'geometry', stylers: [{color: '#f2f2f2'}]},
                {elementType: 'labels.text.stroke', stylers: [{color: '#ffffff'}]},
                {elementType: 'labels.text.fill', stylers: [{color: '#050505'}]},
                {
                    featureType: 'administrative.locality',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#7c7c7c'}]
                },
                {
                    featureType: 'poi',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#5a5a5a'}]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'geometry',
                    stylers: [{color: '#aaee7f'}]
                },
                {
                    featureType: 'poi.park',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#aaee7f'}]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry',
                    stylers: [{color: '#ffffff'}]
                },
                {
                    featureType: 'road',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#96dd1e'}]
                },
                {
                    featureType: 'road',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#cb0630'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry',
                    stylers: [{color: '#fbfbfb'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'geometry.stroke',
                    stylers: [{color: '#b0b0b0'}]
                },
                {
                    featureType: 'road.highway',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#050505'}]
                },
                {
                    featureType: 'transit',
                    elementType: 'geometry',
                    stylers: [{color: '#050505'}]
                },
                {
                    featureType: 'transit.station',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#aaee7f'}]
                },
                {
                    featureType: 'water',
                    elementType: 'geometry',
                    stylers: [{color: '#aad2e3'}]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.fill',
                    stylers: [{color: '#050505'}]
                },
                {
                    featureType: 'water',
                    elementType: 'labels.text.stroke',
                    stylers: [{color: '#050505'}]
                }
            ],
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
            },
            navigationControl: true,
            scrollwheel: false,
            streetViewControl: true,
        }

        if (isMobile()) {
            options.draggable = false;
        }

        $('#google-map').gmap3({
            map: {
                options: options
            },
            marker: {
                latLng: [23.7806286, 90.2793692],
                // options: { icon: 'assets/img/map.png' }
            }
        });
    }

    init_gmap();
    // google map - end
    // --------------------------------------------------


})(jQuery);