// 将获取定位信息的函数进行封装，方便后续进行调用
import axios from 'axios'

const getCurrentCity = (callback) => {
  // 思路：
  // 1 先从本地缓存中获取
  const currentCity = JSON.parse(localStorage.getItem('itcast_city'))
  // 2 判断缓存中是否有数据，有直接从缓存中拿。没有发请求获取
  if (!currentCity) {
    // 获取当前所在城市的名称
    var myCity = new window.BMap.LocalCity()
    let cityName
    // 问题：此处如果是使用function，那就存在this的指向问题，采用箭头函数，就不存在这个问题了
    myCity.get(async result => {
      cityName = result.name
      // console.log(result)
      const res = await axios.get('http://localhost:8080/area/info',{
        params:{
          name:cityName
        }
      })
      // console.log(res)
      const { body } = res.data
      localStorage.setItem('itcast_city',JSON.stringify(body))
      // 问题：需要将body传出去，可是body是发送请求得到的，是异步的，外面return currentCity是同步的，所以利用回调函数将body数据传出去，其他方式：利用promise可以获取
      callback(body)
    })
  } else {
    callback(currentCity)
  }
  // 缓存中有位置信息直接利用回调函数传出去，缓存中没有就发请求获取之后传出去
}

export {getCurrentCity}