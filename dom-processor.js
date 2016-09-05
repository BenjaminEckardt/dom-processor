'use strict';
var cheerio = require('cheerio');

function DomPocessor(configLoader) {
  this.process = function(html, currentPath) {
    var $ = cheerio.load(html);
    var configs = configLoader.load(currentPath);
    configs.forEach(function(conf) {
      var $el = $(conf.selector);
      var result = typeof conf.replace === 'function' ? conf.replace($el) : conf.replace;
      $el.replaceWith(result);
    });
    return $.html();
  };
}

module.exports = DomPocessor;
