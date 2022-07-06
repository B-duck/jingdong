<template>
    <div class="products">
        <div class="products_title">
            {{shopName}}
        </div>
        <div class="products__wrapper">
            <div class="products_list">
                <template 
                    v-for="item in productList" 
                    :key="item._id"
                >
                    <div v-if="item.count > 0" class="item" >
                        <img :src="item.imgUrl" class="img" />

                        <div class="detail">
                            <h4 class="title">{{item.name}}</h4>
                            <p class="price">
                                <span class="yen">&yen;{{item.price}} x {{ item.count }}</span>
                                <span class="total">
                                    <span class="yen">&yen;{{(item.price*item.count).toFixed(2)}}</span>
                                </span>
                            </p>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { useCart } from '../../commoneffect/commonCart.js'
import { useRoute, useRouter } from 'vue-router'

export default {
    name: 'ProductLIst',
    setup() {
        const route = useRoute()
        const shopId = route.params.id
        const { productList, shopName } = useCart(shopId)
        return { productList, shopName }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.products {
    margin: .16rem .18rem .2rem .18rem;
    background: #fff;

    &_title {
        font-size: .16rem;
        color: #333;
        padding: .16rem;
    }

    &_wrapper {
        overflow-y: scroll;
        margin: 0 .18rem;
        position: absolute;
        left: 0;
        right: 0;
        bottom: .6rem;
        top: 2.6rem;
    }

    &_list {
        background: #fff;

        .item {
            position: relative;
            display: flex;
            padding: 0 .16rem 0.16rem .16rem;

            .detail {
                flex: 1;
            }

            .img {
                width: .46rem;
                height: .46rem;
                margin-right: .16rem;
            }

            .title {
                line-height: .2rem;
                font-size: .14rem;
                color: #333;
                margin: 0;
                @include ellipse
            }

            .price {
                display: flex;
                margin: .06rem 0 0 0;
                line-height: .2rem;
                font-size: .14rem;
                color: #E93B3B;

                .yen {
                    font-size: .12rem;
                }

                .total {
                    text-align: right;
                    flex: 1;
                    color: #000
                }
            }
        }
    }
}
</style>