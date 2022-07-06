// 接收传递过来的一些参数
import axios from 'axios'

// 创建一个axios的实例
const instance = axios.create({
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  timeout: 10000
})

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((response) => {
      // 成功后的回调函数
      resolve(response.data)
    }, err => {
      // 失败后的回调函数
      reject(err)
    })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
      // 请求时的一些参数
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      // 成功后的回调函数
      resolve(response.data)
    }, err => {
      // 失败后的回调函数
      reject(err)
    })
  })
}
