layui.config({
	base: '/public/' //假设这是你存放拓展模块的根目录
}).extend({ //设定模块别名
	request: 'js/request',
	utils: 'js/utils'
});
layui.use(['form', 'jquery', 'table', 'request', 'laytpl','utils'], function () {
	var form = layui.form,
		$ = layui.jquery,
		table = layui.table,
		request = layui.request,
		laytpl = layui.laytpl,
		utils = layui.utils
		page = {
			killNull: function (res) {
				return res || '';
			},
			user: JSON.parse(sessionStorage.user),
			groups:[]
		};
	page.getGroups = function(){
		$.get('/wechat/group/find',{id:page.user.id},function(res){
			page.groups = res.rows;
		})
	}
	// 表格加载
	page.tableInit = function () {
		page.table = table.render({
			elem: '#wechat_user',
			url: '/wechat/user/find',
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
				{ field: 'nickname', title: '昵称'},
				{ field: 'sex', title: '性别',width:80 ,templet:function(row){
					if(row.sex==1){
						return '男'
					}else{
						return '女'
					}
				}},
				{ field: 'headimgurl', title: '头像',width:80,templet:function (row) { 
					return `<img src="${row.headimgurl}" style="height:100%;">`
				}},
				{ field: 'groupid', title: '分组',width:80, templet:(row)=>{
					var name;
					$.each(page.groups,function(index,group){
						if(row.groupid==group.id){
							name = group.name;
						}
					})
					return name;
				} },
				{ field: 'remark', title: '备注',width:80},
				{ field: 'yyyy-MM-dd', title: '关注时间',templet:(row)=>{
					return utils.formatDate(row.subscribe_time*1000,'yyyy-MM-dd hh-mm-ss');
				}},
				{ field: 'openid', title: 'openid' },
				{ field: 'openid', title: '操作',templet:function(row){
					var str = '';
					str += '<a class="layui-btn layui-btn-xs" lay-event="locked">发送</a>';
					str += '<a class="layui-btn layui-btn-xs layui-btn-normal" lay-event="locked">移动</a>';
					str +=  '<a class="layui-btn layui-btn-xs layui-btn-warm" lay-event="viewAuth">备注</a>';
					str +=  '<a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="viewAuth">拉黑</a>';
					return str;
				}},
			]]
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
				table: page.table,
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
		this.getGroups();
		this.tableInit();
		this.uiEvents();
		this.form();
	}
	page.init()
})