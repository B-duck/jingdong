<template>
    <div class="wrapper">
        <img class="wrapper_img" src="http://www.dell-lee.com/imgs/vue3/user.png" />

        <div class="wrapper_input">
            <input class="content" placeholder="请输入手机号" v-model="username" />
        </div>

        <div class="wrapper_input">
            <input class="content" placeholder="请输入密码" v-model="password" />
        </div>

        <div class="wrapper_input">
            <input class="content" placeholder="确认密码" v-model="ensurement" />
        </div>
        <div class="wrapper_register" @click="handleRegister">注册</div>
        <div class="wrapper_link" @click="handle">已有账号去登陆</div>
        <Toast v-if="show" :message="toastMessage" />
    </div>

</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import Toast, { useToast } from '../../components/Toast'

// 注册相关逻辑
const useRegisterEffect = (showToast) => {
    const router = useRouter()
    const data = reactive({
        username: '',
        password: '',
        ensurement: ''
    })

    const handleRegister = async () => {
        try {
            const result = await post('/api/user/register', {
                username: data.username,
                password: data.password
            })
            if (result?.errno === 0) {
                router.push({ name: 'Login' })
            } else {
                showToast('注册失败')
            }
        } catch (e) {
            showToast('请求失败')
        }
    }

    const { username, password, ensurement } = toRefs(data)
    return { username, password, ensurement, handleRegister }
}


// 处理登陆跳转
const useLoginEffect = () => {
    const router = useRouter()
    const handle = () => {
        router.push({ name: 'Login' });
    }
    return { handle }
}
export default {
  name: 'Register',
  components: { Toast }, 
  setup () {
    // 获取路由实例
    const { show, toastMessage, showToast } = useToast()
    const { username, password, ensurement, handleRegister } = useRegisterEffect(showToast)
    const { handle } = useLoginEffect();
      return { username, password, ensurement, handleRegister, show, toastMessage, handle }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
    //通过绝对定位让其垂直居中
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);

    &_img {
        display: block;
        margin: 0 auto .4rem auto;
        width: .66rem;
        height: .66rem;
    }

    &_input {
        padding: 0 .16rem;
        height: .48rem;
        margin: 0 .4rem .16rem .4rem;
        background: #F9F9F9;
        border: 1px solid rgba(0, 0, 0, 0.10);
        border-radius: 6px;
        border-radius: 6px;

        .content {
            line-height: .48rem;
            width: 100%;
            border: none;
            outline: none;
            background: none;
            font-size: 16px;

            //加修饰符
            &::placeholder {
                color: rgba(0, 0, 0, 0.50);
            }
        }
    }

    &_register {
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

    &_link {
        text-align: center;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.50);
    }
}
</style>
