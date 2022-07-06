<template>
    <div class="wrapper">
        <Top />
        <ProductList />
        <div class="order">
            <div class="order_price">实付金额 <b>¥{{ productCompute.price}}</b></div>
            <div class="order_btn" @click="() =>handleSubmit(true)">提交订单</div>
        </div>

        <div 
        class="mask" 
        v-show="showConfirm"
        @click="() =>handleSubmit(true)"
        >
            <div class="mask_content" @click.stop>
                <h3 class="title">确认要离开收银台？</h3>
                <p class="dsc">请尽快完成支付，否则将被取消</p>
                <div class="btns">
                    <div 
                    class="btn btn1"
                    @click="() => handleConfirm(true)"
                    >取消订单</div>
                    <div 
                    class="btn btn2"
                    @click="() => handleConfirm(false)"
                    >确认支付</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useCart } from '../../commoneffect/commonCart.js'
import { useRoute,useRouter } from 'vue-router'
import { post } from '../../utils/request'
import { useStore } from 'vuex'
import { ref } from 'vue'

import Top from './Top.vue'
import ProductList from './ProductList.vue'

export default {
    name: 'Order',
    components: { Top, ProductList },
    setup(){
        const router = useRouter()
        const route = useRoute()
        const store = useStore()

        const showConfirm = ref(false)

        //shopId 转换成数字
        const shopId = parseInt(route.params.id,10)
        const { productCompute, shopName, productList } = useCart(shopId)

        const handleSubmit = (status) =>{
            // 展示弹窗
            showConfirm.value = status
        }

        // 取消订单和提交订单结构基本相同
        const handleConfirm = async (isCanceled) => {
            // 循坏productList
            //arr.map 它对数组的每个元素都调用函数，并返回结果数组,返回新值而不是当前元素
            // 数组循环
            // const products = productList.value.map(item =>{})

            // 一.构造接口数据，并请求
            // 对象循环
            const products = []
            for (let i in productList.value){
                const product = productList.value[i]
                products.push({
                    id: parseInt(product._id,10),
                    num: product.count
                })
            }
            // 二.接口返回值
            try {
                const result = await post('/api/order', {
                    addressId: 1,
                    shopId,
                    // shopName是ref类型的值，转换成js的
                    shopName: shopName.value,
                    isCanceled,
                    products
                })
                console.log(result);
                // 和result.data.errno的意思是一样的，但是比result.data.errno的容错性更高
                if (result?.errno === 0) {
                    // 确认提交后，并清空购物车
                    store.commit('clearCartData',shopId)
                    router.push({ name: 'OrderList' })
                } 
            } catch (e) {
                //提示下单失败
                //showToast('请求失败')
            }
        }
        return { productCompute, handleConfirm, showConfirm, handleSubmit }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.wrapper{
    position: absolute;
    background: #F5F5F5;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    overflow-y: scroll ;
}
.order{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    height: .49rem;
    line-height: .49rem;
    background: #fff;
    &_price{
        flex: 1;
        text-indent: .24rem;
        font-size: .14rem;
        color:#333;
    }
    &_btn{
        width: .98rem;
        line-height: .49rem;
        background: #4FB0F9;
        color: #fff;
        font-size: .14rem;
        text-align: center;
    }
}
.mask{
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.50);
    &_content{
        width: 3rem;
        height: 1.57rem;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: .04rem;
        text-align: center;
        .title{
            font-size: .18rem;
            color: #333;
            margin: .24rem 0 0 0;
            line-height: .26rem;
        }
        .dsc{
            font-size: .14rem;
            color: #666;
            line-height: .2rem;
            margin-top: .08rem;
        }
        .btns{
            display: flex;
            margin: .24rem .58rem 0 .58rem;
            .btn{
                flex: 1;
                width: .80rem;
                height: .32rem;
                border-radius: .16rem;
                border: .01rem solid #4FB0F9;
                text-align: center;
                line-height: .32rem;
                font-size: .14rem;
            }
            .btn1{
                margin-right: .12rem;
                color: #4FB0F9;
            }
            .btn2{
                margin-left: .12rem;
                background: #4FB0F9;
                color: #fff;
            }
        }
    }
}
</style>