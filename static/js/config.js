var version = '20140414';

var versionJS = '20140414';

versionJS = versionJS === '' ? version : versionJS;

seajs.config({
  alias: {
    'asyncSlider': 'lib/asyncSlider/1.0.0/asyncSlider.js',
    'city': 'lib/city/1.0.0/city.js',
    'new-city': 'lib/city/1.0.1/new-city.js',
    'counter': 'lib/counter/0.0.1/jquery.counter.js',
    'easing': 'lib/easing/1.3.0/easing.js',
    'flash': 'lib/flash/1.0.1/jquery.flash.js',
    'handlebars': 'lib/handlebars/1.0.0/handlebars.js',
    'highcharts': 'lib/highcharts/3.0.5/highcharts.js',
    'jquery': 'lib/jquery/1.9.1/jquery.js',
    'queue': 'lib/plupload/1.5.7/jquery.plupload.queue',
    'simplePagination': 'lib/simplePagination/1.5.0/simplePagination.js',
    'validate': 'lib/validation/1.11.1/jquery.validate.js',
    'mailSuggest':'lib/mailSuggest/0.0.1/mailSuggest.js',

    'base': 'arale/base/1.1.1/base.js',
    'class': 'arale/class/1.1.0/class.js',
    'events': 'arale/events/1.1.0/events',
    'widget': 'arale/widget/1.1.1/widget.js',
    'popup': 'arale/popup/1.1.2/popup.js',
    'tip': 'arale/tip/1.1.4/tip.js',
    'overlay': 'arale/overlay/1.1.2/overlay.js',
    'mask': 'arale/overlay/1.1.2/mask.js',
    'iframe-shim': 'arale/shim/1.0.2/iframe-shim.js',
    'position': 'arale/position/1.0.1/position.js',
    'dialog': 'arale/dialog/1.3.3/dialog',
    'confirmbox': 'arale/dialog/1.3.3/confirmbox',
    'templatable': 'arale/templatable/0.9.1/templatable',
    'calendar': 'arale/calendar/0.9.0/calendar.js',
    'moment': 'arale/moment/2.1.0/moment.js',
    'sticky':'arale/sticky/1.2.1/sticky.js',

    'ui-counter': 'lib/counter/0.0.1/jquery.counter-analog.css',
    'ui-poptip': 'alice/poptip/1.1.1/poptip.css'
  },
  
  map: [
    [/^(.*(widgets|components|pages|common|page|protocol).*\.js)(.*)$/i, '$1?v=' + versionJS]
  ]
  
});
