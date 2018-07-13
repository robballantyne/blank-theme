try {
    window.$ = window.jQuery = jQuery = require('jquery');
    // Load jquery dependencies
    window.Slideout = require('slideout');
    $.fn.iziModal = require('izimodal');
    window.select2 = require('select2');
    window.octoberFramework = require("../../../../../modules/system/assets/js/framework"); // October framework
    window.octoberFrameworkExtras = require("../../../../../modules/system/assets/js/framework.extras"); // October framework extras
} catch (e) {
    console.log('jQuery not loaded');
}
