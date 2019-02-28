$( document ).ready(function() {


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
    unwrapImages();

});


// Maintain information about how far the user has scrolled down the page
window.addEventListener("scroll", debounce(function() {
   var html = document.documentElement;
   var scrollDistance = html.scrollTop;
   html.setAttribute("data-scrolled", scrollDistance);
   fixedHeaderSize(scrollDistance, 50, "shrink");
}, 50));

var mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        var classes = mutation.target.classList;
        var oldClasses = mutation.oldValue;
        if (classes.contains('shrink') && ! oldClasses.includes("shrink")) {
            console.log('shrinking...');
            setTimeout(padBody, 0)
        }
        if (! classes.contains('shrink') && oldClasses.includes("shrink")) {
            console.log('growing...');
            setTimeout(padBody, 0)
        }
    });
});

mutationObserver.observe(document.getElementById('fixed-header'), {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
    attributeOldValue: true,
    attributeFilter: ['class'],
    characterDataOldValue: true
});

$( window ).resize(function() {
    padBody();
});



// Add padding-top equal to the height of a fixed header to the body
// function padBody()
// {
//     if ($('header').hasClass('fixed')) {
//         $('body').css('padding-top', $('header.fixed').height());
//     }
// }

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


$('.izimodal-trigger-contact').on('click', function() {
    $('#contact-modal').iziModal('open');
});


$(document).on('ajaxSetup', function(event, context) {
    // Pass october flash messages on to iziModal to make things prettier
    context.options.handleFlashMessage = function(message, type) {
        var $modal = $("#modal-alert-" + type);
        $modal.iziModal('setSubtitle', message);
        $modal.iziModal('open');
    }
});
