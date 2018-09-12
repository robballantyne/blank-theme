import $ from 'jquery';
window.$ = window.jQuery = $;

window.Slideout = Slideout;
import * as Slideout from 'slideout';

import * as iziModal from 'izimodal';
$.fn.iziModal = iziModal;

import * as select2 from 'select2';
window.select2 = select2;

require('./scripts/init');