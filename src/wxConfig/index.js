require('./jweixin-1.2.0')
import * as request from '../axios'

const initConfig = async (jsApiList) => {
    const prarms = {
        url: encodeURIComponent(document.URL)
    }
    const res = await request.getSignature(prarms)
    if(res.success){
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.content.appId, // 必填，公众号的唯一标识
            timestamp: parseInt(res.content.timestamp), // 必填，生成签名的时间戳
            nonceStr: res.content.noncestr, // 必填，生成签名的随机串
            signature: res.content.signature,// 必填，签名，见附录1
            jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    }else{
        initConfig(jsApiList)
    }
}

export default initConfig