<template>
    <div class="card">
        <tab :line-width=3 active-color='#fc378c' v-model="index" class="tab">
            <tab-item selected>
                未领取
            </tab-item>
            <tab-item>
                已失效
            </tab-item>
            <tab-item>
                已使用
            </tab-item>
        </tab>
        <swiper v-model="index" class="content" height="100%" :show-dots="false">
            <swiper-item>
                <card-panel :cardList="cardList1"></card-panel>
            </swiper-item>
            <swiper-item>
                <card-panel :cardList="cardList2"></card-panel>
            </swiper-item>
            <swiper-item>
                <card-panel :cardList="cardList3"></card-panel>
            </swiper-item>
        </swiper>
    </div>
</template>

<script>
    import cardPanel from "@/components/cardPanel";
    import { Tab, TabItem, Swiper, SwiperItem } from "vux";

    export default {
      components: {
        "card-panel": cardPanel,
        Tab,
        TabItem,
        Swiper,
        SwiperItem
      },
      data() {
        return {
          index: parseInt(this.$route.query.id) || 0,
          cardList1: [],
          cardList2: [],
          cardList3: []
        };
      },
      mounted() {
        this.cardList1 = [
          {
            title: "剪发券*启创会员专享",
            desc: "最高抵扣50元，启创会员均可使用，使用于所有店铺",
            type: "0",
            id: "1",
            time: "2016-05-30",
            imgUrl: "./static/img/coupon_bg.jpg"
          },
          {
            title: "剪发券*启创会员专享",
            desc: "最高抵扣50元，启创会员均可使用，使用于所有店铺",
            type: "0",
            id: "1",
            time: "2016-05-30",
            imgUrl: "./static/img/coupon_bg.jpg"
          },
          {
            title: "剪发券*启创会员专享",
            desc: "最高抵扣50元，启创会员均可使用，使用于所有店铺",
            type: "0",
            id: "1",
            time: "2016-05-30",
            imgUrl: "./static/img/coupon_bg.jpg"
          },
          {
            title: "剪发券*启创会员专享",
            desc: "最高抵扣50元，启创会员均可使用，使用于所有店铺",
            type: "0",
            id: "1",
            time: "2016-05-30",
            imgUrl: "./static/img/coupon_bg.jpg"
          },
          {
            title: "剪发券*启创会员专享",
            desc: "最高抵扣50元，启创会员均可使用，使用于所有店铺",
            type: "0",
            id: "1",
            time: "2016-05-30",
            imgUrl: "./static/img/coupon_bg.jpg"
          },
          {
            title: "剪发券*启创会员专享",
            desc: "最高抵扣50元，启创会员均可使用，使用于所有店铺",
            type: "0",
            id: "1",
            time: "2016-05-30",
            imgUrl: "./static/img/coupon_bg.jpg"
          },
          {
            title: "剪发券*启创会员专享",
            desc: "最高抵扣50元，启创会员均可使用，使用于所有店铺",
            type: "0",
            id: "1",
            time: "2016-05-30",
            imgUrl: "./static/img/coupon_bg.jpg"
          },
          {
            title: "剪发券*启创会员专享",
            desc: "最高抵扣50元，启创会员均可使用，使用于所有店铺",
            type: "0",
            id: "1",
            time: "2016-05-30",
            imgUrl: "./static/img/coupon_bg.jpg"
          }
        ];
        this.cardList2 = [
          {
            title: "剪发券*启创会员专享",
            desc: "最高抵扣50元，启创会员均可使用，使用于所有店铺",
            type: "1",
            id: "1",
            time: "2016-05-30",
            imgUrl: "./static/img/coupon_bg.jpg"
          }
        ];
        this.cardList3 = [
          {
            title: "剪发券*启创会员专享",
            desc: "最高抵扣50元，启创会员均可使用，使用于所有店铺",
            type: "2",
            id: "1",
            time: "2016-05-30",
            imgUrl: "./static/img/coupon_bg.jpg"
          }
        ];
      }
    };
</script>

<style lang="scss" scoped>
    .card {
      .tab {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1;
      }
      .content {
        height: 100vh;
        padding-top: 44px;
        box-sizing: border-box;
        overflow: auto;
      }
    }
</style>