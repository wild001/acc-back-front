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
      <el-form ref="loginFormRef" :model="loginForm" style="max-width: 600px;" :rules="rules">
        <el-form-item prop="userName">
          <el-input v-model="loginForm.userName" placeholder="手机号" prefix-icon="Avatar" />
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input v-model="loginForm.passWord" type="password" placeholder="密码" prefix-icon="Lock" />
        </el-form-item>
        <el-form-item v-if="formType" prop="validCode">
          <el-input v-model="loginForm.validCode" placeholder="验证码" prefix-icon="Lock">
            <template #append>
              <span @click="countdownChange">{{ countDown.validText }}</span>
            </template>
          </el-input>
        </el-form-item>
        <!-- 提交按钮 -->
        <el-form-item>
          <el-button type="primary" :style="{ width: '100%' }" @click="submitForm(loginFormRef)">
            {{ formType ? '注册账号' : '登录' }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

  </el-row>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { getCode, userAuthentication, login } from '../../api/index'
import { Avatar, Lock, } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';

const imgUrl = new URL('../../../public/login-head.png', import.meta.url).href
const loginFormRef = ref()
const router = useRouter()

// 表单数据
const loginForm = reactive({
  userName: '',
  passWord: '',
  validCode: ''
})

// 切换表单 ： 0-登录页 1-注册页
const formType = ref(0)

/**
 * 账号校验规则
 */
const validateUser = (rule, value, callback) => {
  // 账号不能为空
  if (value === '') {
    callback(new Error('请输入账号'))
  } else {
    const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
    phoneReg.test(value) ? callback() : callback(new Error('请输入正确的手机号格式'))
  }

}

/**
 * 密码校验规则
 */
const validatePwd = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    const pwdReg = /^[a-zA-Z0-9_-]{4,16}$/
    pwdReg.test(value) ? callback() : callback(new Error('密码格式不正确，需要4到16位字符'))
  }
}

// 表单校验
const rules = reactive({
  userName: [
    {
      validator: validateUser,
      trigger: 'blur'
    }
  ],
  passWord: [{
    validator: validatePwd,
    trigger: 'blur'
  }]
})


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
let flag = false            // 发送状态
const countdownChange = () => {
  // 如果是已发送状态则不处理
  if (flag) return

  // 判断手机号是否正确
  const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/
  if (!loginForm.userName || !phoneReg.test(loginForm.userName)) {
    return ElMessage({
      message: '请检查手机号是否正确',
      type: 'error',
    })
  }

  // 倒计时
  const timeId = setInterval(() => {
    // 如果小于0则返回
    if (countDown.time <= 0) {
      countDown.time = 60
      countDown.validText = "获取验证码"
      flag = false
      clearInterval(timeId)
    } else {
      // 倒计时显示
      countDown.time -= 1
      countDown.validText = `剩余${countDown.time}s`
    }
  }, 1000)
  flag = true
  // 验证码请求
  getCode({ tel: loginForm.userName }).then(({ data }) => {
    if (data.code === 10000) {
      ElMessage({
        message: '发送成功',
        type: 'success',
        plain: true,
      })
    }

  })
}


/**
 * 表单提交
 */
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      // 判断是注册页面还是登录页面 登录-0 注册-1
      if (formType.value) {
        // 注册逻辑
        userAuthentication(loginForm).then(({ data }) => {
          if (data.code === 10000) {
            ElMessage({
              message: '注册成功请登录！',
              type: 'success',
              plain: true,
            })
            // 跳转至登录页面
            formType.value = 0
          }
        })
      } else {
        // 登录逻辑
        login(loginForm).then(({ data }) => {
          
          if (data.code === 10000) {
            ElMessage({
              message: '登录成功！欢迎使用',
              type: 'success',
              plain: true,
            })
            // 将用户信息缓存到浏览器
            localStorage.setItem('pz_token', data.data.token)
            localStorage.setItem('pz_userInfo', JSON.stringify(data.data.userInfo))

            // 跳转
            router.push('/')

          } else {
            ElMessage({
              message: '登录失败',
              type: 'error',
              plain: true,
            })
          }
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
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