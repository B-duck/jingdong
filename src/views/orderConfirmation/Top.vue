<template>
     <div class="top">

            <div class="top_header">
                <div 
                class="iconfont back"
                @click="handleBack"
                >&#xe6f2;</div>
                确认订单
            </div>

            <div class="top_receiver">
                <div class="title">收货地址</div>
                <div class="address">北京理工大学国防科技园2号楼10层</div>
                <div class="info">
                    <span class="info_name">李先生</span>
                    <span class="info_name">18911024266</span>
                </div>
                <div class="iconfont enter">&#xe6f2;</div>
            </div>
        </div>

</template>

<script>
import { useRouter } from 'vue-router'

export default {
    name: 'Top',
    setup() {
        const router = useRouter()
        const handleBack = () => {
            router.back()
        }
        return { handleBack }
    }
}
</script>

<style lang="scss" scoped>
.top {
    position: relative;
    height: 1.96rem;
    background-size: 100% 1.59rem;
    background-image: linear-gradient(0deg, rgba(0, 145, 255, 0.00) 4%, #0091FF 50%);
    // 使得颜色在渲染一个区块后不要重复渲染
    background-repeat: no-repeat;

    &_header {
        position: relative;
        padding-top: .4rem;
        line-height: .24rem;
        color: #fff;
        text-align: center;
        font-size: .16rem;

        .back {
            position: absolute;
            left: .19rem;
            font-size: .21rem;
        }
    }

    &_receiver {
        position: absolute;
        left: .18rem;
        right: .18rem;
        bottom: 0;
        height: 1.11rem;
        background: #fff;
        border-radius: .04rem;

        .title {
            padding: .16rem 0 .14rem .16rem;
            font-size: .16rem;
            color: #333;
            line-height: .22rem;
        }

        .address {
            padding: 0 .4rem 0 .16rem;
            font-size: .14rem;
            color: #333;
        }

        .info {
            padding: .06rem 0 0 .16rem;

            &_name {
                font-size: .12rem;
                color: #666666;
                line-height: .18rem;
                margin-right: .06rem;
            }
        }

        .enter {
            position: absolute;
            right: .16rem;
            top: .55rem;
            color: #666666;
            font-size: .16rem;
            transform: rotate(180deg);
        }
    }
}
</style>