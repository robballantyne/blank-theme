$menuLiWithChildren = $('li.has-children');
$menuLiWithChildren.each(function () {
    $(this).append("<a class=\"expander\" href=\"#_\"></a>");
    $(this).find('ul').prop("hidden", true);
});

$("a.expander").on("click", function() {
    toggleInnerMenuDropdown($(this), 'open');
});

function toggleInnerMenuDropdown($initiator, activeClass, $target) {
    $parentLi = $initiator.closest('li');
    if (typeof $target == 'undefined')  {
        $target = $parentLi.children('ul');
    }

    if (typeof activeClass == 'undefined')  {
        activeClass = "active";
    }

    // Close the open menu
    if ($target.hasClass(activeClass)) {
        $target.removeClass(activeClass);
        $target.css("max-height", 0);
        var menuTimerClose = setTimeout(function(){
            $target.prop("hidden", true);
            $initiator.removeClass(activeClass);
        }, 300);

        // Open the menu
    } else {
        clearTimeout(menuTimerClose);
        $initiator.addClass(activeClass);
        $target.prop("hidden", false);
        var menuTimerOpen = setTimeout(function(){
            $target.addClass(activeClass);

            // Get height of this element plus all of it's children
            maxHeight = $target.prop("scrollHeight");
            $target.children().each(function(){
                maxHeight = maxHeight + $(this).prop("scrollHeight");
            });

            parentMaxHeight = parseInt($target.parents('li.has-children ul').css("max-height")) + maxHeight;

            $target.parents('li.has-children ul').css("max-height", parentMaxHeight);

            $target.css("max-height", maxHeight);
        }, 10);
    }
}

$('.hamburger.dropdown').on("click", function(){
    if ($(this).attr("data-targets") == "hidden-rolldown-main") {
        toggleInnerMenuDropdown($(this), "is-active", $("#hidden-rolldown-main"));
    }
});

$('.hamburger.slideout').on("click", function(){
    if ($(this).attr("data-targets") == "slideout-menu-left") {
        window.SlideoutLeft.toggle();
    }
    if ($(this).attr("data-targets") == "slideout-menu-right") {
        window.SlideoutRight.toggle();
    }
});

SlideoutLeft.on("beforeopen", function() {
    var htmlId = $(this)[0].menu.id;
    var $button = $("button[data-targets=" + htmlId + "]");
    $button.addClass('is-active');
    $(this)[0].menu.classList.add("open");
});

SlideoutLeft.on("close", function() {
    var htmlId = $(this)[0].menu.id;
    var $button = $("button[data-targets=" + htmlId + "]");
    $button.removeClass('is-active');
    $(this)[0].menu.classList.remove("open");
});

SlideoutRight.on("beforeopen", function() {
    var htmlId = $(this)[0].menu.id;
    var $button = $("button[data-targets=" + htmlId + "]");
    $button.addClass('is-active');
    $(this)[0].menu.classList.add("open");
});

SlideoutRight.on("close", function() {
    var htmlId = $(this)[0].menu.id;
    var $button = $("button[data-targets=" + htmlId + "]");
    $button.removeClass('is-active');
    $(this)[0].menu.classList.remove("open");
});