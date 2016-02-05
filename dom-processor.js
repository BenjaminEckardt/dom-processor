'use strict';
var cheerio = require('cheerio');
var fs = require('fs');

function DomPocessor(configLoader) {
  this.process = function(html, currentPath) {
    var $ = cheerio.load(html);
    var configs = configLoader.load(currentPath);
    configs.forEach(function(conf) {
      var $el = $(conf.selector);
      var result = conf.replace($el);
      $el.replaceWith(result);
    });
    return $.html();
  };
}

module.exports = DomPocessor;
