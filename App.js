import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AppRoutes from './components/Navigation'

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#fff7ed" barStyle="light-content" />
      <AppRoutes />
    </NavigationContainer>
  )
}
