<template>
    <div class="wrapper">
        <div class="search">
            <div class="back iconfont" @click="handleBack">&#xe6f2;</div>
            <div class="text">
                <span class="icon iconfont">&#xe62d;</span>
                <input class="input" placeholder="请输入商品名称" />
            </div>
        </div>
        <ShopInfo :item="data.item" />
        <Content :shopName="data.item.name" />
        <Cart />
    </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {get} from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'
import Content from './Content.vue'
import Cart from './Cart.vue'

const useShopInfo = () =>{
    //获取当前路由的一些内容，路径等
    const route = useRoute() 
    const data = reactive({
        item: {}
    })
    const getItemData = async () => {
        const result = await get(`/api/shop/${route.params.id}`)
        //获取接口内保存的数据
        if (result.errno === 0 && result.data) {
            //用reactive，方便一次将数据更新
            data.item = result.data
        }
    }
    return { data, getItemData }
}

export default {
    name:'Shop',
    components: { ShopInfo, Content,Cart },
    setup(){
        const { data, getItemData } = useShopInfo()
        //找到 getItemData，找到data.item
        getItemData()
        const router=useRouter()
        const handleBack = () =>{
            router.back()
        }
        return { data, handleBack, getItemData }
    }
}
</script>


<style lang="scss" scoped>
.wrapper{
    padding: 0 .18rem;
    .search{
        margin: .14rem 0 .04rem 0;
        display: flex;
        line-height: .32rem;
        .back{
            width: .3rem;
            height: .32rem;
            font-size: .3rem;
            color:#B6B6B6;
        }
        .text{
            display: flex;
            // 自适应布局，内容区会自动放大或缩小占满剩余空间
            flex: 1;
            background: #F5F5F5;
            border-radius: .16rem;
            border-radius: 16px;
            .icon{
                width: .44rem;
                text-align: center;
                color: #B7B7B7;
                font-size: .2rem;
            }
            .input{
                height: .32rem;
                border: none;
                outline: none;
                background: none;
                width: 100%;
                padding-right: .2rem;
                font-size: .14rem;
                &::placeholder{
                    color: #333;
                }
            }
        }
    }
}
</style>