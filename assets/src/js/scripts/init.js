$( document ).ready(function() {

    /// Slideout.js ///

    disableSlideoutOn('.gdpr-cookie-manager__cookies');
    var moveFixedElements = true;
    var width = 240;
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
                $( "#hidden-menu-trigger button" ).addClass('is-active');
                $( "#hidden-menu-trigger button" ).attr('aria-expanded', true);
                $moveMe.each(function() {
                    $(this).css({
                        transition: 'transform 300ms ease',
                        transform : 'translateX(' + translate + 'px)'
                    });
                });

            });

            slideoutMenu.on('beforeclose', function () {
                $( "#hidden-menu-trigger button" ).removeClass('is-active');
                $( "#hidden-menu-trigger button" ).attr('aria-expanded', false);
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
            slideoutMenu.close();
        } else {
            slideoutMenu.open();
        }
    });

    padBody();

    // Initialise any modals before select2
    $('.iziModal').each(function() {
        $(this).iziModal({
            onOpening: function(modal) {
                select2init(5); // Initialise any select2 inside a modal
            },
            onResize: function(modal) {
                select2init(5); // Initialise any select2 inside a modal
            },
            onfullscreen: function(modal) {
                select2init(5); // Initialise any select2 inside a modal
            }
        });
    });
    createAlertModals();
    select2init();
    unwrapImages();
    prepareMainMenu();

});


$( window ).resize(function() {
    padBody();
    select2init();
});

// Desktop menu open/close logic
$('nav ul').on('click focus mouseenter', 'li.dropdown a', function (e) {
    let $initiator = $(this);

    if (!$initiator.closest('li.dropdown').hasClass('open')) {
        e.preventDefault();
    }
    setTimeout(function() {
        $initiator.closest('li.dropdown').siblings().removeClass('open').find('li').removeClass('open');
        $initiator.closest('li.dropdown').children().removeClass('open').find('li').removeClass('open');
        $initiator.closest('li.dropdown').addClass("open");
        $('body').addClass('menu-open');
    }, 200, $initiator);

});

$(document).on('click focus', 'body.menu-open' , function(e) {
   if ($(e.target).closest('li.open').length === 0) {
    $('li.open').removeClass('open');
    $('body').removeClass('menu-open');
   }
});

$(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
        $('li.open').removeClass('open');
        $('body').removeClass('menu-open');
    }
});
// End desktop menu logic

// Add padding-top equal to the height of a fixed header to the body
function padBody()
{
    if ($('.header-container').hasClass('fixed')) {
        $('body').css('padding-top', $('.header-container').height());
    }
}

// Select2 for form select elements
function select2init(delay)
{
    // Add select2 class to elements we don't control
    $('select#gdpr').addClass('select2'); // OFFLINE GDPR plugin.

    setTimeout(function(){
        $('select.select2').select2({
            minimumResultsForSearch: 20 // at least 20 results must be displayed
        });
    ; }, delay ? delay : 0);

}

// Add alert modals to handle October flash messages
function createAlertModals() {
    $( "<div></div>" ).attr('id', 'modal-alert-success').appendTo( "body" ).iziModal({
        title: 'Success',
        subtitle: 'Alert',
        headerColor: '#5cb85c',
        width: 800,
        timeout: 10000,
        pauseOnHover: true,
        timeoutProgressbar: true,
        icon: "fa fa-check",
        top: 0
    });

    $( "<div></div>" ).attr('id', 'modal-alert-warning').appendTo( "body" ).iziModal({
        title: 'Warning',
        subtitle: 'Alert',
        headerColor: '#ec971f',
        width: 800,
        timeout: 10000,
        pauseOnHover: true,
        timeoutProgressbar: true,
        icon: "fa fa-exclamation-triangle",
        top: 0
    });

    $( "<div></div>" ).attr('id', 'modal-alert-error').appendTo( "body" ).iziModal({
        title: 'Error',
        subtitle: 'Alert',
        headerColor: '#d9534f',
        width: 800,
        timeout: 10000,
        pauseOnHover: true,
        timeoutProgressbar: true,
        icon: "fa fa-times",
        top: 0
    });
}

function unwrapImages() {
    $("p:has(img)").each(function() {
        $(this).before( $(this).find("img") );
        if(!$.trim(this.innerHTML).length) $(this).remove();
    });
}

function prepareMainMenu() {
    $("nav ul li:has(ul)").addClass('dropdown');
    $("nav ul li.dropdown:first > a").append(" <i class='fa fa-caret-down'></i>");
    $("nav ul li.dropdown:not(:first) > a").append(" <i class='fa fa-caret-right'></i>");
}

$('.izimodal-trigger-contact').on('click', function() {
    $('#contact-modal').iziModal('open');
});

function disableSlideoutOn(identifier) {
    $(identifier).attr('data-slideout-ignore', '');
}

$(document).on('ajaxSetup', function(event, context) {
    // Pass october flash messages on to iziModal to make things prettier
    context.options.handleFlashMessage = function(message, type) {
        var $modal = $("#modal-alert-" + type);
        $modal.iziModal('setSubtitle', message);
        $modal.iziModal('open');
    }
});

