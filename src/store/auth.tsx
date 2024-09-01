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
  const [userInfoData, setUserInfoData] = useState({});
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
    if (openid === "") {
      return
    }
    let a = authState
    a.openid = openid;
    setAuthState(a)
  }, [openid]);

  useEffect(() => {
    if (userInfoData === "") {
      return
    }
    let a = authState
    let jsonUserInfoData: any = userInfoData
    a.userInfo = {
      avatarUrl: jsonUserInfoData.avatarUrl,
      nickName: jsonUserInfoData.nickName,
      gender: jsonUserInfoData.gender
    } as UserInfoType;
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
        console.log(res.userInfo)
        Taro.setStorageSync("userInfo", res.userInfo)
        setUserInfoData(res.userInfo)
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
