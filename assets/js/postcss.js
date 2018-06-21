'use strict';

var postcss = require('postcss');
var Px2rem = require('px2rem');

module.exports = postcss.plugin('postcss-px2rem-exclude', function (options) {

  return function (css, result) {
      // console.log(options.exclude && css.source.input.file.match(options.exclude) !== null);
      // console.log(options.exclude[0])
    if (options.exclude && ((css.source.input.file.match(options.exclude[0]) !== null)||(css.source.input.file.match(options.exclude[1]) !== null))) {
      result.root = css;
      return
    }
    // if (options.exclude && css.source.input.file.match(options.exclude))  {
    //   result.root = css;
    //   return
    // }
    var oldCssText = css.toString();
    var px2remIns = new Px2rem(options);
    var newCssText = px2remIns.generateRem(oldCssText);
    result.root = postcss.parse(newCssText)
    // result.root = css;
      return
  }
});
