<template>
    <div class="nearby">
        <h3 class="h3">附近店铺</h3>
        <router-link 
        :to="`/shop/${item._id}`" 
        v-for="item in nearbyList"
        :key="item._id">
            <ShopInfo :item="item" />
        </router-link>
    </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request'
import ShopInfo from '../../components/ShopInfo.vue'

const useNearby = () => {
    const nearbyList = ref([])
    const getNearbyList = async () => {
        const result = await get('/api/shop/hot-list')
        // 和result.data.errno的意思是一样的，但是比result.data.errno的容错性更高
        if (result?.errno === 0 && result?.data?.length) {
            //nearbyList是ref类型的
            nearbyList.value = result.data
        }
    }
    return { nearbyList, getNearbyList }
}

export default {
  name: 'Nearby',
  // 局部组件的方法引入
  components: {ShopInfo},
  setup () {
    const { nearbyList, getNearbyList } = useNearby()
    getNearbyList();
    return { nearbyList }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../style/virable.scss';
@import '../../style/mixin.scss';
.nearby {
    .h3 {
        margin: .16rem 0 .02rem 0;
        font-size: .18rem;
        font-weight: normal;
        color: $content-font-color;
    }
    a {
        //取消掉下划线
        text-decoration: none;
    }
}
</style>
