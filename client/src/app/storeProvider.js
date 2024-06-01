'use client'
import React from 'react'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '@/store/store.js'


const StoreProvider = ({children}) => {
  const storeRef = useRef()
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }
  return (
    <Provider store={storeRef.current}>{children}</Provider>
  )
}

export default StoreProvider;