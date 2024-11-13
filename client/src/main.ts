import { createApp } from 'vue'

import App from './App.vue'
import { ImgUtil } from './utils/imgUtil'

import './style.css'

ImgUtil.init() // 将本地图片导入storage内存中

createApp(App).mount('#app')
