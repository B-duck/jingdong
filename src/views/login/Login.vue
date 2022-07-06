<template>
  <div class="wrapper">
    <img class="wrapper_img" src="http://www.dell-lee.com/imgs/vue3/user.png" />
    <div class="wrapper_input">
      <input class="content" placeholder="请输入手机号" v-model="username" />
    </div>
    <div class="wrapper_input">
      <input class="content" placeholder="请输入密码" type="password" v-model="password" />
    </div>
    <div class="wrapper_login" @click="handleLogin">登录</div>
    <div class="wrapper_link" @click="handleRegister">立即注册</div>
    <Toast v-if="toastData.showToast" :message="toastData.toastMessage" />
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import Toast,{ useToast } from '../../components/Toast.vue'

export default {
  name: 'Login',
  components:{ Toast },
  setup () {
    // 获取路由实例
    const router = useRouter()
    const { toastData, showToast } = useToast()
    const data = reactive({
      username: '',
      password: ''
    })

    // 请求函数封装
    const handleLogin = async () => {
      // 解决网址有问题，抛出异常
      try {
        const result = await post('/api/user/login', {
          username: data.username,
          password: data.password
        })
        // 和result.data.errno的意思是一样的，但是比result.data.errno的容错性更高
        if (result?.errno === 0) {
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        } else {
          showToast('登录失败')
        }
      } catch (e) {
        showToast('请求失败')
      }
    }
    const handleRegister = () => {
      router.push({
        name: 'Register'
      })
    }

    //reative数据转成多个ref数据
    const { username, password }=toRefs(data)

    return { handleLogin, handleRegister, username, password, toastData }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  //通过绝对定位让其垂直居中
  position: absolute;
  top:50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &_img{
    display: block;
    margin: 0 auto .4rem auto;
    width:.66rem;
    height: .66rem;
  }
  &_input{
    padding: 0 .16rem;
    height: .48rem;
    margin: 0 .4rem .16rem .4rem;
    background: #F9F9F9;
    border: 1px solid rgba(0, 0, 0, 0.10);
    border-radius: 6px;
    border-radius: 6px;
    .content{
      line-height: .48rem;
      width: 100%;
      border: none;
      outline: none;
      background: none;
      font-size: 16px;
      //加修饰符
      &::placeholder{
        color: rgba(0, 0, 0, 0.50);
      }
    }
  }
  &_login{
    background: #0091FF;
    line-height: .48rem;
    font-size: .16rem;
    text-align: center;
    box-shadow: 0 .04rem .08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: .04rem;
    border-radius: .04rem;
    color: #fff;
    margin: .32rem .4rem .16rem .4rem;
  }
  &_link{
    text-align: center;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.50);
  }
}
</style>
