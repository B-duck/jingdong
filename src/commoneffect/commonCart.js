import { useStore } from 'vuex'
import { computed } from 'vue'

//购物车相关
export const useCart = (shopId) => {
    // 拿出购物车的数据
    const store = useStore()
    const cartList = store.state.cartList
    const changeItem = (shopId, productId, productInfo, num) => {
        //改变store里的数据
        store.commit('changeItem', { shopId, productId, productInfo, num })
    }

    // 取出购物车的信息
    const productList = computed(() => {

        // 如果不存在的话，默认给空对象
        const productList = cartList[shopId]?.productList || {}
        return productList
    })

    // 取出商铺名字
    const shopName = computed(() => {
        // 如果不存在的话，默认给空数组
        const shopName = cartList[shopId]?.shopName || ''
        return shopName
    })

    const productCompute = computed(() => {
        // 购物车数量发生变化
        // 购物车价格发生变化
        const productList = cartList[shopId]?.productList
        const result = { total: 0, price: 0 }
        if (productList) {
            for (let i in productList) {
                console.log(productList[i]);
                const product = productList[i]
                result.total += product.count
                result.price += (product.count * product.price)
            }

        }
        result.price = result.price.toFixed(2)
        return result
    })
    return { changeItem, cartList, productList, shopName, productCompute }
}

