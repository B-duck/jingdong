<template>
    <div class="content" >

        <div class="left">
            <div 
            :class="{'left_item':true,'active':currentTab === item.tab}"
            v-for="item in categories"
            :key="item.name"
            @click="() => handleCategory(item.tab)"
            >
            {{item.name}}
        </div>
        </div>

        <div class="product">

            <div 
            class="product_item"
            v-for="item in list"
            :key="item._id"
            >
                <img :src="item.imgUrl" class="img" />

                <div class="detail">
                    <h4 class="title">{{item.name}}</h4>
                    <p class="sales">月售{{item.sales}}件</p>
                    <p class="price">
                        <span class="yen">&yen;</span>{{item.price}}
                        <span class="orign">&yen;{{item.oldPrice}}</span>
                    </p>
                </div>

                <div class="product_number">
                    <span 
                    class="minus"
                    @click="()=>{changeCart(shopId,item._id,item,-1,shopName)}"
                    >-</span>
                    {{cartList?.[shopId]?.productList?.[item._id]?.count||0}}
                    <span 
                    class="plus"
                    @click="()=>{changeCart(shopId,item._id,item,1,shopName)}"
                    >+</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, toRefs, watchEffect } from 'vue'
import { get } from '../../utils/request'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCart } from '../../commoneffect/commonCart.js'

// 得到一个数据，改变数据
const useTab = () => {
    // 存储名字
    const currentTab = ref(categories[0].tab)
    //改变当前tab的值
    //currentTab是ref类型的数据
    const handleCategory = (tab) => {
       currentTab.value = tab
    }
    return { currentTab, handleCategory }
}


//列表
const useCurrentList = (currentTab, shopId) =>{
    const content = reactive({
        list: []
    })
    const getContentData = async () => {
        const result = await get(`/api/shop/${shopId}/products`, {
            //传的参数是什么，活动页面就是什么
            tab:currentTab.value
        }) 
        if (result?.errno === 0 && result?.data?.length) {
            content.list = result.data
        }

    }
    // 当页面首次加载的时候，以及监听的一些数据发生变化的时候
    //立即执行传入的一个函数，同时响应式追踪其依赖
    watchEffect(()=>{
        //依赖的currentTab数据发生变化
        getContentData()
    })
    //导出内容，setup才能用
    const { list } = toRefs(content)
    return {list}
}

const categories = [{
    name: '全部商品',
    tab: 'all'
},
{
    name: '秒杀',
    tab: 'seckill'
},
{
    name: '新鲜水果',
    tab: 'fruit'
}
]

export default {
    name:'Content',
    //父组件Shop给子组件Content传内容
    props: ['shopName'],
    setup(){
        const route = useRoute()
        const store = useStore()
        const shopId = route.params.id
        const { currentTab, handleCategory } = useTab()
        //currentTab是从上面传下来的，再传进
        const { list } = useCurrentList(currentTab, shopId)
        const { changeItem, cartList } = useCart()
        const cartShopName = (shopId,shopName) =>{
            store.commit('cartShopName', { shopId, shopName })
        }
        // 点击加号后，不仅传商品的信息，还要传商铺的名字
        const changeCart = (shopId, productId, productInfo, num, shopName) =>{
            changeItem(shopId, productId, productInfo, num)
            cartShopName(shopId, shopName)
        }
        return { categories, currentTab, handleCategory, list, shopId, changeItem, cartList, changeCart }
    }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.content{
    display: flex;
    position: absolute;
    left: 0;
    right: 0;
    top: 1.5rem;
    bottom: .5rem;
}
.left{
    width: .76rem;
    background: #F5F5F5;
    height: 100%;
    //纵向设置滚动条
    overflow-y: scroll;
    &_item{
        line-height: .4rem;
        text-align: center;
        font-size: .14rem;
        color: #333;
    }
    .active {
        background: #fff;
    }
}

.product{
    flex:1;
    overflow-y: scroll;
    &_item{
        position: relative;
        display: flex;
        padding: .12rem 0;
        margin: 0 .16rem;
        border-bottom: .01rem solid #F1F1F1 ;
        .detail{
            overflow: hidden;
        }
        .img{
            width: .68rem;
            height: .68rem;
            margin-right: .16rem;
        }
        .title{
            line-height: .2rem;
            font-size: .14rem;
            color: #333;
            margin: 0;
            @include ellipse
        }
        .sales{
            margin: .06rem 0;
            line-height: .16rem;
            font-size: .12rem;
            color: #333;
        }
        .price{
            margin: 0;
            line-height: .2rem;
            font-size: .14rem;
            color: #E93B3B;
            .yen{
                font-size: .12rem;
            }
            .orign{
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
        .plus{
            width: .2rem;
            height: .2rem;
            line-height: .16rem;
            display: inline-block;
            border-radius: 50%;
            font-size: .2rem;
            text-align: center;
        }
        .minus{
            border: .01rem solid #666;
            color: #666;
            margin-right: .05rem;
        }
        .plus{
            background: #0091FF;
            color: #fff;
            margin-left: .05rem;
        }
        }
    }
}
</style>