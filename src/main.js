import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入全局样式表
import './assets/css/golbel.css'
// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入字体图标库
import ('../src/assets/font/iconfont.css')
Vue.config.productionTip = false
// 引入富文本编辑器
import QuillEditor from 'vue-quill-editor'
// 导入样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme
// 注册组件
Vue.use(QuillEditor)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
