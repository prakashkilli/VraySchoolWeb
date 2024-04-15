$(function () {
    'use strict'; // Start of use strict


    /*--------------------------
    scrollUp
    ---------------------------- */
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });

    /*------------------------------------------------------------------
        Year
    ------------------------------------------------------------------*/
    $(function () {
        var theYear = new Date().getFullYear();
        $('#year').html(theYear);
    });

    /*------------------------------------------------------------------
           Mobile Menu Active
        ------------------------------------------------------------------*/
    jQuery('.mobile-menu-active').meanmenu({
        meanMenuContainer: '.mobile-menu-container',
        meanScreenWidth: "993"
    });
    /*--------------------------
       Header Searchbox
      ---------------------------- */
    $('.header-searchtrigger').on('click', function () {
        $(this).find('.fa').toggleClass('fa-search fa-close');
        $(this).siblings('.header-searchbox').toggleClass('is-visible');
    });
    /*------------------------------------------------------------------
		Sign In/Up Popup
    ------------------------------------------------------------------*/

    $('.open-popup-link').magnificPopup({
        type: 'inline',
        midClick: true,
        mainClass: 'mfp-fade'
    });

    // Popup Gallery JS
    $('.popup-gallery').magnificPopup({
        delegate: '.view-image',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
    });

    //Gallery Filtering
    $(document).ready(function () {

        $(".filter-button").click(function () {
            $(".filter-button").removeClass('current');
            $(this).addClass('current');

            var value = $(this).attr('data-filter');
            if (value == "all") {
                //$('.filter').removeClass('hidden');
                $('.filter').show('1000');
            } else {
                //            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
                //            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
                $(".filter").not('.' + value).hide('3000');
                $('.filter').filter('.' + value).show('3000');
            }
        });
        if ($(".filter-button").removeClass("active")) {
            $(this).removeClass("active");
        }
        $(this).addClass("active");

    });

    /*------------------------------------------------------------------
	  CounterUp
    ------------------------------------------------------------------*/

    $('.countdwon-number').counterUp({
        delay: 10,
        time: 2000,
    });

    /*------------------------------------------------------------------
        Navigation 
    ------------------------------------------------------------------*/

    // window.onscroll = function () {
    //     myFunction()
    // };
    // var header = document.getElementById("navigation");
    // var sticky = header.offsetTop;

    // function myFunction() {
    //     if (window.pageYOffset > sticky) {
    //         header.classList.add("sticky");
    //     } else {
    //         header.classList.remove("sticky");
    //     }
    // }
    /*------------------------------------------------------------------
        Video Popup 
    ------------------------------------------------------------------*/
    $('.video-play-btn').magnificPopup({
        type: 'video'
    });

    /*------------------------------------------------------------------
        Scroll Down Speed
    ------------------------------------------------------------------*/

    $('a.page-scroll').on('click', function (e) {
        var targetHref = $(this).attr('href');
        var navbar = $('.navbar').outerHeight();
        $('html, body').animate({
            scrollTop: $(targetHref).offset().top - navbar
        }, 1250, 'easeInOutExpo');
        e.preventDefault();
    });
    /*------------------------------------------------------------------
        Menu Bar Toggle
    ------------------------------------------------------------------*/

    $('.bar-toggler').on('click', function (e) {
        $('.menu-bar').toggleClass('active');
        $('.bar-toggler').toggleClass('change');
        e.preventDefault();
    });


    /*------------------------------------------------------------------
    FAQ
    ------------------------------------------------------------------*/
    // $('.panel-heading a').on('click', function() {
    //     $('.panel-heading').removeClass('active');
    //     $(this).parents('.panel-heading').addClass('active');
    // });

});

/*------------------------------------------------------------------
 Loader 
------------------------------------------------------------------*/
jQuery(window).on("load scroll", function () {
    'use strict'; // Start of use strict
    // Loader 
    $('#dvLoading').fadeOut('slow', function () {
        $(this).remove();
    });
    $('.google-map').on('click', function () {
        $('.google-map').find('iframe').css("pointer-events", "auto");
    });
    //Animation Numbers	 
    jQuery('.animateNumber').each(function () {
        var num = jQuery(this).attr('data-num');
        var top = jQuery(document).scrollTop() + (jQuery(window).height());
        var pos_top = jQuery(this).offset().top;
        if (top > pos_top && !jQuery(this).hasClass('active')) {
            jQuery(this).addClass('active').animateNumber({
                number: num
            }, 2000);
        }
    });

});

/*--------------------------
       Search Popup JS
    ---------------------------- */
    $('.close-btn').on('click',function() {
        $('.search-overlay').fadeOut();
        $('.search-btn').show();
        $('.close-btn').removeClass('active');
    });
 $('.search-btn').on('click',function() {
        $(this).hide();
        $('.search-overlay').fadeIn();
        $('.close-btn').addClass('active');
    });  

    /* ==================================================
            Hero Slider Carousel
         ===============================================*/
		
         $('.hero-sldr').owlCarousel({
            loop: true,
            nav: true,
            dots: false,
            autoplay: true,
			autoplayTimeout:9000,
            items: 1,
            navText: [
                "<i class='ti-angle-left'></i>",
                "<i class='ti-angle-right'></i>"
            ],
        });

        


        // vars
// 'use strict'
// var	testim = document.getElementById("testim"),
// 		testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
//     testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
//     testimLeftArrow = document.getElementById("left-arrow"),
//     testimRightArrow = document.getElementById("right-arrow"),
//     testimSpeed = 4500,
//     currentSlide = 0,
//     currentActive = 0,
//     testimTimer,
// 		touchStartPos,
// 		touchEndPos,
// 		touchPosDiff,
// 		ignoreTouch = 30;
// ;

// window.onload = function() {

//     // Testim Script
//     function playSlide(slide) {
//         for (var k = 0; k < testimDots.length; k++) {
//             testimContent[k].classList.remove("active");
//             testimContent[k].classList.remove("inactive");
//             testimDots[k].classList.remove("active");
//         }

//         if (slide < 0) {
//             slide = currentSlide = testimContent.length-1;
//         }

//         if (slide > testimContent.length - 1) {
//             slide = currentSlide = 0;
//         }

//         if (currentActive != currentSlide) {
//             testimContent[currentActive].classList.add("inactive");            
//         }
//         testimContent[slide].classList.add("active");
//         testimDots[slide].classList.add("active");

//         currentActive = currentSlide;
    
//         clearTimeout(testimTimer);
//         testimTimer = setTimeout(function() {
//             playSlide(currentSlide += 1);
//         }, testimSpeed)
//     }

//     testimLeftArrow.addEventListener("click", function() {
//         playSlide(currentSlide -= 1);
//     })

//     testimRightArrow.addEventListener("click", function() {
//         playSlide(currentSlide += 1);
//     })    

//     for (var l = 0; l < testimDots.length; l++) {
//         testimDots[l].addEventListener("click", function() {
//             playSlide(currentSlide = testimDots.indexOf(this));
//         })
//     }

//     playSlide(currentSlide);

//     // keyboard shortcuts
//     document.addEventListener("keyup", function(e) {
//         switch (e.keyCode) {
//             case 37:
//                 testimLeftArrow.click();
//                 break;
                
//             case 39:
//                 testimRightArrow.click();
//                 break;

//             case 39:
//                 testimRightArrow.click();
//                 break;

//             default:
//                 break;
//         }
//     })
		
// 		testim.addEventListener("touchstart", function(e) {
// 				touchStartPos = e.changedTouches[0].clientX;
// 		})
	
// 		testim.addEventListener("touchend", function(e) {
// 				touchEndPos = e.changedTouches[0].clientX;
			
// 				touchPosDiff = touchStartPos - touchEndPos;
			
// 				console.log(touchPosDiff);
// 				console.log(touchStartPos);	
// 				console.log(touchEndPos);	

			
// 				if (touchPosDiff > 0 + ignoreTouch) {
// 						testimLeftArrow.click();
// 				} else if (touchPosDiff < 0 - ignoreTouch) {
// 						testimRightArrow.click();
// 				} else {
// 					return;
// 				}
			
// 		})
// }