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

  }
}

module.exports = LOGINController;
