// 项目的入口文件
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './assets/fonts/iconfont.css'
import 'antd-mobile/dist/antd-mobile.css'
// 自己的样式文件写在后面，才能覆盖前面的
import './index.css'

ReactDOM.render(<App />, document.getElementById('root'))

