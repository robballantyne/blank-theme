import Slideout from 'slideout';

window.SlideoutLeft = new Slideout({
    'panel': document.getElementById('slideout-panel'),
    'menu': document.getElementById('slideout-menu-left'),
    'padding': 256,
    'tolerance': 70
});

window.SlideoutRight = new Slideout({
    'panel': document.getElementById('slideout-panel'),
    'menu': document.getElementById('slideout-menu-right'),
    'padding': 256,
    'tolerance': 70,
    'side': 'right'
});

import * as iziModal from 'izimodal';
$.fn.iziModal = iziModal;

import * as select2 from 'select2';
window.select2 = select2;

require('./scripts/functions');
require('./scripts/menus');
require('./scripts/init');