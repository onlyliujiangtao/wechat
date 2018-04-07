import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import store from './vuex'
// import mock from './mock'

// 点击延迟
FastClick.attach(document.body)

Vue.config.productionTip = false

//提示框插件
import {
  AlertPlugin,
  ConfirmPlugin,
  ToastPlugin,
  LoadingPlugin
} from 'vux'
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(ToastPlugin);
Vue.use(LoadingPlugin)

//提示插件
Vue.prototype.$alert = function (content, title) {
  this.$vux.alert.show({
    title: title || '提示',
    content: content,
    onShow() {
      console.log('Plugin: I\'m showing')
    },
    onHide() {
      console.log('Plugin: I\'m hiding')
    }
  })
};
Vue.prototype.formatTime = function(time, cFormat){
  if (arguments.length === 0) {
    return null
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
//提示插件
Vue.prototype.$toast = function (msg, type = "text") {
  this.$vux.toast.show({
    text: msg,
    type: type,
  })
};
Vue.prototype.develop = function(){
  new Vue().$toast('开发中...')
}

Vue.prototype.$confirm = function (content, confirm) {
  this.$vux.confirm.show({
    title: '提示',
    content: content,
    onShow() {
      console.log('plugin show')
    },
    onHide() {
      console.log('plugin hide')
    },
    onCancel() {
      console.log('plugin cancel')
    },
    onConfirm() {
      console.log('plugin confirm')
      confirm();
    }
  })
};


//显示载入中
Vue.prototype.$showLoading = function (text = '加载中') {
  this.$vux.loading.show({
    text
  })
};

//隐藏载入中
Vue.prototype.$hideLoading = function () {
  // 隐藏
  this.$vux.loading.hide()
};
// 序列化url
Vue.prototype.$GetQueryString = function(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.href.substr(window.location.href.indexOf('?')+1).match(reg);
  if (r != null)
    return decodeURI(r[2]);
  return null;
}

/* eslint-disable no-new */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
