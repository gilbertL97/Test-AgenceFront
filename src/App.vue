<script setup lang="ts">
import ptBr from 'ant-design-vue/es/locale/pt_BR'
import ConsultComponent from './components/consultComponent.vue';
import RelatoriosPanel from './components/relatoriosPanel..vue';
import { useFetch } from './composable/useFetch';
import { useMenu } from './composable/useMenu';
import type { Consultor, UserData } from './types/types';

const { items } = useMenu()
const { loading, fetchData } = useFetch('/consultors');
const consultors = ref<Consultor[]>([]);
const relatorias = ref<UserData[]>();
const value1 = ref('consultor');
const action = ref('');

const getUrlByActions = (action: string) => {
  switch (action) {
    case 'relatorio':
      return '/relatoria';
    case 'grafico':
      return '/graph';
    case 'pizza':
      return '/pie';
  }
};


const getActions = async (payload: { action: string; consultors: string[]; dateRange: string[]; }) => {
  action.value = payload.action;
  const url = getUrlByActions(payload.action);
  relatorias.value = await fetchData(url, {
    idUsuarios: payload.consultors,
    startDate: payload.dateRange[0],
    endDate: payload.dateRange[1],
  });

};
onMounted(async () => {
  consultors.value = await fetchData<Consultor[]>() || [];
});
</script>

<template>
  <a-config-provider :locale="ptBr">
    <div class="mx-10 mt-4">
      <a-menu mode="horizontal" :items="items" />
      <div class="mt-4">
        <a-radio-group v-model:value="value1">
          <a-radio-button value="clientes">Cliente</a-radio-button>
          <a-radio-button value="consultor">Consultor</a-radio-button>
        </a-radio-group>
      </div>
      <div class="my-4">
        <ConsultComponent v-if="value1 === 'consultor'" :is-loading="loading" :data="consultors ?? []"
          @action="getActions" />
      </div>
      <div class="my-4">
        <RelatoriosPanel :isloading="loading" :data="relatorias ?? []" />
      </div>
    </div>
  </a-config-provider>
</template>

<style scoped></style>
