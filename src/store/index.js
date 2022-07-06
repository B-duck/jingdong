import Vuex from 'vuex'

// 把信息存储到本地存储中
const setLocalStorage = (state) => {
  const { cartList } = state
  // 必须是一个json内容
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalStorage = () => {
  // 处理parse的方法
  try{
    return JSON.parse(localStorage.cartList)
  }catch(e){
    return {}
  }
}

// 全局的数据
export default Vuex.createStore({
  state: {
    cartList: getLocalStorage()
  },
  getters: {
  },
  mutations: {
    // state是item的信息
    changeItem(state, payload) {
      const { shopId, productId, productInfo, num } = payload;
      let shopInfo = state.cartList[shopId]
      // 错误:if的括号加错了位置
      if (!shopInfo) {
        shopInfo = {
          // productList是对象（花括号）
          // 不是数组
          shopName: '', productList: {}
        }
      }
      let product = shopInfo.productList[productId]
      // 获取shopInfo中对应productId的商品信息，如果能获取到，不走if，让产品的数量加一，新的商品信息重新存回去
      // 如果没找到，就构建一个product，赋值count等于0，再加一
      if (!product) {
        product = productInfo
        product.count = 0
      }
      product.count = product.count + num;
      shopInfo.productList[productId] = product
      if (product.count < 0) { product.count = 0 }
      if (product.count > 100) { product.count = 99 }
      //新的shopInfo需要重新存回cartList
      state.cartList[shopId] = shopInfo
      setLocalStorage(state)
    },

    clearCart(state, payload) {
      const { shopId } = payload
      state.cartList[shopId] = {}
      console.log(state.cartList)
      setLocalStorage(state)
    },

    cartShopName(state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopName: '', productList: [{}]
      }
      //shopName是传进来的
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalStorage(state)
    },

    clearCartData(state, shopId) {
      // 直接清空productList
      state.cartList[shopId].productList = {}
    }
  }
})
