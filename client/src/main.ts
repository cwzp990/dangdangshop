import { createApp } from 'vue'

import './style.css'
import App from './App.vue'
import { ImgUtil } from './utils/imgUtil'

ImgUtil.init() // 将本地图片导入storage内存中

createApp(App).mount('#app')
