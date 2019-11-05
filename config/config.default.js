'use strict';
// const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1522420767080_9113';

  // add your config here
  config.middleware = [];


  config.wechat = {
    token: 'weixinCourse',
  };

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
  };

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'wechat',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '123456',
    timezone: '+08:00', // 东八时区
  };

  return config;
};
