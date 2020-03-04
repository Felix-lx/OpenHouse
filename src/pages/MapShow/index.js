import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import './index.scss'

export default class Map extends React.Component {
  componentDidMount() {
    var map = new window.BMap.Map("container")
    // 创建地图实例  BMap报错：加一个window
    var point = new window.BMap.Point(121.48023738884737, 31.236304654494646)
    // 创建点坐标  参数一是精度，参数二是纬度
    map.centerAndZoom(point, 15)
    // 初始化地图   参数一设置中心点坐标，参数二地图缩放级别 
  }
  render() {
    return (
      <div className="map">
        <div className="nav-bar">
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => console.log('onLeftClick')}
          >城市选择</NavBar>
        </div>
        <div id="container"></div>
      </div>
    )  
  }
}