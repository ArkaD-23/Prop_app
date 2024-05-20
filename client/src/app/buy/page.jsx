import React from 'react'
import Propcard from '../_components/Propcard'
import Searchbar from '../_components/Searchbar'

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