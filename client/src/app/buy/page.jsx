import React from 'react'
import Propcard from "@/components/Propcard.jsx"
import Searchbar from "@/components/Searchbar.jsx"

const buy = () => {
  return (
    <>
      <Searchbar />
      <div style={{ margin: '4rem auto', display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <Propcard />
        <Propcard />
        <Propcard />
        <Propcard />
        <Propcard />
        <Propcard />
      </div>
    </>
  )
}

export default buy