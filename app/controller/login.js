'use strict';

const fs = require('fs');
const path = require('path');

const Controller = require('egg').Controller;

class LOGINController extends Controller {
  async index() {
    const tplPath = path.join(__dirname, '../view/login.html');
    this.ctx.body = await fs.readFileSync(tplPath, 'utf-8');
  }
  async login() {
    // this.logger.info('this.ctx.query',this.ctx.query)
    // this.logger.info('this.ctx.params',this.ctx.params)
    // this.logger.info('this.ctx.request.body',this.ctx.request.body)
    const params = this.ctx.request.body;
    this.ctx.body = await this.ctx.service.login.login(params);
  }
  async loginOut() {

  }
  async updatePassword() {
    const query = this.ctx.request.body;
    const user = await this.app.model.Users.find({where:{id:query.id}});
    if(user.password==query.pwd){
      if(query.newPwd1==query.newPwd2){
        const body = await this.app.model.Users.update({password:query.newPwd1},{where:{id:query.id}});
        this.logger.info(body);
        this.ctx.body = {status:true,msg:'修改成功'};
      }else{
        this.ctx.body = {status:false,msg:'新密码不一致'};
      }
    }else{
      this.ctx.body = {status:false,msg:'旧密码错误'};
    }
  }
}

module.exports = LOGINController;
