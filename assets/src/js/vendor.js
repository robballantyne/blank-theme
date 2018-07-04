try {
    window.$ = window.jQuery = require('jquery');
    // Load jquery dependencies
    window.Slideout = require('slideout');
    window.iziModal = require('izimodal');
    require("../../../../../modules/system/assets/js/framework"); // October framework
    require("../../../../../modules/system/assets/js/framework.extras"); // October framework extras
} catch (e) {
    console.log('jQuery not loaded');
}
