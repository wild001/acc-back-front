import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore('menu', () =>{
    // 是否打开菜单
    const isCollapse = ref(false)

    const selectMenu = ref([])

    const useCollapse = () =>{
        isCollapse.value = !isCollapse.value
    }
    /**
     * 面包屑定位
     */
    const addMenu = (payload) =>{
        if (selectMenu.value.findIndex(item => item.path === payload.path) === -1) {
            selectMenu.value.push(payload)
        }
    }

    /**
     * 面包屑tag关闭方法
     */
    const closeMenu = (item) =>{
        // ? 找到点击数据的索引
        const index = selectMenu.value.findIndex(val => val.name === item.name)
        selectMenu.value.splice(index,1)
    }

    return{
        isCollapse,
        selectMenu,
        useCollapse,
        addMenu,
        closeMenu
    }
})