layui.config({
    base: '/public/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
    request: 'js/request'
});
layui.use(['table', 'jquery', 'form', 'request', 'laytpl'], function () {
    var $ = layui.jquery;
    var table = layui.table;
    var form = layui.form;
    var request = layui.request;
    var laytpl = layui.laytpl;
    var page = {
        killNull: function (res) {
            return res || '';
        },
        user: JSON.parse(sessionStorage.user)
    };
    page.pageInit = function () {
        var userId = page.user.id, userName = page.user.name;
        $.post('/config/get',{ id: userId},function(res){
            page.data = res.data;
            $('.name').text(page.killNull(userName))
            $('.appId').text(page.killNull(res.data.appId))
            $('.appSecret').text(page.killNull(res.data.appSecret))
            $('.encodingAESKey').text(page.killNull(res.data.encodingAESKey))
            $('.created_at').text(page.killNull(res.data.created_at))
            $('.updated_at').text(page.killNull(res.data.updated_at))
        });
    }
    page.form = function () {
        // 表单验证规则
        form.verify({});
        // 新增或修改表单提交
        form.on('submit(f-submit)', function (data) {
            request({
                url: '/config/modify',
                data: {id:page.user.id,data:data.field},
                ajaxTip:true,
                showLoading: true,
                layer: layer
            }).then(function(){
                page.pageInit();
            })
        });
    };
    page.modalShow = function (tit, con, width, shadeClose) {
        layer.modalIndex = layer.open({
            title: tit,
            type: 1,
            area: width ? width : '800px',
            content: con,
            shadeClose: shadeClose ? shadeClose : false,
            success: function ($ele, index) {
                form.render(null, 'add');
            }
        });
    };
    page.uiEvents = function () {
        //点击修改
        $('#modify').on('click', function () {
            var html = laytpl($('#edit-modal').html()).render({ data: page.data, killNull: page.killNull });
            page.modalShow('修改配置信息', html, '400px');
        });
    };

    page.init = function () {
        this.pageInit();
        this.form();
        this.uiEvents();
    };

    page.init();
});