'use strict';

const fs = require('fs');
const path = require('path');

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const tplPath = path.join(__dirname, '../view/index.html');
    this.ctx.body = await fs.readFileSync(tplPath, 'utf-8');
  }
}

module.exports = HomeController;
