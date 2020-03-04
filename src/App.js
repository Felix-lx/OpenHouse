// 路由文件
import React from 'react'
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
//导入页面组件
import Home from './pages/Home'
import CityList from './pages/CityList'
import MapShow from './pages/MapShow'
import Search from './pages/Search'
export default function App() {
  return (
    <Router>
      <div className="App">
        {/* 路由重定向 */}
        <Route exact path="/" render={()=> <Redirect to="/home" />}></Route>
        {/* 路由规则 */}
        <Route path="/home" component={Home}></Route>
        <Route path="/citylist" component={CityList}></Route>
        <Route path="/map" component={MapShow}></Route>
        <Route path="/search" component={Search}></Route>
      </div>
    </Router>
  )
}
