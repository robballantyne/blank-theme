$( document ).ready(function() {

    /// Slideout.js ///

    var moveFixedElements = true;
    var width = 290;
    var side = 'right';
    var slideoutMenu = new Slideout({
        'panel': document.getElementById('slideout-wrapper'),
        'menu': document.getElementById('slideout-menu'),
        'padding': width,
        'tolerance': 70,
        'easing': 'cubic-bezier(.32,2,.55,.27)',
        'side': side
    });

    if (side == 'right') {
        var translate = width - width - width;
    } else {
        var translate = width;
    }


    if (moveFixedElements === true) {
        var $moveMe = $('.slideoutMoveMe');

        if ($moveMe !== null) {

            slideoutMenu.on('translate', function (translate) {
                $moveMe.each(function() {
                    $(this).css({
                        transform : 'translateX(' + translate + 'px)'
                    });
                });
            });

            slideoutMenu.on('beforeopen', function () {
                $moveMe.each(function() {
                    $(this).css({
                        transition: 'transform 300ms ease',
                        transform : 'translateX(' + translate + 'px)'
                    });
                });

            });

            slideoutMenu.on('beforeclose', function () {
                $moveMe.each(function() {
                    $(this).css({
                        transition: 'transform 300ms ease',
                        transform : 'translateX(0px)'
                    });
                });
            });

            slideoutMenu.on('open', function () {
                $moveMe.each(function() {
                    $(this).css({
                        transition: ''
                    });
                });
            });

            slideoutMenu.on('close', function () {
                $( "#hidden-menu-trigger button" ).blur();
                $moveMe.each(function() {
                    $(this).css({
                        transition: ''
                    });
                });
            });
        }
    }

    /// End Slideout.js

    // Hidden menu logic TODO set correct status if starting with an expanded menu
    $( "#hidden-menu-trigger button" ).click(function() {
        $(this).blur();
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
            $(this).attr('aria-expanded', false);
            slideoutMenu.close();
        } else {
            $(this).addClass('is-active');
            $(this).attr('aria-expanded', true);
            slideoutMenu.open();
        }
    });

    padBody();

});


$( window ).resize(function() {
    padBody();
});

// Add padding-top equal to the height of a fixed header to the body
function padBody() {
    if ($('.header-container').hasClass('fixed')) {
        $('body').css('padding-top', $('.header-container').height());
    }
}