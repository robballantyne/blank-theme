// https://codeburst.io/throttling-and-debouncing-in-javascript-b01cad5c8edf
debounce = (func, delay) => {
    let inDebounce
    return function() {
        const context = this
        const args = arguments
        clearTimeout(inDebounce)
        inDebounce = setTimeout(() => func.apply(context, args), delay)
    }
}

throttle = (func, limit) => {
    let lastFunc
    let lastRan
    return function() {
        const context = this
        const args = arguments
        if (!lastRan) {
            func.apply(context, args)
            lastRan = Date.now()
        } else {
            clearTimeout(lastFunc)
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args)
                    lastRan = Date.now()
                }
            }, limit - (Date.now() - lastRan))
        }
    }
}

fixedHeaderSize = function(scrollDistance, threshold, className) {
    var fixedHeader = document.getElementById("fixed-header");
    if (scrollDistance > threshold) {
        fixedHeader.classList.add(className);
        document.body.classList.add(className)
    } else {
        fixedHeader.classList.remove(className);
        document.body.classList.remove(className);
    }
}

padBody = function() {
    if ($('header').hasClass('fixed')) {
        $('body').addClass("fixed-header");
        var height = $('header.fixed').css('max-height');
        $('body').css('padding-top', height);
    }
}