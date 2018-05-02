'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
    async index() {

    }
    async find() {
        const { limit, page, name } = this.ctx.query;
        let query = {where:{}, limit: parseInt(limit), offset: (page - 1) * limit };
        if (name) {
            query.where.name = name
        }
        let body = await this.app.model.Users.findAndCountAll(query)
        if (!body.name) {
            body.status = true;
        } else {
            body.status = false;
            body.msg = '系统错误'
        }
        this.ctx.body = body;
    }
    async add() {
        const createUser = this.ctx.request.body;
        this.logger.info(createUser)
        try {
            await this.app.model.Users.create(createUser);
            this.ctx.body = { status: true, msg: '添加成功' }
        } catch (error) {
            this.logger.info(error)
            this.ctx.body = { status: false, msg: '添加失败' }
        }
    }
    async update() {
        const {id,name,user_name} = this.ctx.request.body;
        try {
            await this.app.model.Users.update({name,user_name},{ 'where': { 'id': id }});
            this.ctx.body = { status: true, msg: '更新成功' }
        } catch (error) {
            this.logger.info(error)
            this.ctx.body = { status: false, msg: '更新失败' }
        }
    }
    async delete() {
        const { ctx, app, logger } = this;
        const ids = ctx.request.body.ids.split('_');
        const body = await app.model.Users.destroy({ 'where': { 'id': { $in: ids } } })
        if(body>=1){
            ctx.body = { status: true, msg: '删除成功' }
        }else{
            ctx.body = { status: false, msg: '删除失败' }
        }
    }
}

module.exports = UserController;