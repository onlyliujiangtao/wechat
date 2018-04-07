<template>
    <div style="">
        <blur :blur-amount="40" :url="url">
            <p class="center"><img :src="url"></p>
        </blur>
    </div>
</template>

<script>
    import { Flexbox, FlexboxItem, Blur } from "vux";

    export default {
      components: {
        Blur
      },
      data() {
        return {
          url:
            "http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIgmWmb9ia7ekvIFmGcXHdcoYwtCBeibZ8js8rD7exU4zcrOhsLyHbmH8kpDDMxJQIV39XKia2cIJhYQ/0 "
        };
      }
    };
</script>

<style scoped>
    .center {
      text-align: center;
      padding-top: 20px;
      color: #fff;
      font-size: 18px;
    }
    .center img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 4px solid #ececec;
    }
</style>