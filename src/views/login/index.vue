<template>
  <el-row class="login-container" justify="center" :align="'middle'">
    <el-card style="max-width: 480px;">
      <template #header>
        <div class="card-header">
          <img :src="imgUrl" alt="">
        </div>
      </template>
      <div class="jump-link">
        <el-link type="primary" @click="handleChange">{{ formType ? '返回登录' : '注册账号' }}</el-link>
      </div>
      <!-- 表单 -->
      <el-form :model="loginForm" label-width="120px">
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" placeholder="手机号" prefix-icon="Avatar" />
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input v-model="loginForm.passWord" type="password" placeholder="密码" prefix-icon="Lock" />
        </el-form-item>
        <el-form-item v-if="formType" prop="validCode">
          <el-input v-model="loginForm.validCode" placeholder="验证码" prefix-icon="Lock" />
          <template #append>
            <span @click="countdownChange">{{ }}</span>
          </template>
        </el-form-item>
      </el-form>
    </el-card>

  </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue';


const imgUrl = new URL('../../../public/login-head.png', import.meta.url).href


// 表单数据
const loginForm = reactive({
  userName: '',
  passWord: '',
  validCode: ''
})

// 切换表单 ： 0-登录页 1-注册页
const formType = ref(0)


/**
 * 点击切换去注册
 */
const handleChange = () => {
  formType.value = formType.value ? 0 : 1
}


// 验证码信息
const countDown = reactive({
  validText: "获取验证码",
  time: 60
})

/**
 * 获取验证码数值
 */
const countdownChange = () => {
  setInterval(() => {
    // 如果小于0则返回
    if (countDown.time <= 0) {
      
    } else {
      // 倒计时显示
      countDown.time -= 1
      countDown.validText = `剩余${countDown.time}s`
    }


  }, 1000)
}


</script>

<style lang="less" scoped>
:deep(.el-card__header) {
  padding: 0
}

.login-container {
  height: 100%;

  .card-header {
    background-color: #899fe1;

    img {
      width: 430px;
    }
  }

  .jump-link {
    text-align: right;
    margin-bottom: 10px;
  }
}
</style>