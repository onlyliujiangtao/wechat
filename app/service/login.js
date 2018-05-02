// app/service/login.js

const Service = require('egg').Service;

class LoginService extends Service {
    async login(params) {
        const user = await this.app.model.Users.find({ where: { user_name: params.username } });
        if(user){
            if(user.password == params.password){
                return {status: true, msg: '',user:{id:user.id,name:user.name}};
            }else{
                return {status: false, msg: '密码错误'};
            }
        }else{
            return {status: false, msg: '账号不存在'};
        }
        return user;
    }
}

module.exports = LoginService;