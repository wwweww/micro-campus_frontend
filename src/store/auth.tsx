import {createContext, PropsWithChildren, useEffect, useState} from "react"
import Taro from "@tarojs/taro"

type UserInfoType = {
  avatarUrl?: string,
  nickName?: string,
  gender?: number
}

interface AuthStateType {
  openid?: string,
  userInfo?: UserInfoType
}

interface AuthContextType {
  authState: AuthStateType,
  setAuthInfo: (openid: string) => void,
}

export const AuthContext = createContext<AuthContextType | null>(null);
const {Provider} = AuthContext;

const AuthProvider = ({children}: PropsWithChildren) => {
  const [authState, setAuthState] = useState<AuthStateType>({});
  const [openid, setOpenid] = useState<string>("");
  const [userInfoData, setUserInfoData] = useState<string>("");
  useEffect(()=>{
    let openid = Taro.getStorageSync("openid")
    if (openid === "") {
      Taro.login({
        success: function(res) {
          console.log(res)
        }
      })
    }
  }, [])

  useEffect(() => {
    let a = authState
    a.openid = openid;
    setAuthState(a)
  }, [openid]);

  useEffect(() => {
    let a = authState
    let jsonUserInfoData = JSON.parse(userInfoData)
    let _data: UserInfoType = {
      avatarUrl: jsonUserInfoData.avatarUrl,
      nickName: jsonUserInfoData.nickName,
      gender: jsonUserInfoData.gender
    }
    a.userInfo = _data;
    setAuthState(a);
  }, [userInfoData]);

  const login = () => {
    Taro.login({
      success: function(res) {
        console.log(res)
      }
    })
  }

  const setAuthInfo = () => {
    Taro.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        console.log(res.rawData)
        Taro.setStorageSync("userInfo", JSON.stringify(res.rawData))
        setUserInfoData(res.rawData)
      }
    })
    login();
  }

  return (
    <Provider
      value={{
        authState,
        setAuthInfo
      }}
    >
      {children}
    </Provider>
  )
}

export default AuthProvider;
