<template>
    <div class="docker">
        <div
        v-for="(item,index) in dockerList"
        :class="{'docker_item' : true, 'docker_item--active':index===currentIndex}"
        class="docker_item"
        :key="item.icon"
        >
            <router-link :to="item.to">
            <div class="iconfont" v-html="item.icon" />
            <div class="title">{{item.text}}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Docker',
  props:['currentIndex'],
  setup () {
    const dockerList = [ 
      { icon: '&#xe6f3;', text: '首页', to:{name :'Home'} },
        { icon: '&#xe7e5;', text: '购物车', to: { name: 'CartList' } },
        { icon: '&#xe61e;', text: '订单', to: { name: 'OrderList' } },
        { icon: '&#xe660;', text: '我的', to: { name: 'Home' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/virable.scss';
@import '../style/mixin.scss';
.docker {
    display: flex;
    position: absolute;
    box-sizing: border-box;
    padding: 0 .18rem;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.49rem;
    border-top: 1px solid #F1F1F1;
    //相当于 .docker_item{ }
    &_item {
        flex: 1;
        text-align: center;

        .iconfont {
            margin: .07rem 0 .02rem 0;
            font-size: .18rem;
        }
        a{
            color: $content-font-color;
            text-decoration: none;
        }
        &--active {
            a{
                color: #1FA4FC;
            }
        }
    }
    .title {
        font-size: .2rem;
        //20px的文字，让其纵向缩50%，横向缩50%，变成10px
        transform: scale(.5, .5);
        //缩放中心点，顶部中心
        transform-origin: center top;
    }
}
</style>
