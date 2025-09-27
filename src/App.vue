<script setup lang="ts">
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
import { MenuProps } from 'ant-design-vue';
</script>

<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
</template>

<style scoped></style>
