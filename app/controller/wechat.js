
'use strict';

const Controller = require('egg').Controller;

class WechatController extends Controller {
    /**
     * 域名认证
     */
    async auth() {
        this.ctx.service.wechat.auth();
    }
    async getJsConfig() {
        const api = await this.ctx.service.wechat.initApi(1);
        var param = {
            debug: false,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'],
            url: 'http://www.baidu.com'
        };
        this.ctx.body = await api.getJsConfig(param);
    }
    /**
     * 获取用户列表
     */
    async getUser() {
        const { limit, page, id } = this.ctx.query;
        const api = await this.ctx.service.wechat.initApi(id);
        const user = await api.getFollowers();
        const count = user.data.openid.length;
        const openids = user.data.openid.splice(limit * (page - 1), limit);
        const users = await api.batchGetUsers(openids)
        this.ctx.body = { status: true, count, rows: users.user_info_list };
    }
    /**
     * 获取分组
     */
    async getGroup() {
        const { limit, page, id } = this.ctx.query;
        const api = await this.ctx.service.wechat.initApi(id);
        const group = await api.getGroups();
        const count = group.groups.length;
        let groups = [];
        if (limit && page) {
            groups = group.groups.splice(limit * (page - 1), limit);
        } else {
            groups = group.groups;
        }
        this.ctx.body = { status: true, count, rows: groups };
    }
    /**
     * 修改分组
     */
    async createGroup() {
        const { id, groupName } = this.ctx.request.body;
        this.logger.info(id, groupName)
        const api = await this.ctx.service.wechat.initApi(id);
        const group = await api.createGroup(groupName);
        this.ctx.body = { status: true, msg: '添加成功' }
    }
    /**
     * 修改分组
     */
    async updateGroup() {
        const { id, groupId, groupName } = this.ctx.request.body;
        const api = await this.ctx.service.wechat.initApi(id);
        const group = await api.updateGroup(groupId, groupName);
        if (group.errcode == '0') {
            this.ctx.body = { status: true, msg: '修改成功' }
        } else {
            this.ctx.body = { status: false, msg: group.errmsg }
        }
    }
    /**
     * 移除分组
     */
    async removeGroup() {
        const { id, groupId } = this.ctx.request.body;
        const api = await this.ctx.service.wechat.initApi(id);
        const group = await api.removeGroup(groupId);
        if (group.errcode == '0') {
            this.ctx.body = { status: true, msg: '删除成功' }
        } else {
            this.ctx.body = { status: false, msg: group.errmsg }
        }
    }
    /**
     * 发送信息
     * @param openid
     * @param msg
     * @returns {}
     */
    async sendText() {
        const { id, openid, msg } = this.ctx.request.body;
        const api = await this.ctx.service.wechat.initApi(id);
        try {
            await api.sendText(openid, msg);
            this.ctx.body = { status: true, msg: '发送成功' };
        } catch (error) {
            this.ctx.body = { status: false, msg: "发送失败" };
        }
    }
}

module.exports = WechatController;