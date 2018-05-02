/**
 * 扩展ajax
 * @Author：刘江涛
 *
 */

layui.define(["jquery"], function(exports){ //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
    var $ = layui.jquery;
    //判断类型
    var type = function(obj){
        return Object.prototype.toString.call(obj).replace(/\[object\s(\w+)\]/g,function($1){
            return arguments[1].toLocaleLowerCase()
        })
    };
    var timeOut = 10 * 1000;
    var autoClose = 3 * 1000;
    // ajax的配置 在业务代码中自行覆盖配置
    var ajax = {
        // ajax请求默认参数
        config : {
            type: 'POST',
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            timeout: timeOut
        },
        hooks: {},
        // status code配置
        statusCode: {
            success: true // 表示请求成功
        },
        // ajax 请求出错时候textStatus对应描述
        statusDesc: {
            'timeout': '请求超时,请稍后再试！！',
            'error': '网络异常,请稍后再试！',
            'parsererror': '解析出错，请稍后再试！'
        }
    };

    /**
     * ajax请求前的统一处理 在业务代码中自行扩展
     *
     *
     */
    ajax.hooks.eachBefore = function (param, jqXHR) {
        if (param.showLoading) {
            var tip = param.showLoading.text || '加载中，请稍后';
            ajax.layer = top.layer.msg(tip, {icon: 16, time: false, shade: 0.5});
        }
    };

    /**
     * ajax请求完成后的统一处理 在业务代码中自行扩展
     *
     *
     */
    ajax.hooks.eachComplete = function (result, param, jqXHR) {
        if (param.showLoading) {
            top.layer.close(ajax.layer);
        }
    };

    /*
     * ajax失败统一处理 在业务代码中自行扩展
     *   @param result {object} 请求返回的结果
     *   @param param {object} 请求的参数
     *   @param jqXHR {object} 返回XMLHttpRequest（jqXHR）对象，该对象是浏览器的原生的XMLHttpRequest对象的一个超集
     **/
    ajax.hooks.eachFailure = function (result, param, jqXHR) {
        window.console && window.console.log(result);
        var msg = '处理失败！';
        if (param.ajaxTip) {
            top.layer.msg(result.msg || msg, {
                time: false,
                shade: 0.5,
                icon: 2,
                btn: ['关闭']
            });
        }

        switch (result.code){
            case(500):
                top.layer.msg("服务器系统内部错误");
                break;
            case(401):
                top.layer.msg('登录超时,系统将自动退出!');
                var location = top.window.location;
                var href = location.href;
                if(href.lastIndexOf("/") > 0){
                    href = href.substring(0, href.lastIndexOf("/"));
                }
                href = href + '/logout';
                setTimeout(function () {
                    location.href = href;
                },autoClose);
                break;
            case(403):
                top.layer.msg("无权限执行此操作");
                break;
            case(404):
                top.layer.msg("请求资源不存在");
                break;
            case(408):
                top.layer.msg("请求超时");
                break;
            // default:
            //     var msg = "该功能正在开发中";
            //     top.layer.msg(msg);
            //     break;
        }
    };

    /*
     * ajax成功统一处理 在业务代码中自行扩展
     *   @param result {object} 请求返回的结果
     *   @param param {object} ajax.request的参数
     *   @param jqXHR {object} 返回XMLHttpRequest（jqXHR）对象，该对象是浏览器的原生的XMLHttpRequest对象的一个超集
     **/
    ajax.hooks.eachSuccess = function (result, param, jqXHR) {
        var msg = '处理成功！';
        if (param.ajaxTip) {
            top.layer.msg(result.msg || msg, {
                time: autoClose,
                icon: 1,
                shade: 0.5
            });
        }
        // 表格重新加载
        if (param.table && type(param.table) === 'object') {
            param.table.reload && (param.table = param.table.reload({
                where: param.search,
                page: {
                    curr: param.curr || param.table.config.page.curr || 1 //重新从第 1 页开始
                }
            }))
        }
        // 弹窗自动关闭
        if (param.layer && type(param.layer) === 'object') {
            param.layer.close && setTimeout(function () {
                param.layer.close(param.layer.modalIndex || param.layer.index);
            }, autoClose);
        }
    };



    // 自定义扩展参数 在业务代码中自行扩展 @param postData {object} ajax请求的data参数
    ajax.hooks.customizeOption = function (postData) {

    };

    // URL加参数 在业务代码中自行扩展 @param path {string} ajax请求的url地址
    ajax.hooks.customizeUrl = function (path) {

        return path;
    };

    ajax.request = function () {
        var path, postData, ajaxType;
        var param;
        var async = true; // 默认异步请求
        if (type(arguments[0]) === 'object') {
            param = arguments[0];
            path = param.url || '';
            async = param.async;
            postData = param.data || {};
            ajaxType = param.type;
        } else {
            param = {};
            path = arguments[0] || '';
            postData = arguments[1] || {};
            param.url = path;
            param.data = postData;
        }


        // 扩展请求参数
        ajax.hooks.customizeOption && ajax.hooks.customizeOption(postData);
        // 扩展 URL
        path = ajax.hooks.customizeUrl ? ajax.hooks.customizeUrl(path) : path;
        // postData = JSON.stringify(postData);
        var opts = $.extend({}, ajax.config, {url: path, data: postData, async: async, type: ajaxType});
        var $jqxhr = $.ajax(opts);
        var $deferred = $.Deferred();
        ajax.hooks.eachBefore &&　ajax.hooks.eachBefore.apply(this, [param, $jqxhr]);
        $deferred.then(
            function () {
                ajax.hooks.eachComplete && ajax.hooks.eachComplete.apply(this, arguments);
                ajax.hooks.eachSuccess && ajax.hooks.eachSuccess.apply(this, arguments);
            },
            function () {
                ajax.hooks.eachComplete && ajax.hooks.eachComplete.apply(this, arguments);
                ajax.hooks.eachFailure && ajax.hooks.eachFailure.apply(this, arguments);
            }
        );
        $jqxhr.then(
            function (response, textStatus, jqXHR) {
                if (response.status && (response.status == ajax.statusCode.success)) {
                    $deferred.resolve.call(this, response, param, jqXHR);
                } else {
                    $deferred.reject.call(this, response, param, jqXHR);
                }
            },
            function (jqXHR, textStatus, err) {
                var textStatus = textStatus || 'error';
                var response = {
                    code: jqXHR.status,
                    msg: ajax.statusDesc[textStatus] || err,
                    data: null,
                    textStatus: textStatus
                };
                $deferred.reject.call(this, response, param, jqXHR);
            }
        );
        return $deferred.promise();
    };

    //输出test接口
    exports('request', ajax.request);
});