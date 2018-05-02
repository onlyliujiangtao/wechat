layui.config({
	base : "js/"
}).use(['form','element','layer','jquery'],function(){
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : parent.layer,
		element = layui.element,
		$ = layui.jquery;

	$(".panel a").on("click",function(){
		window.parent.addTab($(this));
	})

	// 待审核文章
	$(".waitNews span").text(12); 
	// 文章
	$(".allNews span").text(12); 
	//图片总数
	$(".imgAll span").text(12);
	//用户数
	$(".userAll span").text(12);

	//新消息
	$(".newMessage  span").text(12);

	//数字格式化
	$(".panel span").each(function(){
		$(this).html($(this).text()>9999 ? ($(this).text()/10000).toFixed(2) + "<em>万</em>" : $(this).text());	
	})

})
