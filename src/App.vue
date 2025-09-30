<script setup lang="ts">
import ptBr from 'ant-design-vue/es/locale/pt_BR'
import { useMenu } from './composable/useMenu';
const { items } = useMenu()
</script>
<template>
  <a-config-provider :locale="ptBr">
    <div class="flex flex-col min-h-svh">
      <div class="flex justify-between items-center mt-3 mx-5">
        <a-menu mode="horizontal" :items="items" />
        <router-link to="/" class=""><img src="/images/logoAgencejp.jpg" alt="Logo" class="menu-logo" /></router-link>
      </div>
      <router-view />
    </div>
  </a-config-provider>
</template>

<style scoped></style>
