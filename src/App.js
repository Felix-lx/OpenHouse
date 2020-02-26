import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
//导入页面组件
import Home from './pages/Home'
import CityList from './pages/City'
export default function App() {
  return (
    <Router>
      <div className="App"></div>
      {/* 路由规则 */}
      <Route path="/home" component={Home}></Route>
      <Route path="/city" component={CityList}></Route>

    </Router>
  )
}
