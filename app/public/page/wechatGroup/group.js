layui.config({
	base: '/public/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
	request: 'js/request'
});
layui.use(['form', 'jquery', 'table', 'request', 'laytpl'], function () {
	var form = layui.form,
		$ = layui.jquery,
		table = layui.table,
		request = layui.request,
		laytpl = layui.laytpl,
		page = {
			killNull: function (res) {
				return res || '';
			},
			user: JSON.parse(sessionStorage.user)
		};

	// 表格加载
	page.tableInit = function () {
		page.table = table.render({
			elem: '#wechat_group',
			url: '/wechat/group/find',
			where: { id: page.user.id },
			page: true,
			response: {
				statusName: 'status' //数据状态的字段名称，默认：code
				, statusCode: true //成功的状态码，默认：0
				, msgName: 'msg' //状态信息的字段名称，默认：msg
				, countName: 'count' //数据总数的字段名称，默认：count
				, dataName: 'rows', //数据列表的字段名称，默认：data
			},
            cols: [[ //表头
				{ type: 'checkbox' },
				{ field: 'id', title: '分组id'},
				{ field: 'name', title: '名称'},
				{ field: 'count', title: '分组人数'}
			]]
		});
		$('#delete').addClass('layui-btn-disabled').prop('disabled', true);
		$('#modify').addClass('layui-btn-disabled').prop('disabled', true);
		 // 表格多选框事件
		 table.on('checkbox(wechat_group)', function (obj) {
            var res = table.checkStatus('wechat_group');
            if (res.data.length) {
                if (res.data.length === 1) {
                    $('#modify').removeClass('layui-btn-disabled').prop('disabled', false);
					$('#delete').removeClass('layui-btn-disabled').prop('disabled', false);
                } else {
					$('#modify').addClass('layui-btn-disabled').prop('disabled', true);
					$('#delete').addClass('layui-btn-disabled').prop('disabled', true);
                }
            } else {
                $('#modify').add('#changPwd').add($('#delete')).addClass('layui-btn-disabled').prop('disabled', true);
            }
        });
	}
	page.form = function () {
		// 表单验证规则
		form.verify({});
		// 新增或修改表单提交
		form.on('submit(f-submit)', function (data) {
			var id = $(this).data('pkid');
			var url = '/wechat/group/add';
			id && (url = '/wechat/group/update');
			data.field.id = page.user.id;
			request({
				url: url,
				data: data.field,
				ajaxTip: true,
				showLoading: true,
				layer: layer,
				table: page.table,
				search: page.search
			});
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
		$('#add').on('click', function () {
			page.modalShow('新增用户信息', $('#add-modal').html().replace(/\{\{[\s\S]*?\}\}/g, ''), '400px');
		});
		//点击修改
		$('#modify').on('click', function () {
			var res = table.checkStatus('wechat_group');
			if (res.data.length == 1) {
				var html = laytpl($('#add-modal').html()).render({ data: res.data[0], killNull: page.killNull });
				page.modalShow('修改配置信息', html, '400px');
			} else {
				layer.msg('请选中单个进行修改', { icon: 2 });
			}
		});
		$('#delete').on('click', function () {
			var res = table.checkStatus('wechat_group');
			var msg, ids = [];
			if (res.data.length) {
				if (res.data.length == 1) {
					msg = '确认删除《' + res.data[0].name + '》分组？'
				} else {
					msg = '确认批量删除？';
				}
			} else {
				layer.msg('请选中在进行删除', { icon: 2 });
				return;
			}
			layer.modalIndex = layer.confirm(msg, function (index) {
				//确定删除
				request({
					url: '/wechat/group/delete',
					data: {
						id: page.user.id,
						groupId: res.data[0].id
					},
					showLoading: true,
					ajaxTip: true,
					layer: layer,
					table: page.table,
					search: page.search
				})
			});
		});
	};
	//加载页面数据
	page.init = function () {
		this.tableInit();
		this.uiEvents();
		this.form();
	}
	page.init()
})