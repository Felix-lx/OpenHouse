// 路由文件
import React from 'react'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
//导入页面组件
import Home from './pages/Home'
import CityList from './pages/City'
export default function App() {
  return (
    <Router>
      <div className="App"></div>
      {/* 路由重定向 */}
      <Route exact path="/" render={()=> <Redirect to="/home" />}></Route>
      {/* 路由规则 */}
      <Route path="/home" component={Home}></Route>
      <Route path="/city" component={CityList}></Route>
    </Router>
  )
}
