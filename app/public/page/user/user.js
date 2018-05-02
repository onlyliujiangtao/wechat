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
			search: {}
		};

	// 表格加载
	page.tableInit = function () {
		page.table = table.render({
			elem: '#user',
			url: '/user/find',
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
				{ field: 'id', title: 'ID', sort: true },
				{ field: 'user_name', title: '用户名' },
				{ field: 'name', title: '姓名', sort: true },
				{ field: 'password', title: '密码' },
				{ field: 'created_at', title: '创建时间', sort: true },
				{ field: 'updated_at', title: '更新时间' }
			]]
		});
		$('#delete').addClass('layui-btn-disabled').prop('disabled', true);
		$('#modify').addClass('layui-btn-disabled').prop('disabled', true);
		 // 表格多选框事件
		 table.on('checkbox(tbluser)', function (obj) {
            var res = table.checkStatus('user');
            if (res.data.length) {
                if (res.data.length === 1) {
                    $('#modify').removeClass('layui-btn-disabled').prop('disabled', false);
                } else {
                    $('#modify').addClass('layui-btn-disabled').prop('disabled', true);
                }
                $('#delete').removeClass('layui-btn-disabled').prop('disabled', false);
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
			var url = '/user/add';
			id && (url = '/user/update');
			request({
				url: url,
				data: data.field,
				ajaxTip: true,
				showLoading: true,
				layer: layer,
				table:page.table,
				search: page.search
			});
		});
		form.on('submit(search)', function (data) {
			page.search = data.field;
			page.table.reload({
				where: data.field,
				page: {
					curr: 1 //重新从第 1 页开始
				}
			})
		})
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
			var res = table.checkStatus('user');
			if (res.data.length == 1) {
				var html = laytpl($('#add-modal').html()).render({ data: res.data[0], killNull: page.killNull });
				page.modalShow('修改配置信息', html, '400px');
			} else {
				layer.msg('请选中单个进行修改', { icon: 2 });
			}
		});
		$('#delete').on('click', function () {
			var res = table.checkStatus('user');
			var msg, ids = [];
			if (res.data.length) {
				if (res.data.length == 1) {
					msg = '确认删除《' + res.data[0].name + '》用户？'
				} else {
					msg = '确认批量删除？';
				}
			} else {
				layer.msg('请选中在进行删除', { icon: 2 });
				return;
			}
			$.each(res.data, function (index, item) {
				ids.push(item.id);
			})
			console.log(ids);
			layer.modalIndex = layer.confirm(msg, function (index) {
				//确定删除
				request({
					url: '/user/delete',
					data: {
						ids: ids.join('_')
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