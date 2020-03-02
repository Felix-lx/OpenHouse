import React, { Component } from 'react'
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile'
import axios from 'axios'

// 导入图片
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'

// 导入样式文件
import "./index.scss"

// 导航菜单的代码优化
const menus = [
  { title:'整租', imgSrc:nav1, path:'/home/houselist' },
  { title:'合租', imgSrc:nav2, path:'/home/houselist' },
  { title:'地图找房', imgSrc:nav3, path:'/home/houselist' },
  { title:'去出租', imgSrc:nav4, path:'/home/houselist' },
]
export default class Index extends Component {
  state = {
    // 默认数据，因为没有图片，所以会报404的错误，如果data删掉，轮播图就不会自动播放了
    // 解决方式，在componentDidMount之前，data中无数据，不渲染轮播图，有数据之后再渲染
    swiper: [],
    imgHeight: 212,
    isLoaded:false,
    area:'AREA|88cff55c-aaa4-e2e0',
    groups:[],
    news:[]
  }
  componentDidMount() {
    this.getSwiper()
    this.getGroups()
    this.getNews()
  }

  // 获取轮播图图片的请求
  async getSwiper() {
    const res = await axios.get('http://localhost:8080/home/swiper')
    // console.log(res)
    const {status , body} = res.data
    if(status===200) {
      this.setState({
        swiper: body,
        isLoaded:true
      })
    }
  }
  // 渲染轮播图的方法
  renderSwiper() {
    if(!this.state.isLoaded) {
      return null
    }
    return (
      <Carousel
        autoplay
        infinite
        // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        // afterChange={index => console.log('slide to', index)}
      >
        {this.state.swiper.map(val => (
          <a
            key={val.id}
            href="http://www.alipay.com"
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
          >
            <img
              src={`http://localhost:8080${val.imgSrc}`}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }
  // 获取租房小组数据的请求
  async getGroups() {
    const res = await axios.get('http://localhost:8080/home/groups',{
      params: {
        area:this.state.area
      }
    })
    const {status , body} = res.data
    if(status===200) {
      this.setState({
        groups: body
      })
    }
  }
  // 获取新闻资讯数据的请求
  async getNews() {
    const res = await axios.get('http://localhost:8080/home/news',{
      params: {
        area:this.state.area
      }
    })
    const {status , body} = res.data
    if(status===200) {
      this.setState({
        news: body
      })
    }
  }
  // 渲染最新资讯
  renderNews() {
  return this.state.news.map(item => (
    <div className="news-item" key={item.id}>
      <div className="imgwrap">
        <img
          className="img"
          src={`http://localhost:8080${item.imgSrc}`}
          alt=""
        />
      </div>
      <Flex className="content" direction="column" justify="between">
        <h3 className="title">{item.title}</h3>
        <Flex className="info" justify="between">
          <span>{item.from}</span>
          <span>{item.date}</span>
        </Flex>
      </Flex>
    </div>
  ))
}
  render() {
    return (
      <div className="index">
        {/* 轮播图 */}
        {this.renderSwiper()}
        {/* 导航 */}
        <Flex className="menus">
          {menus.map(item => (
            <Flex.Item key={item.title} onClick={()=>{this.props.history.push(item.path)}}>
              <img src={item.imgSrc} alt=""/>
              <h3>{item.title}</h3>
            </Flex.Item>
          ))}
        </Flex>
        {/* 租房小组 */}
        <div className="groups">
          <Flex className="groups-title" justify="between">
            <h3>租房小组</h3>
            <span>更多</span>
          </Flex>
          {/* rendeItem 属性：用来 自定义 每一个单元格中的结构 */}
          <Grid
            data={this.state.groups}
            columnNum={2}
            square={false}
            activeStyle={false}
            hasLine={false}
            // 自定义每一个宫格中的结构
            renderItem={item => (
              <Flex className="grid-item" justify="between">
                <div className="desc">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <img src={`http://localhost:8080${item.imgSrc}`} alt="" />
              </Flex>
            )}
          />
        </div>
        {/* 最新资讯 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
      </div>
    )
  }
}
