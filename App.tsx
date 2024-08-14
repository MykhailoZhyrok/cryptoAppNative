import { View, Text } from 'react-native'
import React from 'react'
import Main from './src/main'
import { Provider } from 'react-redux'
import store from './src/store/store'

export default function App() {
  return (
    <Provider store={store}>
      <Main></Main>
    </Provider>
  )
}