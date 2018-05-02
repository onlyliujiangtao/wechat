layui.config({
    base: '/public/'  //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    request: 'js/request'
});
layui.define(['jquery', 'request'], function (exports) {
    var $ = layui.jquery;
    var upload = layui.upload;
    var request = layui.request;
    var form = layui.form;
    var laytpl = layui.laytpl;
    var utils = {};

    utils.formatDate = function (date,format) {
        var d = new Date(date);
        var o = {
            "M+": d.getMonth() + 1,
            "d+": d.getDate(),
            "h+": d.getHours(),
            "m+": d.getMinutes(),
            "s+": d.getSeconds(),
            "q+": Math.floor((d.getMonth() + 3) / 3),
            "S": d.getMilliseconds()
        }
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }

    //暴露接口
    exports('utils', utils);
});