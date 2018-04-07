<template>
    <div class="integral">
        <div class="header">
            <group>
                <cell title="积分：500" value="value">
                    <div>
                        <x-button mini  @click.native="develop">积分兑换</x-button>
                    </div>
                </cell>
            </group>
            
        </div>
        <div class="content">
            <group>
                <div slot="title" class="title">
                    <div class="left">时间</div>
                    <div class="right">
                        <p>积分类型</p>
                        <p>积分值</p>
                    </div>
                </div>
                <cell v-for="i in 10" :key="i">
                    <div slot="title"  class="title">
                        <div class="left">2016-06-25 15:35</div>
                        <div class="right">
                            <p>会员充值</p>
                            <p>+50</p>
                        </div>
                    </div>
                </cell>
            </group>
        </div>
    </div>
</template>

<script>
    import { Cell, Group, XButton } from "vux";
    export default {
      name: "integral",
      components: {
        Cell,
        Group,
        XButton
      }
    };
</script>

<style lang="scss" scoped>
    .integral {
      .header {
        width: 100%;
        z-index: 1;
        position: fixed;
        top: 0;
        left: 0;
      }
      .content {
        padding-top: 64px;
        .title {
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-around;
          height: 40px;
          line-height: 40px;
          .left,
          .right {
            text-align: center;
            width: 50%;
          }
          .right {
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            margin: 0 20px;
          }
        }
      }
    }
</style>