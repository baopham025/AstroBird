import { useCallback, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen'

import { Home } from './src/screens/Home'

export default function App() {
  const SplashScreenHide = useCallback(async () => {
    await SplashScreen.hideAsync()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      SplashScreenHide()
    }, 1000)
  }, [])

  return (
    <>
      <StatusBar hidden={true} />
      <Home />
    </>
  )
}
