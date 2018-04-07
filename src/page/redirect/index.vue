<template>
    <div class="msg" v-show="!!msg">
      <div class="top">
        <img src="../../assets/message.png" alt="">
      </div>
      <div class="body">
        <h2 v-text="msg"></h2>
      </div>
    </div>
</template>

<script>
    import { mapActions } from "vuex"; //引入vuex中各个模块的actions
    import * as request from "../../axios";
    import initConfig from "@/wxConfig"

    export default {
      data() {
        return {
          code: this.$route.query.code||this.$GetQueryString("code"),
          isScanCode:document.URL.indexOf('scanCode')>=0,
          isBalance:document.URL.indexOf('balance')>=0,
          msg:''
        };
      },
      mounted() {
        if(this.isScanCode){
          this.scanCode()
        }else if(this.isBalance){
          this.goBalance()
        }else{
          this.getMemberInfoByCode();
        }
      },
      methods: {
        ...mapActions({ setUserInfo: "setUserInfo" }), //本组件注册VUEX输出的actions中的setUserInfo方法
        async getMemberInfoByCode() {
          if(this.code){
            let res = await request.getMemberInfoByCode({code:this.code});
            if (res.success) {
              this.setUserInfo(res.content);
              if(res.code==1){//已绑定
                window.location.replace('/wechat/#/member')
                this.msg = '已经是会员了';
              }else{
                window.location.replace('/wechat/#/bind')
              }
            }
          }else{
            this.msg = '绑定成功';
          }
        },
        async getUser(){
          let res = await request.getMemberInfoByCode({code:this.code});
          if (res.success) {
            if(res.code==1){
              this.setUserInfo(res.content);
              return true
            }else{
              this.msg = '未绑定为会员'
              return false;
            }
          }
        },
        async scanCode(){
          if(await this.getUser()){
            const self = this;
            initConfig(['scanQRCode']);
            wx.ready(function () {
              // 9.1.2 扫描二维码并返回结果
                wx.scanQRCode({
                  needResult: 1,
                  desc: 'scanQRCode desc',
                  success: function (res) {
                    window.location.replace(res.resultStr+`/${self.$store.state.user.userInfo.id}/${self.$store.state.user.userInfo.openid}`);
                  }
                });
            });
            wx.error(function (res) {//错误时调用
                self.$alert(res.errMsg);
            });
          }
        },
        async goBalance(){
          if(await this.getUser()){
            window.location.replace('/wechat/#/balance')
          }
        }
      }
    };
</script>

<style lang="scss" scoped>
.msg{
  .top{
    width: 100%;
    height: 35vh;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
  .body{
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  }
}
</style>
