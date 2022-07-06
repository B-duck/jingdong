<template>
    <div
    class="mask" 
    v-if="showCart && productCompute.total>0" 
    @click="handleCart"
    />

    <div class="cart">

        <div 
        class="product" 
        v-if="showCart && productCompute.total>0">

            <div class="header">
                <div class="clear">
                    <span @click="() => clearCart(shopId)">清空购物车</span>
                </div>
            </div>

            <template v-for="item in productList" :key="item._id">

                <div class="product_item" v-if="item.count > 0">
                    <img :src="item.imgUrl" class="img" />

                    <div class="detail">
                        <h4 class="title">{{item.name}}</h4>
                        <p class="price">
                            <span class="yen">&yen;</span>{{item.price}}
                            <span class="orign">&yen;{{item.oldPrice}}</span>
                        </p>
                    </div>

                    <div class="product_number">
                        <span 
                        class="minus" 
                        @click="()=>{changeItem(shopId,item._id,item,-1)}">-</span>
                        {{item.count||0}}
                        <span 
                        class="plus"
                        @click="()=>{changeItem(shopId,item._id,item,1)}">+</span>
                    </div>
                </div>
            </template>
        </div>

        <div class="check">
            <div class="check_icon">
                <img src="http://www.dell-lee.com/imgs/vue3/basket.png" class="img" @click="handleCart">
                <div class="tag">{{productCompute.total}}</div>
            </div>
            <div class="check_info">
                总计：<span class="price">&yen; {{productCompute.price}}</span>
            </div>
            <div class="check_btn" v-show="productCompute.total > 0">
                <router-link :to="{ path: `/order/${shopId}` }">
                    去结算
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useCart } from '../../commoneffect/commonCart.js'


const useCartComputed = (shopId) =>{
    const store = useStore()
    const { productList, changeItem, productCompute } = useCart(shopId)
    //清空购物车
    //因为要传一个参数进来，所以@click上是箭头函数
    const clearCart = (shopId) =>{
        store.commit('clearCart', { shopId })
    }
    return { productCompute, productList, changeItem, clearCart }
} 

//  切换购物车，逻辑
const toggleCart = () =>{
    // 购物车在没有加购以及不点击小图标时是不展示信息的
    const showCart = ref(false)
    // 购物车图标在点击时，展示信息
    const handleCart = () => {
        showCart.value = !showCart.value
    }
    return { handleCart, showCart }
}

export default {
    name:'Cart',
    setup() {
        const route = useRoute()
        const shopId = route.params.id
        const { handleCart, showCart } = toggleCart()
        const { productCompute, productList, changeItem, clearCart } = useCartComputed(shopId)
        return { productCompute, productList, changeItem, shopId, clearCart, showCart, handleCart }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';

.mask{
    // 生成绝对定位的元素，相对于浏览器窗口进行定位
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    // z-index为正数，表示在另一元素之上,蒙层
    z-index: 1;
}

.cart{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    //正数越大，则离用户更近
    z-index: 2;
    background: #fff;
}
.check{
    display: flex;
    height: .49rem;
    border-top: .01rem solid #F1F1F1;
    line-height: .49rem;
    &_icon{
        position: relative;
        width: .84rem;
        .img{
            display: block;
            margin: .12rem auto;
            width: .28rem;
            height: .26rem;
        }
        .tag{
            position: absolute;
            // 加了位置状态还不算，必须有具体位置
            left: .5rem;
            top: .04rem;
            padding: 0 .04rem;
            //图标用20px的，然后缩小到10px
            // 宽度可以随时数字的变化而变宽
            min-width: .2rem;
            height: .2rem;
            background: #E93B3B;
            border-radius: .1rem;
            font-size: .12rem;
            line-height: .2rem;
            text-align: center;
            color: #fff;
            transform: scale(.5);
            transform-origin: left center;
        }
    }
    &_info{
        flex: 1;
        color: #333;
        font-size: .12rem;
        .price{
           color: #E93B3B;
           font-size: .18rem;
        }
    }
    &_btn{
        width: .98rem;
        background: #4FB0F9;
        font-size: .14rem;
        text-align: center;
        a{
            color: #fff;
            text-decoration: none;
        }
    }
}

.product {
    flex: 1;
    overflow-y: scroll;
    background: #fff;
    .header{
        display: flex;
        line-height: .52rem;
        border-bottom: #F1F1F1;
        .clear{
            flex:1;
            margin-right: .16rem;
            text-align: right;
            font-size: .14rem;
            color: #333;
        }
    }
    &_item {
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: .01rem solid #F1F1F1;

        .detail {
            overflow: hidden;
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
            margin: .06rem 0 0 0;
            line-height: .2rem;
            font-size: .14rem;
            color: #E93B3B;

            .yen {
                font-size: .12rem;
            }

            .orign {
                line-height: .2rem;
                font-size: .12rem;
                color: #999;
                text-decoration: line-through;
                margin-left: .06rem;
            }
        }

        .product_number {
            position: absolute;
            right: 0;
            bottom: .12rem;

            .minus,
            .plus {
                width: .2rem;
                height: .2rem;
                line-height: .16rem;
                display: inline-block;
                border-radius: 50%;
                font-size: .2rem;
                text-align: center;
            }

            .minus {
                border: .01rem solid #666;
                color: #666;
                margin-right: .05rem;
            }

            .plus {
                background: #0091FF;
                color: #fff;
                margin-left: .05rem;
            }
        }
    }
}
</style>