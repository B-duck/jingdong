<template>
        <div class="top-postion">
            <span class="iconfont position_icon">&#xe619;</span>
            北京理工大学国防科技园2号楼10层 北京理工大学国防科技园2号楼10层
            <span class="iconfont bell_icon">&#xe60b;</span>
        </div>

        <div class="search">
            <span class="iconfont">&#xe62d;</span>
            山姆会员商店优惠商品
        </div>

        <div class="banner">
            <img class="banner_img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg" />
        </div>

        <div class="icons">
            <div
            class="icons_item"
            v-for="item in iconsList"
            :key="item.text"
            >
                <img class="icons_item_img" :src="`http://www.dell-lee.com/imgs/vue3/${item.imgurl}.png`" />
                <p class="icons_item_text">{{item.text}}</p>
            </div>
        </div>
        <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconsList = [{
      imgurl: '超市',
      text: '超市便利'
    },
    {
      imgurl: '菜市场',
      text: '菜市场'
    },
    {
      imgurl: '水果店',
      text: '水果店'
    },
    {
      imgurl: '鲜花',
      text: '鲜花绿植'
    },
    {
      imgurl: '医药健康',
      text: '医药健康'
    },
    {
      imgurl: '家居',
      text: '家居时尚'
    },
    {
      imgurl: '蛋糕',
      text: '烘培蛋糕'
    },
    {
      imgurl: '签到',
      text: '签到'
    },
    {
      imgurl: '大牌免运',
      text: '大牌免运'
    },
    {
      imgurl: '红包',
      text: '红包套餐'
    }
    ]
    return { iconsList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/virable.scss';
@import '../../style/mixin.scss';
.top-postion {
    position: relative;
    @include ellipse;
    //上 右 下 左
    padding: .16rem .24rem .16rem 0;
    line-height: .22rem;
    font-size: .16rem;
    margin-right: .24rem;
    color: $content-font-color;

    .position_icon {
        position: relative;
        font-size: .2rem;
        top: .01rem;
    }

    .bell_icon {
        position: absolute;
        right: 0;
        top: 0.17rem;
        font-size: .2rem;
    }
}

.search {
    margin-bottom: .12rem;
    line-height: .2rem;
    background: #F5F5F5;
    color: #B7B7B7;
    border-radius: .16rem;
    font-size: .16rem;

    .iconfont {
        display: inline-block;
        padding: 0 .11rem 0 .16rem;
    }
}

.banner {
    height: 0;
    overflow: hidden;
    padding-bottom: 25.4%;

    &_img {
        width: 100%;
    }
}

.icons {
    display: flex;
    //换行展示
    flex-wrap: wrap;
    margin-top: 0.16rem;

    &_item {
        width: 20%;

        &_img {
            display: block;
            width: .4rem;
            height: .4rem;
            margin: 0 auto;
        }

        &_text {
            line-height: .17rem;
            text-align: center;
            margin: .06rem 0 .16rem 0;
            color: $content-font-color;
        }
    }
}

.gap {
    height: .1rem;
    background: #F1F1F1;
    margin: 0 -.18rem;
}
</style>
