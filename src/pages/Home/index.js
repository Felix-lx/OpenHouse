import React from 'react'
import {Route} from 'react-router-dom'
//导入tabBar组件
import { TabBar } from 'antd-mobile'
// 引入子路由
import Index from '../Index'
import HouseList from '../HouseList'
import News from '../News'
import Profile from '../Profile'
export default class Home extends React.Component {
  state = {
    //指定高亮
    selectedTab: 'blueTab',
    //是否隐藏tabBar
    hidden: false,
    //是否全屏显示
    fullScreen: true,
  }

  render() {
    console.log(this.props)
    return (
      <div>
        {/* 变化的上半部分 */}
        {/* 注意：子路由的path以父路由开头 */}
        <Route path="/home/index" component={Index}></Route>
        <Route path="/home/houselist" component={HouseList}></Route>
        <Route path="/home/news" component={News}></Route>
        <Route path="/home/profile" component={Profile}></Route>
        {/* 不变的底部 */}
        <div style={this.state.fullScreen ? { position: 'fixed', height: '100%', width: '100%', top: 0 } : { height: 400 }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#21B97A"
          barTintColor="white"
          hidden={this.state.hidden}
        >
          <TabBar.Item
            title="首页"
            key="Index"
            icon={<div style={{
              width: '22px',
              height: '22px'}}
              className="iconfont icon-ind"
            />
            }
            selectedIcon={<div style={{
              width: '22px',
              height: '22px'}}
              className="iconfont icon-ind"
            />
            }
            selected={this.state.selectedTab === 'blueTab'}
            onPress={() => {
              //切换路由
              this.props.history.push('/home/index')
              this.setState({
                selectedTab: 'blueTab',
              });
            }}
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px'}}
                className="iconfont icon-findHouse"
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px'}}
                className="iconfont icon-findHouse"
              />
            }
            title="找房"
            key="zhaofang"
            selected={this.state.selectedTab === 'redTab'}
            onPress={() => {
              //切换路由
              this.props.history.push('/home/houselist')
              this.setState({
                selectedTab: 'redTab',
              });
            }}
          >
          </TabBar.Item>
          <TabBar.Item
            icon={
              <div style={{
                width: '22px',
                height: '22px'}}
                className="iconfont icon-infom"
              />
            }
            selectedIcon={
              <div style={{
                width: '22px',
                height: '22px'}}
                className="iconfont icon-infom"
              />
            }
            title="资讯"
            key="zixun"
            selected={this.state.selectedTab === 'greenTab'}
            onPress={() => {
              //切换路由
              this.props.history.push('/home/news')
              this.setState({
                selectedTab: 'greenTab',
              });
            }}
          >
          </TabBar.Item>
          <TabBar.Item
            icon={              
              <div style={{
                width: '22px',
                height: '22px'}}
                className="iconfont icon-my"
              />
            }
            selectedIcon={              
              <div style={{
                width: '22px',
                height: '22px'}}
                className="iconfont icon-my"
              />
            }
            title="我的"
            key="Profile"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              //切换路由
              this.props.history.push('/home/profile')
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
          </TabBar.Item>
        </TabBar>
        </div>
      </div>
    )
  }
}