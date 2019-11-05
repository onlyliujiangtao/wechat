# wechat

微信公众号

## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:80/
```
### Mysql
```bash
根据数据库的表导出model
$ npm run create-model
```
```bash
根据model创建数据库的表
./app.js
<code>
module.exports = app => {
    app.beforeStart(async function() {
        // 应用会等待这个函数执行完成才启动
        // await app.model.sync({ force: true }); // 开发环境使用
        await app.model.sync({});//更具model创建数据库
    });
};
</code>
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

### token
```bash{"accessToken":"9_YWW3ZAWS2kJv8mqX5qR3blToipy5sUohC8ngqErUwJC6G3VyF_VeMThUDPVq78M0tX6e0fvc4J-qEuKCdO_P07rSigPzzEQTmIGhqeO9MBNJwED48sto9z_ckn_x-j9_qPRlAdVhmhLkZtBwBXUiAHAIEB","expireTime":1524818149730}
```