try {
    window.$ = window.jQuery = require('jquery');
    // Load jquery dependencies
    require('./scripts/init');

} catch (e) {
    console.log('jQuery not loaded');
}

