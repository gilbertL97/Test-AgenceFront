import { createApp } from 'vue';
import router from './router'
import Antd from 'ant-design-vue';
import App from './App.vue';
import 'ant-design-vue/dist/reset.css';
import './style/index.css'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarController
} from 'chart.js'

ChartJS.register(Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  BarController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale)
const app = createApp(App);
app.use(router)
app.use(Antd).mount('#app')
