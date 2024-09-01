import { Component, PropsWithChildren } from 'react'
import { Provider } from 'mobx-react'

import counterStore from './store/counter'

import './app.less'
import RootLayout from "./components/layout/RootLayout";
import AuthProvider from "./store/auth";

const store = {
  counterStore
}


class App extends Component<PropsWithChildren> {
  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  // this.props.children 就是要渲染的页面
  render () {
    return (
      <AuthProvider>
        <RootLayout>
          <Provider store={store}>
            {this.props.children}
          </Provider>
        </RootLayout>
      </AuthProvider>
    )
  }
}

export default App
