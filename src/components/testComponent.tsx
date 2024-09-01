import {useContext, useState} from "react";
import taro from "@tarojs/taro";
import Taro from "@tarojs/taro";
import {Button, View} from "@tarojs/components";
import {AuthContext} from "../store/auth";

export default function TestComponent() {
  const [conter, setConter] = useState(0)

  const {setAuthInfo} = useContext(AuthContext)!;

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
  const setAuthInfoTest = () => {
    setAuthInfo("123")
  }
  return (
    <View className="index px-2">
      <View>conter: {conter}</View>
      <Button onClick={increment}>+</Button>
      <Button onClick={decrement}>-</Button>
      <Button onClick={loginWx}>微信登录</Button>
      <Button onClick={getProfile}>获取授权</Button>
      <button onClick={setAuthInfoTest}>测试用户</button>
    </View>
  )
}
