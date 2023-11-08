import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import AppRoutes from './components/Navigation'
import initDB from './Database'

export default function App() {
  useEffect(() => {
    initDB()
  }, [])
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#fff7ed" barStyle="light-content" />
      <AppRoutes />
    </NavigationContainer>
  )
}
