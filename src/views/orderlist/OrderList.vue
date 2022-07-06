<template>
    <div class="wrapper">
        <div class="title">我的订单</div>
        <div class="orders">
            <div 
            class="order" 
            v-for="(item, index) in list"
            :key="index">
                <div class="name">
                    {{item.shopName}}
                    <span class="status">
                        {{item.isCanceled ? '已取消' : "已下单"}}
                    </span>
                </div>

                <div class="content">
                    <div class="imgs">
                        <template
                        v-for="(inItem, inIndex) in item.products"
                        :key="inIndex"
                        >
                        <img 
                            class="img"
                            :src="inItem.product.img" 
                            v-if="inIndex <= 3"
                        >
                        </template>
                    </div>

                    <div class="info">
                        <div class="price">¥{{item.total}}</div>
                        <div class="num">共{{item.num}}件</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Docker :currentIndex="2" />
</template>

<script>
import { reactive,toRefs } from 'vue'
import { get } from '../../utils/request'
import Docker from '../../components/Docker.vue'


// 处理订单列表逻辑
const useOrderList = () =>{
    const data = reactive({ list:[]})
    const getNearbyList = async () => {
        const result = await get('/api/order')
        // 拿到接口返回的数据
        if (result?.errno === 0 && result?.data?.length) {
            const Data = result.data
            Data.forEach((order) => {
                const products=order.products
                // 一开始订单总价是0
                 let total = 0
                 let num = 0
                 // 循环加钱
                products.forEach((item) =>{
                    num += (item.orderSales || 0)
                    total += (item.product.price * item.product.orderSales)
                })
                order.total = total
                order.num = num
            })
             console.log(Data);
            // nearbyList是ref类型的
            data.list = result.data
        }
    }
    getNearbyList()
    const { list } = toRefs(data)
    return { list }
}

export default {
    name: 'OrderList',
    components: { Docker },
    setup(){
        // 导出的是对象，需要解构以后使用
        const {list} = useOrderList()
        // console.log(list)
        return { list }
    }
}
</script>

<style lang="scss" scoped>
.wrapper {
    //可以纵向滚动
    overflow: auto;
    position: absolute;
    left: 0;
    top: 0;
    bottom: .5rem;
    right: 0;
    background: #eee;
}
.title{
    line-height: .44rem;
    background: #fff;
    color: #333;
    font-size: .16rem;
    text-align: center;
}
.orders{
    .order{
        margin: .16rem .18rem;
        padding: .16rem;
        background: #fff;
        .name{
            margin-bottom: .16rem;
            line-height: .22rem;
            font-size: .16rem;
            color: #333;
            .status{
                float: right;
                font-size: .14rem;
                color:#999;
            }
        }
        .content{
            display: flex;
            .imgs{
                flex: 1;
                .img{
                    width: .4rem;
                    height: .4rem;
                    margin-right: .12rem;
                }
            }
            .info{
                width: .7rem;
                .price{
                    font-size: .14rem;
                    color:#E93B3B;
                    text-align: center;
                    text-align: right;
                    line-height: .2rem;
                    margin-bottom: .04rem;
                }
                .num{
                    font-size: .12rem;
                    color: #333;
                    text-align: right;
                    line-height: .14rem;
                }
            }
        }
    }
}
</style>