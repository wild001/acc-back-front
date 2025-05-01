<template>
    <div class="header-container">
        <div class="header-left flex-box">
            <!-- 左侧收缩按钮 -->
            <el-icon class="icon" size="20" @click="store.useCollapse">
                <Fold />
            </el-icon>

            <!-- 面包屑 -->
            <ul class="flex-box">
                <li v-for="(item, index) in selectMenu" :key="item.path" class="tab flex-box"
                    :class="{ isActived: route.path === item.path }">
                    <el-icon class="icon" size="14">
                        <component :is="item.icon" />
                    </el-icon>
                    <router-link :to="{ path: item.path }" class="text flex-box">
                        {{ item.name }}
                    </router-link>
                    <!-- 关闭按钮 -->
                    <el-icon class="icon close" size="14"
                    @click="closeTab(item, index)">
                        <Close />
                    </el-icon>
                </li>
            </ul>


        </div>
        <div class="header-right">
            <el-dropdown>
                <div class="el-dropdown-link flex-box">
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
                    <p class="user-name">admin</p>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>Action 1</el-dropdown-item>
                        <el-dropdown-item>Action 2</el-dropdown-item>
                        <el-dropdown-item>Action 3</el-dropdown-item>
                        <el-dropdown-item disabled>Action 4</el-dropdown-item>
                        <el-dropdown-item divided>Action 5</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '../store/index'
import { computed } from 'vue'


const store = useStore()
const route = useRoute()
const router = useRouter()

const selectMenu = computed(() => store.selectMenu);


/**
 * 点击关闭tag      -> 后移一位/前移一位
 */
const closeTab = (item, index) =>{
    store.closeMenu(item)
    // 判断删除的是否为当前的所选页面
    if (item.path !== route.path) {
        return
    }
    console.log(index, selectMenu.value);
    
    // 删除最后一页    -> 此时的index是原先的selectMenu中的index，因为此方法第一条已经删除所以不需要index+1
    if (index === selectMenu.value.length) {

        // 如果只有当前一页，则跳转至首页
        if (!selectMenu.value.length) {
            router.push('/')
        }else{
            // 非剩下当前一页则跳转至前一页
            
            router.push({
                path: selectMenu.value[index -1].path
            })
        }
        
    }else{
        // 删除非最后一页，则向后跳转一页
        router.push({
                path: selectMenu.value[index].path
            })

    }
    

    
    
}



</script>

<style lang="less" scoped>
.flex-box {
    display: flex;
    align-items: center;
    height: 100%
}

.header-container {
    .flex-box;
    justify-content: space-between;
    height: 100%;
    background-color: #fff;
    padding-right: 25px;

    .header-left {
        height: 100%;

        .icon {
            width: 30px;
            height: 100%;

            &:hover {
                background-color: #f5f5f5;
                cursor: pointer;
            }
        }

        .tab {
            padding: 0 10px;
            height: 100%;

            .text {
                margin: 0 2px;
            }

            .close {
                visibility: hidden;
            }

            &:hover {
                background-color: #f5f5f5;

                .close {
                    visibility: inherit;
                    cursor: pointer;
                    color: #333;
                }
            }

            &.isActived {
                color: #409eff;
                a{
                    color: #409eff;
                }
            }
        }

    }

    .header-right {
        .user-name {
            margin-left: 10px;
        }
    }

    a {
        height: 100%;
        color: #333;
        font-size: 15px;
    }
}
</style>