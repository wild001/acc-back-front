<template>
  <h1>admin</h1>
</template>

<script setup>
import { reactive , onMounted} from 'vue';
import { authAdmin , } from '../../../api';

const paginationData = reactive({
  pagName: 1,
  pageSize: 10
})

onMounted(() => {
  authAdmin(paginationData).then(({data}) =>{
    console.log('authAdmin');
    
  })
});
</script>

<style>

</style>