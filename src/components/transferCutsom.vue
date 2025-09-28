<script lang="ts" setup>

import type { Consultor } from '@/types/types';
const emits = defineEmits(['SelectedConsultors']);
type DataTransfer = {
  // Se usa para que los datos tengan el tipado que requiere el componente Transfer
  key: string;
  name: string;
};

// Estado reactivo para almacenar los datos transformados que se mostrarán en el Transfer
const dataTransfer = ref<DataTransfer[]>([]);

// Estado reactivo para almacenar las claves (keys) de los elementos seleccionados en la tabla derecha
const targetKeys = ref<string[]>([]);

// Columnas de la tabla que se mostrarán en ambos paneles del Transfer
const tableColumns = [
  {
    dataIndex: 'name',
    title: 'Consultor',
  },

];

// Props del componente
const props = defineProps<{
  isLoading: boolean;
  data: Consultor[];
}>();

// Manejador del evento @change del Transfer
const onChange = (nextTargetKeys: string[]) => {
  emits('SelectedConsultors', nextTargetKeys.map(Number)); // Logs para depuración
};

// Función personalizada para filtrar elementos en el Transfer
const customFilterOption = (inputValue: string, item: DataTransfer): boolean => {
  return item.name?.toLowerCase().includes(inputValue.toLowerCase())
};

// Función para obtener la configuración de selección de filas en la tabla
const getRowSelection = ({
  disabled,
  selectedKeys,
  onItemSelectAll,
  onItemSelect,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: Record<string, any>) => {
  return {
    // Propiedades del checkbox
    getCheckboxProps: (item: Record<string, string | boolean>) => ({
      disabled: disabled || item.disabled, // Deshabilita el checkbox si el elemento está deshabilitado
    }),
    // Selección masiva
    onSelectAll(
      selected: boolean,
      selectedRows: Record<string, string | boolean>[]
    ) {
      const treeSelectedKeys = selectedRows
        .filter((item) => !item.disabled) // Filtra elementos deshabilitados
        .map(({ key }) => key); // Extrae las claves de los elementos seleccionados
      onItemSelectAll(treeSelectedKeys, selected); // Marca/desmarca todos los elementos seleccionados
    },
    // Selección individual
    onSelect({ key }: Record<string, string>, selected: boolean) {
      onItemSelect(key, selected); // Marca/desmarca un elemento específico
    },
    // Claves seleccionadas actualmente
    selectedRowKeys: selectedKeys,
  };
};

// // Función para asignar las claves (keys) de los elementos seleccionados en la tabla derecha
// const assignTargetKeys = (data: number[]) => {
//   targetKeys.value = data.map((route) => route.toString()); // Convierte los IDs a strings y los asigna a targetKeys
// };

// Función para transformar los datos de entrada (Routes[]) en el formato requerido por el Transfer (DataTransfer[])
const transformData = (data: Consultor[]) => {
  dataTransfer.value = data.map((consul) => ({
    key: consul.co_usuario, // Asigna el id como key
    name: consul.no_usuario, // Asigna el nombre
  }));
};

// Observador para detectar cambios en props.data

watchEffect(() => transformData(props.data));
</script>
<template>
  <div>
    <a-transfer v-model:target-keys="targetKeys" :data-source="dataTransfer" :disabled="isLoading" show-search
      :filter-option="customFilterOption" :show-select-all="false" @change="onChange">
      <template #children="{
        filteredItems,
        selectedKeys,
        disabled: listDisabled,
        onItemSelectAll,
        onItemSelect,
      }">
        <a-table :row-selection="getRowSelection({
          disabled: listDisabled,
          selectedKeys,
          onItemSelectAll,
          onItemSelect,
        })
          " :pagination="{ pageSize: 5 }" :columns="tableColumns" :data-source="filteredItems" size="small"
          :style="{ pointerEvents: listDisabled ? 'none' : null }" :custom-row="({ key }: { key: string }) => ({
            onClick: () => {
              onItemSelect(key, !selectedKeys.includes(key));
            },
          })
            " />
      </template>n;
    </a-transfer>
  </div>
</template>
