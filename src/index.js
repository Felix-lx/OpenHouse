// 项目的入口文件
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './assets/fonts/iconfont.css'
// 可视区域渲染的样式文件
import 'react-virtualized/styles.css'
// antd组件的样式文件
import 'antd-mobile/dist/antd-mobile.css'
// 自己的样式文件写在后面，才能覆盖前面的
import './index.css'
import axios from 'axios'
axios.defaults.baseURL = 'https://api.example.com'

ReactDOM.render(<App />, document.getElementById('root'))

