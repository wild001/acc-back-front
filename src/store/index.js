import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore('menu', () =>{
    // 是否打开菜单
    const isCollapse = ref(false)

    const selectMenu = ref([])

    const useCollapse = () =>{
        isCollapse = !isCollapse
    }

    return{
        isCollapse,
        selectMenu,
        useCollapse
    }
})