export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/self/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        // iconPath: 'assets/images/tabbar/home.png',
        // selectedIconPath: 'assets/images/tabbar/home-active.png'
      },
      {
        pagePath: 'pages/self/index',
        text: '个人'
      }
    ]
  }
})
