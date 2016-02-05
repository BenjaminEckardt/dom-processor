'use strict';
var cheerio = require('cheerio');
var fs = require('fs');
var configFactory;
module.exports = {
  config: function(factory) {
    configFactory = factory;
  },
  process: function(html, currentPath) {
    var $ = cheerio.load(html);
    var configs = configFactory(currentPath);
    configs.forEach(function(conf) {
      var $el = $(conf.selector);
      $el.replaceWith(conf.replace($el));
    });
    return $.html();
  }
};
