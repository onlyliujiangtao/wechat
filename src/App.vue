<template>
    <div id="app">
        <router-view></router-view>
        <tabbar v-show="bottoms">
            <tabbar-item :selected="selected('/order')" link="/order">
                <img slot="icon" src="./assets/logo.png">
                <span slot="label">我要下单</span>
            </tabbar-item>
            <tabbar-item :selected="selected('/order/car')" badge="2" link="/order/car">
                <img slot="icon" src="./assets/logo.png">
                <span slot="label">购物车</span>
            </tabbar-item>
            <tabbar-item :selected="selected('/order/orderlist')" link="/order/orderlist" show-dot>
                <img slot="icon" src="./assets/logo.png">
                <span slot="label">我的订单</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>

<script>
    import ViewBox from "vux/src/components/view-box"
    import Tabbar from "vux/src/components/tabbar/tabbar"
    import TabbarItem from "vux/src/components/tabbar/tabbar-item"
    
    export default {
      name: "app",
      components: {
        Tabbar,
        TabbarItem,
        ViewBox
      },
      computed: {
        bottoms() {
          if (this.$route.path.indexOf("order") >= 0) {
            return true;
          } else {
            return false;
          }
        }
      },
      methods: {
        selected(url) {
          return url == this.$route.path;
        }
      },
      mounted() {}
    };
</script>

<style lang="scss">
    @import "styles/common";

    body {
      background-color: #ebeced;
    }
</style>
