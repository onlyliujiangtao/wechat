import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const member = r => require.ensure([], () => r(require('@/page/member')), 'member');
const redirect = r => require.ensure([], () => r(require('@/page/redirect')), 'redirect');
const setting = r => require.ensure([], () => r(require('@/page/setting')), 'setting');
const bind = r => require.ensure([], () => r(require('@/page/bind')), 'bind');

export default new Router({
  routes: [
    {path: '/', name: 'redirect', component: redirect },
    {path: '/bind',name: '绑定手机号',component: bind},
    {path: '/member',name: '会员',component: member},
    {path: '/setting',name: '账户设置',component: setting}
  ]
})
