'use strict';
var _ = require('lodash');

/**
 * @description 生成随机数
 * @param {int} n 随机数位数
 * @param {int} min 随机数没位最小值
 * @param {int} max 随机数没位最大值
 * @param {Boolean} repeat 是否可以重复
 */
var randomNumber = function(n, min, max, repeat) {
    var arr = [];
    for (var i = 0; i < n; i++) {
        arr[i] = parseInt(Math.random() * (max - min + 1) + min);
        if (!repeat) {
            for (var j = 0; j < i; j++) {
                if (arr[i] === arr[j]) {
                    i = i - 1;
                    break;
                }
            }
        }
    }
    return arr.join('');
};

/**
 * @description 生成指定list以外的随机数
 * @param {int} n 随机数位数
 * @param {int} min 随机数没位最小值
 * @param {int} max 随机数没位最大值
 * @param {Boolean} repeat 是否可以重复
 * @param {Array} excludes 指定值数组
 */
var randomNumberExcludeList = function(n, min, max, repeat, excludes) {
    var rstNum;
    var index = 0;
    while (index >= 0) {
        rstNum = this.randomNumber(n, min, max, repeat);
        index = _.indexOf(excludes, rstNum);
    }
    return rstNum;
};

var randomHelper = {
    randomNumber,
    randomNumberExcludeList
};

module.exports = randomHelper;
