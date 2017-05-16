'use strict';
var cheerio = require('cheerio');

function DomPocessor(configLoader) {
  this.process = function(html, currentPath) {
    var $ = cheerio.load(html, configLoader.loadConfigurations);
    var configs = configLoader.load(currentPath);
    configs.forEach(function(conf) {
      var $elements = $(conf.selector);
      var result;
      var $element;
      $elements.each(function (i, el) {
          $element = $(el);
          result = typeof conf.replace === 'function' ? conf.replace($element) : conf.replace;
          $element.replaceWith(result);
      });

    });
    return $.html();
  };
}

module.exports = DomPocessor;
