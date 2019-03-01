webpackJsonp([1],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(4);
__webpack_require__(12);
module.exports = __webpack_require__(13);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_slideout__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_slideout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_slideout__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_izimodal__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_izimodal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_izimodal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_select2__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_select2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_select2__);


window.SlideoutLeft = new __WEBPACK_IMPORTED_MODULE_0_slideout___default.a({
    'panel': document.getElementById('slideout-panel'),
    'menu': document.getElementById('slideout-menu-left'),
    'padding': 256,
    'tolerance': 70
});

window.SlideoutRight = new __WEBPACK_IMPORTED_MODULE_0_slideout___default.a({
    'panel': document.getElementById('slideout-panel'),
    'menu': document.getElementById('slideout-menu-right'),
    'padding': 256,
    'tolerance': 70,
    'side': 'right'
});


$.fn.iziModal = __WEBPACK_IMPORTED_MODULE_1_izimodal__;


window.select2 = __WEBPACK_IMPORTED_MODULE_2_select2__;

__webpack_require__(9);
__webpack_require__(10);
__webpack_require__(11);

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports) {

// https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
debounce = function debounce(func, delay) {
    var inDebounce = void 0;
    return function () {
        var context = this;
        var args = arguments;
        clearTimeout(inDebounce);
        inDebounce = setTimeout(function () {
            return func.apply(context, args);
        }, delay);
    };
};

throttle = function throttle(func, limit) {
    var lastFunc = void 0;
    var lastRan = void 0;
    return function () {
        var context = this;
        var args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if (Date.now() - lastRan >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
};

fixedHeaderSize = function fixedHeaderSize(scrollDistance, threshold, className) {
    var fixedHeader = document.getElementById("fixed-header");
    if (scrollDistance > threshold) {
        fixedHeader.classList.add(className);
        document.body.classList.add(className);
    } else {
        fixedHeader.classList.remove(className);
        document.body.classList.remove(className);
    }
};

padBody = function padBody() {
    if ($('header').hasClass('fixed')) {
        $('body').addClass("fixed-header");
        var height = $('header.fixed').css('max-height');
        $('body').css('padding-top', height);
    }
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

$menuLiWithChildren = $('li.has-children');
$menuLiWithChildren.each(function () {
    $(this).append("<a class=\"expander\" href=\"#_\"></a>");
    $(this).find('ul').prop("hidden", true);
});

$("a.expander").on("click", function () {
    toggleInnerMenuDropdown($(this), 'open');
});

function toggleInnerMenuDropdown($initiator, activeClass, $target) {
    $parentLi = $initiator.closest('li');
    if (typeof $target == 'undefined') {
        $target = $parentLi.children('ul');
    }

    if (typeof activeClass == 'undefined') {
        activeClass = "active";
    }

    // Close the open menu
    if ($target.hasClass(activeClass)) {
        $target.removeClass(activeClass);
        $target.css("max-height", 0);
        var menuTimerClose = setTimeout(function () {
            $target.prop("hidden", true);
            $initiator.removeClass(activeClass);
        }, 300);

        // Open the menu
    } else {
        clearTimeout(menuTimerClose);
        $initiator.addClass(activeClass);
        $target.prop("hidden", false);
        var menuTimerOpen = setTimeout(function () {
            $target.addClass(activeClass);

            // Get height of this element plus all of it's children
            maxHeight = $target.prop("scrollHeight");
            $target.children().each(function () {
                maxHeight = maxHeight + $(this).prop("scrollHeight");
            });

            parentMaxHeight = parseInt($target.parents('li.has-children ul').css("max-height")) + maxHeight;

            $target.parents('li.has-children ul').css("max-height", parentMaxHeight);

            $target.css("max-height", maxHeight);
        }, 10);
    }
}

$('.hamburger.dropdown').on("click", function () {
    if ($(this).attr("data-targets") == "hidden-rolldown-main") {
        toggleInnerMenuDropdown($(this), "is-active", $("#hidden-rolldown-main"));
    }
});

$('.hamburger.slideout').on("click", function () {
    if ($(this).attr("data-targets") == "slideout-menu-left") {
        window.SlideoutLeft.toggle();
    }
    if ($(this).attr("data-targets") == "slideout-menu-right") {
        window.SlideoutRight.toggle();
    }
});

SlideoutLeft.on("beforeopen", function () {
    var htmlId = $(this)[0].menu.id;
    var $button = $("button[data-targets=" + htmlId + "]");
    $button.addClass('is-active');
    $(this)[0].menu.classList.add("open");
});

SlideoutLeft.on("close", function () {
    var htmlId = $(this)[0].menu.id;
    var $button = $("button[data-targets=" + htmlId + "]");
    $button.removeClass('is-active');
    $(this)[0].menu.classList.remove("open");
});

SlideoutRight.on("beforeopen", function () {
    var htmlId = $(this)[0].menu.id;
    var $button = $("button[data-targets=" + htmlId + "]");
    $button.addClass('is-active');
    $(this)[0].menu.classList.add("open");
});

SlideoutRight.on("close", function () {
    var htmlId = $(this)[0].menu.id;
    var $button = $("button[data-targets=" + htmlId + "]");
    $button.removeClass('is-active');
    $(this)[0].menu.classList.remove("open");
});

var fixedElements = document.getElementsByClassName('slideout-shift');
SlideoutRight.on('translate', function (translated) {
    for (var i = 0; i < fixedElements.length; i++) {
        var element = fixedElements.item(i);
        element.style.transform = 'translateX(' + translated + 'px)';
    }
});

SlideoutRight.on('beforeopen', function () {
    for (var i = 0; i < fixedElements.length; i++) {
        var element = fixedElements.item(i);
        element.style.transition = 'transform 300ms ease';
        element.style.transform = 'translateX(-256px)';
    }
});

SlideoutRight.on('beforeclose', function () {
    for (var i = 0; i < fixedElements.length; i++) {
        var element = fixedElements.item(i);
        element.style.transition = 'transform 300ms ease';
        element.style.transform = 'translateX(0)';
    }
});

SlideoutRight.on('open', function () {
    for (var i = 0; i < fixedElements.length; i++) {
        var element = fixedElements.item(i);
        element.style.transition = '';
    }
});

SlideoutRight.on('close', function () {
    for (var i = 0; i < fixedElements.length; i++) {
        var element = fixedElements.item(i);
        element.style.transition = '';
    }
});

SlideoutLeft.on('translate', function (translated) {
    for (var i = 0; i < fixedElements.length; i++) {
        var element = fixedElements.item(i);
        element.style.transform = 'translateX(' + translated + 'px)';
    }
});

SlideoutLeft.on('beforeopen', function () {
    for (var i = 0; i < fixedElements.length; i++) {
        var element = fixedElements.item(i);
        element.style.transition = 'transform 300ms ease';
        element.style.transform = 'translateX(256px)';
    }
});

SlideoutLeft.on('beforeclose', function () {
    for (var i = 0; i < fixedElements.length; i++) {
        var element = fixedElements.item(i);
        element.style.transition = 'transform 300ms ease';
        element.style.transform = 'translateX(0)';
    }
});

SlideoutLeft.on('open', function () {
    for (var i = 0; i < fixedElements.length; i++) {
        var element = fixedElements.item(i);
        element.style.transition = '';
    }
});

SlideoutLeft.on('close', function () {
    for (var i = 0; i < fixedElements.length; i++) {
        var element = fixedElements.item(i);
        element.style.transition = '';
    }
});

/***/ }),
/* 11 */
/***/ (function(module, exports) {

$(document).ready(function () {

    padBody();

    // Initialise any modals before select2
    $('.iziModal').each(function () {
        $(this).iziModal({
            onOpening: function onOpening(modal) {
                select2init(5); // Initialise any select2 inside a modal
            },
            onResize: function onResize(modal) {
                select2init(5); // Initialise any select2 inside a modal
            },
            onfullscreen: function onfullscreen(modal) {
                select2init(5); // Initialise any select2 inside a modal
            }
        });
    });
    createAlertModals();
    unwrapImages();
});

// Maintain information about how far the user has scrolled down the page
window.addEventListener("scroll", debounce(function () {
    var html = document.documentElement;
    var scrollDistance = html.scrollTop;
    html.setAttribute("data-scrolled", scrollDistance);
    fixedHeaderSize(scrollDistance, 50, "shrink");
}, 50));

var mutationObserver = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        var classes = mutation.target.classList;
        var oldClasses = mutation.oldValue;
        if (classes.contains('shrink') && !oldClasses.includes("shrink")) {
            setTimeout(padBody, 0);
        }
        if (!classes.contains('shrink') && oldClasses.includes("shrink")) {
            setTimeout(padBody, 0);
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

$(window).resize(function () {
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
function select2init(delay) {
    // Add select2 class to elements we don't control
    $('select#gdpr').addClass('select2'); // OFFLINE GDPR plugin.

    setTimeout(function () {
        $('select.select2').select2({
            minimumResultsForSearch: 20 // at least 20 results must be displayed
        });
        ;
    }, delay ? delay : 0);
}

// Add alert modals to handle October flash messages
function createAlertModals() {
    $("<div></div>").attr('id', 'modal-alert-success').appendTo("body").iziModal({
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

    $("<div></div>").attr('id', 'modal-alert-warning').appendTo("body").iziModal({
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

    $("<div></div>").attr('id', 'modal-alert-error').appendTo("body").iziModal({
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
    $("p:has(img)").each(function () {
        $(this).before($(this).find("img"));
        if (!$.trim(this.innerHTML).length) $(this).remove();
    });
}

$('.izimodal-trigger-contact').on('click', function () {
    $('#contact-modal').iziModal('open');
});

$(document).on('ajaxSetup', function (event, context) {
    // Pass october flash messages on to iziModal to make things prettier
    context.options.handleFlashMessage = function (message, type) {
        var $modal = $("#modal-alert-" + type);
        $modal.iziModal('setSubtitle', message);
        $modal.iziModal('open');
    };
});

/***/ }),
/* 12 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[3]);
//# sourceMappingURL=app.js.map