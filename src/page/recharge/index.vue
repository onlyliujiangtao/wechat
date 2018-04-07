<template>
    <div class="recharge">
        <div class="logo">
          <!-- <img src="http://placeholder.qiniudn.com/350x200/d19921/c7ae32/"/> -->
          <img src="../../assets/banner.jpg">
        </div>
        <p class="name">充值缴费</p>
        <group style="margin-top:5px;">
          <div style="width:100%;height:30px;"></div>
          <checker v-model="amount" style="padding:5px 20px;text-align:center;" :radio-required="true" default-item-class="checker" selected-item-class="checker-selected">
            <checker-item value="150" class="center">200元<br>支付:150元</checker-item>
            <checker-item value="450" class="center">600元<br>支付:450元</checker-item>
            <checker-item value="750" class="center">1000元<br>支付:750元</checker-item>
          </checker>
          <div style="width:100%;height:50px;"></div>
        </group>
          <div style="padding:20px;width:100%;position:absolute;bottom: 40px;box-sizing: border-box;">
            <x-button type="primary" class="submit" @click.native="recharge">立即支付：{{amount}}元</x-button>
          </div>
        <!-- <p class="input">
          <label>￥</label>
          <span class="jiE" v-text="amount"></span>
        </p> -->
        <!-- <div class="putIn">
          <keyboard :addAmount="addAmount" :recharge="recharge"></keyboard>
        </div> -->
    </div>
</template>

<script>
import {Group,XButton,Checker, CheckerItem} from 'vux'
import keyboard from "@/components/keyboard";
import * as request from "@/axios"

export default {
  components: {
    keyboard,
    Group,
    XButton,
    Checker, 
    CheckerItem,
  },
  data() {
    return {
      amount: '150'
    }
  },
  methods: {
    addAmount(val) {
      this.amount = val;
    },
    async recharge(){
      // 支付
      if(Math.ceil(this.amount)>0){
        const params = {
          "memberId": this.$store.state.user.userInfo.id,
          "amount": this.amount
        }
        let res = await request.prePay(params)
        if(res.retCode==="000000"){
          window.location.href = res.trans_response.paymentURL
        }
      }else{
        this.$toast('请选择金额','warn')
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.recharge {
  background-color: #e0e0e0;
  font-size: 20px;
  .logo {
    width: 100%;
    overflow: hidden;
    img {
      width: 100%;
      vertical-align: top;
    }
  }
  .center{
    text-align: center;
    border:1px solid #e0c8a7 !important;
  }
  .checker{
    border: 1px solid #ececec;
    padding: 5px 10px;
  }
  .checker-selected{
    border: 1px solid #79592c !important;
  }
  .name {
    text-align: center;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #e0e0e0;
    background-color: #f0f0f0;
    color: #976f36;
  }
  .input {
    height: 82px;
    font-size: 40px;
    line-height: 82px;
    border-bottom: 1px solid #e0e0e0;
    background-color: #f0f0f0;
    label{
      color: #999;
    }
    span{
      color: olivedrab;
    }
  }
  .putIn {
    background-color: #f0f0f0;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 260px;
    font-size: 18px;
    font-weight: bold;
  }
}
.submit{
  background-color: #a48a65;
}
.submit:active{
  background-color: #97723d !important;
}
</style>