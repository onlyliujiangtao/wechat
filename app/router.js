'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 认证
  router.all('/wechat', controller.wechat.auth);  
  router.get('/wechat/config',controller.wechat.getJsConfig);
  router.get('/wechat/user/find', controller.wechat.getUser);  
  router.get('/wechat/group/find', controller.wechat.getGroup);  
  router.post('/wechat/group/add', controller.wechat.createGroup);  
  router.post('/wechat/group/update', controller.wechat.updateGroup);  
  router.post('/wechat/group/delete', controller.wechat.removeGroup);  
  // 登录页面
  router.get('/login', controller.login.index);
  // 登录
  router.post('/login', controller.login.login);
  // 微信配置管理
  router.post('/config/get',controller.config.get);
  router.post('/config/modify',controller.config.modify);
  // 用户管理
  router.get('/user/find', controller.user.find)
  router.post('/user/add', controller.user.add)
  router.post('/user/update', controller.user.update)
  router.post('/user/delete', controller.user.delete)
  

  router.get('/', controller.home.index);
  router.get('/log', controller.log.index);



  router.get('*', controller.log.logFile);
  
};
