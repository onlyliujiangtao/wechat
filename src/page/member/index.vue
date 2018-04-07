<template>
    <div class="member">
        <div class="head">
            <card class="card">
                <blur slot="header" class="card-header" :blur-amount="40" :url="userInfo.headimgurl" :height="140">
                    <div class="logo">
                        <img :src="userInfo.headimgurl" alt="">
                    </div>
                    <div class="header-content">
                        <p>
                            <h2 class="nickname">{{userInfo.nickname}}</h2>
                        </p>
                        <p class="mobile">{{userInfo.mobile}}</p>
                        <p class="radius">{{getMemberType(userInfo.level)}}</p>
                    </div>
                    <div class="header-footer">
                        <div class="setting">
                            <a href="#/setting">账户设置></a>
                        </div>
                    </div>
                    <!-- <p class="center"><img :src="userInfo.headimgurl"></p> -->
                </blur>

                <div slot="content" class="card-flex card-content">
                  <a href="#/balance" class="vux-1px-r">
                        <span>{{userInfo.balance}}</span>
                        <br/> 我的余额
                    </a>
                    <a href="javascript:;" @click="develop" class="vux-1px-r">
                        <span>{{userInfo.bp}}</span>
                        <br/> 我的卡券
                    </a>
                    <a href="javascript:;" class="vux-1px-r" @click="develop">
                        <span>{{userInfo.bp}}</span>
                        <br/> 我的积分
                    </a>
                </div>
            </card>
        </div>
        <div class="content">
            <group class="mt10">
                <cell title="我的购物单" value="查看全部" is-link link="" @click.native="develop">
                    <img slot="icon" class="icon" src="../../assets/list.png" alt="">
                </cell>
                <cell title="我的购物车" value="查看全部" is-link link="" @click.native="develop">
                    <img slot="icon" class="icon" src="../../assets/car.png" alt="">
                </cell>
            </group>
            <group class="mt10">
                <cell title="我的卡券">
                    <img slot="icon" class="icon" src="../../assets/card.png" alt="">
                </cell>
                <grid>
                    <grid-item link="" @click.native="develop">
                        <img slot="icon" src="../../assets/unused.png">
                        <p slot="label">未使用</p>
                    </grid-item>
                    <grid-item link="" @click.native="develop">
                        <img slot="icon" src="../../assets/used.png">
                        <p slot="label">已使用</p>
                    </grid-item>
                    <grid-item link="" @click.native="develop">
                        <img slot="icon" src="../../assets/expired.png">
                        <p slot="label">已失效</p>
                    </grid-item>
                </grid>
            </group>
        </div>
    </div>
</template>

<script>
    import { Card, Badge, Group, Cell, Blur, Grid, GridItem } from "vux";
    import * as request from "../../axios";
    import {mapActions,  mapGetters } from "vuex"; //引入vuex中各个模块的actions

    export default {
      name: "member",
      components: {
        Card,
        Badge,
        Group,
        Cell,
        Blur,
        Grid,
        GridItem
      },
      data() {
        return {
          // userInfo: this.$store.state.user.userInfo
        };
      },
      mounted(){
        if(this.$route.query.a == 1){
              this.updataUserInfo()
          }
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
                    this.setUserInfo(res.content);
                    this.$router.replace('/member')
                } else {
                    this.$toast(res.msg, "warn");
                }
            },
        getMemberType(leavl) {
          let leavlName = "";
          switch (parseInt(leavl)) {
            case 1:
              leavlName = "一般会员";
              break;
            case 2:
              leavlName = "黄金会员";
              break;
            case 3:
              leavlName = "铂金会员";
              break;
            default:
              leavlName = "钻石会员";
          }
          return leavlName;
        }
      },
    };
</script>

<style lang="scss" scoped>
    .member {
      .head {
        .card {
          background-color: transparent !important;
        }
        .card-flex {
          display: flex;
        }
        .card-header {
          position: relative;
          display: flex;
          align-items: center;
          height: 140px;
          background-image: url("../../assets/coffee_bg.jpg");
          background-repeat: no-repeat;
          background-size: cover;
          .logo {
            width: 90px;
            height: 90px;
            margin: 20px;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background-color: #ececec;
              border: 4px solid #ececec;
            }
          }
          .header-content {
            p {
              margin-top: 10px;
              color: #fff;
              font-size: 14px;
              font-weight: bold;
            }
            .mobile{
              font-size: 16px;
              font-weight: bold;
              // text-shadow: 1px 2px #fff;
              color: #000;
            }
            .nickname{
              font-size: 20px;
              color: #fff;
              color: #000;
              // text-shadow: 1px 1px #fff;
            }
            .radius {
              background-color: #a88169;
              text-align: center;
              border-radius: 10px;
              height: 20px;
              line-height: 20px;
              color: #fff;
              padding: 0 10px;
            }
          }
          .header-footer {
            flex-flow: column nowrap;
            .setting {
              position: absolute;
              bottom: 20px;
              right: 20px;
              a {
                color: #000;
                font-size: 16px;
                font-weight: bold;
                text-shadow: 1px 1px orange;
              }
            }
          }
        }
        .card-content {
          background-color: #fff;
          padding: 10px 0;
          a {
            flex: 1;
            text-align: center;
            font-size: 12px;
            span {
              color: #f74c31;
            }
          }
        }
      }
      .content {
        // margin-top: 200px;
        .icon {
          width: 24px;
          height: auto;
          margin-top: 3px;
          margin-right: 6px;
        }
        p {
          color: #666;
        }
      }
    }
</style>