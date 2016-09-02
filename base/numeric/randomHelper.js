'use strict';
const _ = require('lodash');

/**
 * @description 生成随机数
 * @param {int} n 随机数位数
 * @param {int} min 随机数没位最小值
 * @param {int} max 随机数没位最大值
 * @param {Boolean} repeat 是否可以重复
 */
let randomNumber = function(n, min, max, repeat) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr[i] = parseInt(Math.random() * (max - min + 1) + min);
        if (!repeat) {
            for (let j = 0; j < i; j++) {
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
let randomNumberExcludeList = function(n, min, max, repeat, excludes) {
    let rstNum;
    let index = 0;
    while (index >= 0) {
        rstNum = this.randomNumber(n, min, max, repeat);
        index = _.indexOf(excludes, rstNum);
    }
    return rstNum;
};

let randomHelper = {
    randomNumber,
    randomNumberExcludeList
};

module.exports = randomHelper;
