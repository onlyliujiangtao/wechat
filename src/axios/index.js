import axios from 'axios'

// axios 配置
axios.defaults.baseURL = '';
axios.defaults.timeout = 30000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

let isMock = true;
let apiURL = '';

if (process.env.NODE_ENV == 'development') {
  //是否启动mock
  isMock = false;
  axios.defaults.baseURL = '/'; // 你的接口地址
  apiURL = '/api'
}else{
  axios.defaults.baseURL = '/'; // 你的接口地址
  apiURL = '/member'
}

const doPost = (url, params) => {
  // console.group('%c 请求 ','background:green;color:#fff;');
  // console.log(`%c ${url}`,'background:#3f0;color:#fff;');
  // console.log(params||'无');
  // console.groupEnd();
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
        // console.group('%c 响应 ', 'background: orange; color: #fff');
        // console.log(response.data);
        // console.groupEnd();
      }, (err) => {
        console.error(err);
        let errMsg = {
          state: 'fail',
          msg: err.message
        };
        resolve(errMsg);
      })
      .catch((err) => {
        console.error(err);
        let errMsg = {
          state: 'fail',
          msg: err.message
        };
      });
  });
}

const api = (url,params) => {
  let uri = ''
  if(process.env.NODE_ENV != 'development'){
    uri = apiURL + url;
  }else{
    if(isMock){
      uri = url
    }else{
      uri = apiURL + url;
    }
  }
  return doPost(uri, params)
}

// 根据code获取微信用户信息
export const getMemberInfoByCode = (prarms) => api(`/member/getMemberInfoByCode?code=${prarms.code}`);
// 绑定会员
export const addMenber = (prarms) => api(`/member/addMenber`,prarms)
// 获取短信验证码
export const sendSMS = (prarms) => api(`/member/sendSMS?mobile=${prarms.mobile}`)
// 修改手机号
export const updateMobile = (prarms) => api(`/member/updateMobile`,prarms)
// 更新用户信息
export const updateInfo = (openid) => api(`/member/updateInfo?openid=${openid}`)
// 获取微信签名
export const getSignature = (prarms) => api(`/member/getSignature?url=${prarms.url}`)
// 预支付接口
export const prePay = (prarms) => api(`/member/prePay`,prarms)
// 查询会员充值记录
export const selectPayLog = (prarms) => api(`/member/selectPayLog?member_id=${prarms.id}`)
// 查询会员消费记录
export const selectPayOrderLog = (prarms) => api(`/member/selectPayOrderLog?member_id=${prarms.id}`)
