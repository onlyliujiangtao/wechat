<template>
    <div class="setting">
        <group title="基本信息">
            <cell title="我的头像">
                <div slot class="avatar">
                    <img :src="userInfo.headimgurl" alt="">
                </div>
            </cell>
            <cell title="昵称" :value="userInfo.nickname"></cell>
            <cell title="手机号" :value="userInfo.mobile" is-link @click.native="isEdit=true"></cell>
            <cell title="性别" :value="userInfo.sex>0?'男':'女'"></cell>
            <cell title="我的积分" :value="userInfo.bp"></cell>
        </group>
        <div class="button" style="padding:1rem">
            <x-button type="primary" @click.native="updataUserInfo">更新资料</x-button>
        </div>
        <div v-transfer-dom>
            <popup v-model="isEdit" height="270px" is-transparent>
                <div style="width: 95%;background-color:#fff;height:250px;margin:0 auto;border-radius:5px;padding-top:10px;">
                    <group>
                        <x-input title="手机号" v-model="mobileInfo.mobile" type="tel" :is-type="isValid"></x-input>
                        <x-input title="验证码" v-model="mobileInfo.verifyCode" type="tel" :show-clear="false">
                            <div slot="right">
                                <x-button mini type="primary" :disabled="time>0" @click.native="getCode">{{time>0?time+'s':'获取验证码'}}</x-button>
                            </div>
                        </x-input>
                    </group>
                    <div style="padding:20px 15px;">
                        <x-button type="primary" @click.native="submitBind">确认修改</x-button>
                        <x-button @click.native="isEdit = false">取消</x-button>
                    </div>
                </div>
            </popup>
        </div>
    </div>
</template>

<script>
    import { Cell, Group, Badge, XButton, TransferDom, Popup, XInput } from "vux";
    import * as request from "../../axios";
    import {  mapGetters, mapActions } from "vuex"; //引入vuex中各个模块的actions

    export default {
      directives: {
        TransferDom
      },
      components: {
        Group,
        Cell,
        Badge,
        XButton,
        TransferDom,
        Popup,
        XInput
      },
      watch: {
        time(newValue, oldValue) {
          const self = this;
          setTimeout(function() {
            if (newValue > 0) {
              self.time--;
            }
          }, 1000);
        }
      },
      data() {
        return {
          isEdit: false,
          mobileInfo: {
            mobile: "",
            verifyCode: ""
          },
          time: 0
        };
      },
      computed: {
          //实时计算
          ...mapGetters([ 'userInfo']),
      },
      methods: {
        ...mapActions({setUserInfo:'setUserInfo'}),
        async updataUserInfo() {
          this.$showLoading();
          let res = await request.updateInfo(this.userInfo.openid);
          this.$hideLoading();
          if (res.success) {
            this.$toast('更新成功','success')
            this.setUserInfo(res.content);
          } else {
            this.$toast(res.msg, "warn");
          }
        },
        isValid(){
          if(!(/^1[34578]\d{9}$/.test(this.mobileInfo.mobile))){ 
            return {valid:false, msg:'该手机号不存在'}; 
          } else{
            return {valid:true,msg:'验证正确'}
          }
        },
        async getCode() {
          let prarms = this.mobileInfo;
          delete prarms.verifyCode;
          if(!this.isValid().valid){ 
            this.$toast('该号不存在','warn')
            return; 
          } 
          const res = await request.sendSMS(prarms);
          if (res.success) {
            this.time = 60;
            this.$toast("请等待信息");
          } else {
            this.$toast("请重新发送", "warn");
          }
        },
        async submitBind() {
          this.isSubmit = true;
          if(!this.mobileInfo.mobile){
            this.$toast("手机号有误","warn");
            this.isSubmit = false;
            return;
          }
          if(!this.mobileInfo.verifyCode){
            this.$toast("验证码有误","warn");
            this.isSubmit = false;
            return;
          }
          let prarms = this.mobileInfo;
          prarms.openid = this.userInfo.openid
          const res = await request.updateMobile(prarms);
          this.isSubmit = false;
          if (res.success) {
            this.setUserInfo(res.content)
            this.$toast("绑定成功", "success");
          } else {
            this.$toast("失败", "warn");
          }
          this.isEdit = false;
        }
      }
    };
</script>

<style lang="scss" scoped>
    .setting {
      height: 100%;
      box-sizing: border-box;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
</style>