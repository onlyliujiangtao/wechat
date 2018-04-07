<template>
    <div class="balance">
        <div class="header">
            <div class="yuan">
                <p class="text">余额(元)</p>
                <p class="amount">{{$store.state.user.userInfo.balance.toFixed(2)}}</p>
            </div>
            <div class="desc">
                <!-- <p>现金账户：100</p> -->
                <!-- <p>赠送金额：200</p> -->
                <p><x-button mini @click.native="goRecharge">立即充值</x-button></p>
            </div>
            <divider>余额明细</divider>
        </div>
        <tab :line-width=3 active-color="#a48a65" v-model="recordType">
            <tab-item selected>
                充值记录
            </tab-item>
            <tab-item>
                消费记录
            </tab-item>
        </tab>
        <swiper v-model="recordType" class="record" height="100%" :show-dots="false">
            <swiper-item>
                <group v-for="(item,index) in record" :key="index" :title="formatTime(item.createTime,'{m}/{y}')">
                    <cell v-for="(recordItem,i) in item.record" :key="i">
                        <div slot="after-title">
                            <p class="color090">{{formatTime(recordItem.createTime,'{d}日 {h}:{i}')}}</p>
                        </div>
                        <div>
                            <p class="color090">现金 +{{recordItem.amount}}</p>
                        </div>
                    </cell>
                </group>
                <div v-if="record.length==0" style="height: 100%;display: flex;flex-flow: row nowrap;justify-content: center;align-items: center;">暂无充值记录</div>
            </swiper-item>
            <swiper-item>
                <group v-for="(item,index) in recharge" :key="index" :title="formatTime(item.createTime,'{m}/{y}')">
                    <cell v-for="(rechargeItem,i) in item.recharge" :key="i">
                        <div slot="after-title">
                            <p class="colord00">{{formatTime(rechargeItem.createTime,'{d}日 {h}:{i}')}}</p>
                        </div>
                        <div>
                            <p class="colord00">现金 -{{rechargeItem.amount}}</p>
                        </div>
                    </cell>
                </group>
                <div v-if="recharge.length==0" style="height: 100%;display: flex;flex-flow: row nowrap;justify-content: center;align-items: center;">暂无消费记录</div>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import { XButton, Divider, Group, Cell , Tab, TabItem , Swiper, SwiperItem} from "vux";
    import * as request from '@/axios'
    import {  mapGetters, mapActions } from "vuex"; //引入vuex中各个模块的actions

    export default {
      components: { XButton, Divider, Group, Cell , Tab, TabItem, Swiper, SwiperItem},
      data(){
          return {
              recordType:0,
              record:[],
              recharge:[]
          }
      },
      mounted(){
          this.getRecord()
          this.getRecharge()
      },
      methods: {
          goRecharge() {
            this.$router.push('/recharge')
          },
          async getRecord(){
              const res = await request.selectPayLog({id:this.$store.state.user.userInfo.id})
              if(res.success){
                  res.content.map(item => {
                    if(this.record.length>0){
                      this.record.map(val => {
                        if(this.formatTime(val.createTime,'{m}/{y}')==this.formatTime(item.createTime,'{m}/{y}')){
                          val.record.push(item)
                        }else{
                          this.record.push({createTime:item.createTime,record:[item]})
                        }
                      },this)
                    }else{
                      this.record.push({createTime:item.createTime,record:[item]})
                    }
                  },this)
              }
          },
        async getRecharge(){
            const res = await request.selectPayOrderLog({id:this.$store.state.user.userInfo.id})
            if(res.success){
                res.content.map(item => {
                if(this.recharge.length>0){
                    this.recharge.map(val => {
                    if(this.formatTime(val.createTime,'{m}/{y}')==this.formatTime(item.createTime,'{m}/{y}')){
                        val.recharge.push(item)
                    }else{
                        this.recharge.push({createTime:item.createTime,recharge:[item]})
                    }
                    },this)
                }else{
                    this.recharge.push({createTime:item.createTime,recharge:[item]})
                }
                },this)
            }
        }
      },
    };
</script>

<style lang="scss" scoped>
    .balance {
      height: 100vh;
      width: 100%;
      padding-top: 230px;
      box-sizing:border-box;
      .header {
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        position:fixed;
        top: 0;
        left: 0;
        z-index: 1;
        background-color: #fff;
        .yuan {
          margin: 26px 0;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          justify-content: center;
          height: 115px;
          width: 115px;
          border-radius: 50%;
          background-color: #b48b5f;
          color: #fff;
          .text {
            font-size: 18px;
          }
          .amount {
            font-size: 24px;
          }
        }
        .desc {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-around;
          align-items: center;
          p {
            margin: 0 10px;
          }
        }
      }
      .record{
          height: calc(100vh - 274px);
          box-sizing: border-box;
      }
      .vux-swiper-item{
          overflow: auto;
      }
    }
</style>