'use strict';

const fs = require('fs');
const path = require('path');
const utils = require('../../lib/utils');


const Controller = require('egg').Controller;

class LogController extends Controller {
    async index() {
        const tplPath = path.join(__dirname, '../view/log.html');
        const tpl = await fs.readFileSync(tplPath, 'utf-8');
        this.ctx.body = tpl;
    }
    async logFile() {
        const loggerDir = path.dirname(this.app.config.logger.dir);
        if (this.ctx.path.indexOf(`/__logs`) !== 0) {
            return
        }
        if (this.ctx.path === `/__logs/files`) {
            this.ctx.body = await utils.listDir(loggerDir, 3);
        } else {
            const filePath = this.ctx.path.substring(`/__logs/file/`.length);
            this.ctx.body = await utils.readFile(filePath, loggerDir);
        }
    }
}

module.exports = LogController;
