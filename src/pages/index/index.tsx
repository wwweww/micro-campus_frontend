import taro from "@tarojs/taro"
import {Button, View, Text} from "@tarojs/components"
import {useState} from "react"
import Taro from "@tarojs/taro";

const Index = () => {
  const [conter, setConter] = useState(0)
  const increment = () => {
    setConter(conter + 1)
  }
  const decrement = () => {
    setConter(conter - 1)
  }
  const loginWx = () => {
    taro.login({
      success: (res) => {
        console.log(res)
      }
    })
  }
  const getProfile = () => {
    Taro.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        console.log(res)
      }
    })
  }
  return (
    <View className="index px-2">
      <View>conter: {conter}</View>
      <Button onClick={increment}>+</Button>
      <Button onClick={decrement}>-</Button>
      <Button onClick={loginWx}>微信登录</Button>
      <Button onClick={getProfile}>获取授权</Button>
    </View>
  )
}

export default Index;
