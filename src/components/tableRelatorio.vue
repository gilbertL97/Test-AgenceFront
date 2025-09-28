<script setup lang="ts">
defineProps<{
  data: any[];
}>()
</script>
<template>
  <div>
   <a-table :columns="columns" :data-source="data" bordered>
    <template #title>Header</template>    

    <template #footer>Footer</template>
  </a-table>
  </div>
</template>



<style scoped>

</style>