
import { AppstoreOutlined, HomeOutlined, ScheduleOutlined, FormOutlined, TeamOutlined, UserOutlined, CloseSquareOutlined } from '@ant-design/icons-vue';
import type { MenuProps } from 'ant-design-vue';


export function useMenu() {

  const items = ref<MenuProps['items']>([
    {
      key: 'homel',
      icon: () => h(HomeOutlined),
      label: 'Agence',
      title: 'Agence',
      children: [
        {
          type: 'group',
          label: 'undefined',

        },
      ]
    },
    {
      key: 'app1',
      icon: () => h(ScheduleOutlined,),
      label: 'Projetos',
      title: 'Projetos',
      children: [
        {
          type: 'group',
          label: 'undefined',

        },
      ]
    },
    {
      key: 'sub1',
      icon: () => h(FormOutlined),
      label: 'Administrativo',
      title: 'Administrativo',
      children: [
        {
          type: 'group',
          label: 'undefined',
        },
      ]
    },
    {
      key: 'app2',
      icon: () => h(TeamOutlined),
      label: 'Comercial',
      title: 'Comercial',
      children: [
        {
          type: 'group',
          label: 'undefined',
        },
      ]
    },
    {
      key: 'app3',
      icon: () => h(AppstoreOutlined),
      label: 'Financeiro',
      title: 'Financeiro',
      children: [
        {
          type: 'group',
          label: 'undefined',

        },
      ]
    },
    {
      key: 'app4',
      icon: () => h(UserOutlined),
      label: 'Usuário',
      title: 'Usuário',
      children: [
        {
          type: 'group',
          label: 'undefined',

        },
      ]
    },
    {
      key: 'app5',
      icon: () => h(CloseSquareOutlined),
      label: 'Salir',
      title: 'Salir',
    },


  ]);

  return { items }
}
