<template>
  <el-menu
        :style="{width: '230px'}"
        active-text-color="#000fff"
        background-color="#c6e2ff"
        class="aside-container"
        default-active="2"
        text-color="#003263"
        @open="handleOpen"
        @close="handleClose"
        :collapse="store.isCollapse"
      >
      <p class="logo-lg">
        CC陪诊
      </p>

      <!-- 支部 -->
      <treeMenuVue :menuData="menuData" :index="1"></treeMenuVue>
       
      </el-menu>
</template>

<script setup>
import treeMenuVue from "./treeMenu.vue"
import {useRouter} from 'vue-router'
import {reactive, ref, } from 'vue'

import {useStore} from '../store/index'

const store = useStore()


const router = useRouter();
const menuData = reactive(router.options.routes[0].children);

const handleOpen  = () =>{

}

const handleClose = () =>{

}
</script>

<style scoped lang="less">
.aside-container{
    height: 100%;
    .logo-lg{
        font-size: 22px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: #003163da;
        font-weight: 600;
    }
    .el-aside{
        width: 230px;
    }
}
</style>