import React from 'react'
import {Route} from 'react-router-dom'
// 导入tabBar组件
import { TabBar } from 'antd-mobile'
// 引入子路由
import Index from '../Index'
import HouseList from '../HouseList'
import News from '../News'
import Profile from '../Profile'
// 导入样式文件
import './index.css'

// tabBars的数据是静态的，所以不需要卸载state中，还可以减轻state
const tabBars = [
  { title:"首页", key:"Index", icon:"icon-ind", selected:"/home"},
  { title:"找房", key:"HouseList", icon:"icon-findHouse", selected:"/home/houselist"},
  { title:"资讯", key:"News", icon:"icon-infom", selected:"/home/news"},
  { title:"我的", key:"Profile", icon:"icon-my", selected:"/home/profile"}
]
export default class Home extends React.Component {
  state = {
    //指定高亮,利用url中pathname的唯一性，动态渲染selected，确保刷新之后高亮的内容还是本路由的标签
    selectedTab: this.props.location.pathname,
  }
  // 如果路由地址发生改变，会触发组件的更新阶段，对应的高亮也会发生改变
  componentDidUpdate(prevProps) {
    if( prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname
      })
    }
  }
  render() {
    // console.log(this.props)
    return (
      <div className="home">
        {/* 变化的上半部分 */}
        {/* 注意：子路由的path以父路由开头,首页作为子路由可以使用和父路由的path保持一致，这是不冲突的 */}
        <Route path="/home" exact component={Index}></Route>
        <Route path="/home/houselist" component={HouseList}></Route>
        <Route path="/home/news" component={News}></Route>
        <Route path="/home/profile" component={Profile}></Route>
        {/* 不变的底部 
        此处插件中原油数据height100%，会导致盖在路由内容的上方，导致路由内容无法点击到，所以要去掉
        */}
        <div style={{ position: 'fixed', width: '100%', bottom: 0 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#21B97A"
          barTintColor="white"
        >
          {/* 遍历tabBars中的数据，将其动态渲染生成，做到代码优化 */}
          {
            tabBars.map(item => (
              <TabBar.Item
                title={item.title}
                key={item.key}
                icon={<div className={`iconfont ${item.icon}`} />}
                selectedIcon={<div className={`iconfont ${item.icon}`} />}
                selected={this.state.selectedTab === item.selected}
                onPress={() => {
                  //切换路由
                  this.props.history.push(item.selected)
                  // 添加了componentDidUpdate钩子函数，这段代码可以省略，因为切换路由以后会触发钩子函数，钩子函数中已经有selectedTab设置的代码了，所以重复了，可以去除
                  // this.setState({
                  //   selectedTab: item.selected,
                  // })
                }}
              >
              </TabBar.Item>
            ))
          }
        </TabBar>
        </div>
      </div>
    )
  }
}