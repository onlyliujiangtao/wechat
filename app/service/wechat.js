// app/service/login.js

const Service = require('egg').Service;
const sha1 = require('sha1');
const WechatAPI = require('co-wechat-api');


class WechatService extends Service {
    /**
    * 微信域名认证
    * 
    * @param timestamp
    * @param nonce
    * @param echostr
    * @param signature
    * @returns {echostr}
    *  */
    async auth() {
        var obj = this.ctx.query
        var token = this.ctx.app.config.wechat.token,
            timestamp = obj.timestamp,
            nonce = obj.nonce,
            echostr = obj.echostr,
            signature = obj.signature,
            str = [token, timestamp, nonce].sort().join(''),
            sha = sha1(str);
        if (sha === signature) {
            this.ctx.body = echostr + ''
        } else {
            this.ctx.body = '不合法'
        }
    }
    /**
  * 初始化微信api
  *
  * @param id 用户id
  * @returns WeChatAPI
  */
    async initApi(id) {
        const config = await this.app.model.Config.find({ where: { id: id } });
        const appid = config.get('appId');
        const appsecret = config.get('appSecret');

        const api = new WechatAPI(appid, appsecret, async () => {
            return JSON.parse(config.AccessToken);
        }, async (token) => {
            await this.app.model.Config.update({ AccessToken: JSON.stringify(token) }, { where: { id: id } });
        });
        return api;
    }
}

module.exports = WechatService;