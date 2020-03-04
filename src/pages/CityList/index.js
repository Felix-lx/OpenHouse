import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import './index.scss'
import axios from 'axios'
import {getCurrentCity} from '../../utils'
import {List, AutoSizer} from 'react-virtualized'

// 处理城市列表的数据，按照字母进行升序排列
function formatCityList(list) {
  const cityList = {}
  list.forEach(item => {
    const firstLetter = item.short.slice(0,1)
    // in语法：如果这个字母作为键名存在于cityList中，就往后push进去，否则就重新创建一个新键值对，firstList作为键名，值是一个数组，里面的内容是item
    if (firstLetter in cityList) {
      // 中括号语法
      cityList[firstLetter].push(item)
    } else {
      cityList[firstLetter] = [item]
    }
  })
  const cityIndex = Object.keys(cityList).sort()
  return {cityList,cityIndex}
}
// 处理城市列表的索引数据，
function formatCategoryName(name) {
  switch(name){
    case "#":
      return '当前定位'
    case '热':
      return '热门城市'
    default:
      return name.toUpperCase()
  }
}

/**
 * 分类名称高度
 */
const CATE_NAME_HEIGHT = 36
/**
 * 城市名称高度
 */
const CITY_NAME_HEIGHT = 50

export default class CityList extends React.Component {
  state = {
    // 城市列表
    cityList:{},
    // 右侧索引
    cityIndex:[],
    // 索引高亮
    activeIndex:0
  }
  componentDidMount() {
    this.getCityList()
  }

  // 获取城市列表、城市列表索引的数据以及对数据进行处理
  async getCityList() {
    console.log(this)
    // 获取城市列表的数据
    const res = await axios.get("http://localhost:8080/area/city",{
      params:{
        level:1
      }
    })
    // 热门城市的数据
    const hotRes = await axios.get("http://localhost:8080/area/hot")
    const {status,body} = res.data
    if(status===200 && hotRes.data.status===200) {
      // 按首字母将数据分类处理
      const {cityList,cityIndex} = formatCityList(body)
      // 将热门数据插入到数据中
      cityList['热'] = hotRes.data.body
      cityIndex.unshift('热')
      // 将当前位置信息插入到数据中
      getCurrentCity(function(data){
        // console.log("通过回调函数拿到数据",data)
        cityList['#'] = [data]
        cityIndex.unshift('#')
      })
      // 注意：setState在这里是同步的，因为他是在异步操作里面
      this.setState({
        cityList,cityIndex
      })
      console.log(this.state.cityList,this.state.cityIndex)
    }
    // 调用List组件的measureAllRows方法，用于预先计算一次页面所有行的长度，以便在点击右侧索引时.scrollToRow(index)方法能准确定位到对应的位置
    this.listRef.current.measureAllRows()
  }

  // 可视区域渲染的方法,在https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md示例中
  rowRenderer = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // 组件是否正在滚动
    isVisible, // 当前行在list中是否可见（不是预渲染的行信息）
    style, // Style object to be applied to row (to position it)
  }) => {
    // 注意：rowRenderer是list组件调用的，这是rowRenderer方法中的this是undefined。所以变成箭头函数
    const {cityList, cityIndex} = this.state
    // cityIndex[index]是根据下标拿数组中的数据，cityList[cityIndex[index]]是根据键名，利用中括号语法在cityList中拿数据
    const currentCityList = cityList[cityIndex[index]]
    return (
      <div className="city" key={key} style={style}>
        <div className="title">{formatCategoryName(cityIndex[index])}</div>
        {
          currentCityList.map(item => (
            <div className="name" key={item.value}>{item.label}</div>
          ))
        }
      </div>
    )
  }

  // 动态渲染List组件的行高
  calcRowHeight = ({index}) => {
    const {cityList, cityIndex} = this.state
    const currentCityList = cityList[cityIndex[index]]
    return CATE_NAME_HEIGHT + CITY_NAME_HEIGHT * currentCityList.length
  }

  // 渲染右侧索引结构
  renderCityIndex() {
    const {cityIndex,activeIndex} = this.state
    // 写成箭头函数的形式是为了保证this的指向
    const handleClick = index => {
      this.setState({activeIndex:index})
      this.listRef.current.scrollToRow(index)
    }
    return cityIndex.map( (item, index)=> (
      <li 
        className="city-index-item" 
        key={item} 
        // 外层箭头函数的目的是为了调用里面的函数
        onClick={() => handleClick(index)}>
        <span className={activeIndex === index ? "index-active" : ""} >{item.toUpperCase()}</span>
      </li>
    ))
  }
  // 滚动城市列表，右侧索引对应高亮
  // onRowsRendered	使用有关刚刚渲染的行切片的信息调用回调
  // overscanStartIndex 预渲染项的其实索引；overscanStopIndex 预渲染项的结束索引 
  // startIndex 开始索引 stopIndex：结束索引
  onRowsRendered = ({ overscanStartIndex, overscanStopIndex, startIndex, stopIndex }) => {
    // console.log(overscanStartIndex, overscanStopIndex, startIndex, stopIndex)
    // 优化
    if (this.state.activeIndex !== startIndex) {
      this.setState({activeIndex: startIndex})
    }
  }
  // 创建一个ref（非受控组件）
  listRef = React.createRef()

  render() {
    return (
      <div className="city-list"> 
        <div className="nav-bar">
          <NavBar
            mode="light"
            icon={<Icon type="left" />}
            onLeftClick={() => this.props.history.go(-1) }
          >城市选择</NavBar>
        </div>
        <ul className="city-index">
          {this.renderCityIndex()}
        </ul>
        <AutoSizer>
          {({height, width}) => (
            <List
              height={height-45}
              // 将每一类设置为一行
              rowCount={this.state.cityIndex.length}
              // 分类名称高度+城市名称高度*数量动态渲染高度
              rowHeight={this.calcRowHeight}
              rowRenderer={this.rowRenderer}
              width={width}
              onRowsRendered={this.onRowsRendered}
              ref={this.listRef}
              // 让可视区域在开始的地方显示
              scrollToAlignment="start"
            />
          )}
        </AutoSizer>
      </div>
    )
  }
}