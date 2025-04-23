<template>
    <template v-for="(item) in props.menuData" :key="`${props.index}-${item.meta.id}`">
        <!-- 没有子菜单 -->
        <el-menu-item 
        @click="handleClick(item, `${props.index}-${item.meta.id}`)"
        v-if="!item.children || item.children.length === 0" 
        :index="`${props.index}-${item.meta.id} `">
            <el-icon size="20">
                <component :is="item.meta.icon" />
            </el-icon>
            <span>{{ item.meta.name }}</span>
        </el-menu-item>

        <!-- 有子菜单 -->
        <el-sub-menu v-else :index="`${props.index}-${item.meta.id}`">
            <template #title>
                <el-icon size="20">
                    <component :is="item.meta.icon" />
                </el-icon>
                <span>{{ item.meta.name }}</span>
            </template>
            <tree-menu 
            :index="`${props.index}-${item.meta.id}`" 
            :menuData="item.children">{{ item.children }}</tree-menu>
        </el-sub-menu>
    </template>



</template>

<script setup>
import { useRouter } from 'vue-router';


const router = useRouter()
const props = defineProps(['menuData', 'index']);

/**
 * 点击事件
 */
const handleClick = (item, active) =>{
    
    router.push(item.meta.path)
    
}


</script>

<style></style>