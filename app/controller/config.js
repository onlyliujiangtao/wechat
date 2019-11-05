'use strict';

const Controller = require('egg').Controller;

class ConfigController extends Controller {
    async get() {
        const params = this.ctx.request.body;
        try {
            let config = await this.app.model.Config.find({ where: params });
            if(config == null){
                config = await this.app.model.Config.create(params);
            }
            this.ctx.body = { status: true, msg: '', data: config };
        } catch (error) {
            this.logger.info(error)
            this.ctx.body = {status: false,msg: '服务器错误'};
        }
    }
    async modify() {
        const params = this.ctx.request.body;
        try {
            await this.app.model.Config.update(params.data,{ where: {id: params.id} });
            this.ctx.body = {status: true,msg: '修改成功'};
        } catch (error) {
            this.ctx.body = {status: false,msg: '服务器错误'};
        }
    }
}

module.exports = ConfigController;