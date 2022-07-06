<template>
    <div class="toast">
        {{message}}
    </div>
</template>

<script>
import { reactive } from 'vue'
export default {
    props:['message']
}

export const useToast = () => {
    const toastData = reactive({
        showToast: false,
        toastMessage: ''
    })

    const showToast = (message) => {
        toastData.showToast = true
        toastData.toastMessage = message
        // 三秒后消失
        setTimeout(() => {
            toastData.showToast = false
            toastData.toastMessage = ''
        }, 3000)
    }
    return { toastData, showToast }
}

</script>

<style lang="scss" scoped>
.toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, .35);
    padding: .1rem;
    border-radius: .05rem;
    color: #fff;
}
</style>
