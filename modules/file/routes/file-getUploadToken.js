'use strict';

/**
 * API：取得文件上传Token
 */
const baseRouter = require('common/router/baseRouter');
const configHelper = require('base/config/configHelper');

const qiniu = require('qiniu');

qiniu.conf.ACCESS_KEY = configHelper.getConfig('qiniu.accessKey');
qiniu.conf.SECRET_KEY = configHelper.getConfig('qiniu.secretKey');


//构建上传策略函数
function uptoken(bucket) {
    let putPolicy = new qiniu.rs.PutPolicy(bucket);
    return putPolicy.token();
}

function controller() {
    let bucket = configHelper.getConfig('qiniu.bucket');

    let token = uptoken(bucket);
    let result = { uptoken: token };
    return result;
}

let router = baseRouter('/file/getUploadToken', controller, { method: 'get' });
module.exports = router;
