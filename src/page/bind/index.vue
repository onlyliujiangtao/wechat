<template>
    <div class="bind">
        <div class="logo">
            <img src="../../assets/logo.png" alt="">
        </div>
        <group>
            <x-input title="手机号" v-model="mobile" ref="mobile" type="tel" :is-type="isValid"></x-input>
            <x-input title="验证码" v-model="verifyCode" type="tel" :show-clear="false">
                <div slot="right">
                    <x-button mini type="primary" :disabled="time>0" @click.native="getCode">{{time>0?time+'s':'获取验证码'}}</x-button>
                </div>
            </x-input>
        </group>
        <div class="button">
            <x-button type="primary" @click.native="submitBind" :disabled="submitBtn" :show-loading="isSubmit">绑定手机号</x-button>
        </div>
    </div>
</template>

<script>
    import { XInput, Group, XButton } from "vux";
    import * as request from "../../axios";
    import {  mapGetters, mapActions } from "vuex"; //引入vuex中各个模块的actions

    export default {
      components: {
        XInput,
        Group,
        XButton
      },
      data() {
        return {
          time: 0,
          mobile: "",
          verifyCode: "",
          isSubmit: false,
           submitBtn:false
        };
      },
      computed: {
            //实时计算
            ...mapGetters([ 'userInfo']),
            
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
      mounted(){
        this.$refs.mobile.focus()
      },
      methods: {
        ...mapActions({ setUserInfo: "setUserInfo" }),
        isValid(){
          if(!(/^1[34578]\d{9}$/.test(this.mobile))){ 
            return {valid:false, msg:'该手机号不存在'}; 
          } else{
            return {valid:true,msg:'验证正确'}
          }
        },
        async getCode() {
          let prarms = {
            mobile: this.mobile
          };
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
          if(!this.mobile){
            this.$toast("手机号有误","warn");
            this.isSubmit = false;
            return;
          }
          if(!this.verifyCode){
            this.$toast("验证码有误","warn");
            this.isSubmit = false;
            return;
          }
          this.submitBtn = true;
          let prarms = this.userInfo
          prarms.mobile = this.mobile
          prarms.verifyCode = this.verifyCode
          delete prarms.tagid_list//删除垃圾信息
          const res = await request.addMenber(prarms);
          this.isSubmit = false;
          if (res.success) {
            this.submitBtn = false;
            this.setUserInfo(res.content)
            // this.$router.push("/member");
            this.$router.replace('/');
          } else {
            this.$toast(res.msg, "warn");
          }
        }
      }
    };
</script>

<style lang="scss" scoped>
    @import "../../styles/common";
    .bind {
      .logo {
        display: flex;
        justify-content: center;
        margin: px2rem(30) 0;
        img {
          width: px2rem(100);
          height: px2rem(100);
        }
      }
      .button {
        padding: px2rem(20) px2rem(10);
      }
    }
</style>