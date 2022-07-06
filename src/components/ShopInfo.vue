<template>
    <div class="shop">
        <img :src="item.imgUrl" class="shop_img" />
        <div class="shop_text">
            <div class="biaoti">{{ item.name }}</div>
            <div class="tags">
                <span class="tag">月售: {{ item.sales }}</span>
                <span class="tag">起送: {{item.expressLimit}}</span>
                <span class="tag">基础运费: {{item.expressPrice}}</span>
            </div>
            <p class="highlight">{{item.slogan}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'ShopInfo',
    //接收父组件shop传递过来的数据
    props: ['item'],
}
</script>


<style lang="scss" scoped>
@import '../style/virable.scss';
.shop {
    display: flex;
    padding-top: .12rem;

    &_img {
        margin-right: .16rem;
        width: .56rem;
        height: .56rem;
    }
    &_text {
        flex: 1;
        border-bottom: 1px solid #F1F1F1;
        padding-bottom: .12rem;

        .biaoti {
            line-height: .22rem;
            font-size: .16rem;
            color: $content-font-color;
        }

        .tags {
            line-height: .18rem;
            font-size: .13rem;
            color: $content-font-color;
            margin-top: .08rem;

            .tag {
                margin-right: .16rem;
            }
        }

        .highlight {
            margin: .08rem 0 0 0;
            color: #E93B3B;
            line-height: .18rem;
            font-size: .13rem;
        }
    }
}


</style>