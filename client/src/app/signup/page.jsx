import React from 'react'

const signup = () => {
  return (
    <div style={{ width: '360px', padding: '8% 0 0', margin: 'auto' }}>
      <div style={{
          position: 'relative', zIndex: '1', background: '#FFFFFF', maxWidth: '360px', margin: '0, auto 100px', padding: '45px', textAlign: 'center',
          boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)'}}>
        <form>
        <input style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px' }} type="password" placeholder="username" />
          <input style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px' }} type="text" placeholder="email" />
          <input style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px' }} type="password" placeholder="password" />
          <button style={{ fontFamily: '"Roboto", sans-serif', textTransform: 'uppercase', outline: '0', background: '#2980b9', width: '100%', border: '0', padding: '15px', color: '#FFFFFF', fontSize: '14px', WebkitTransition: 'all 0.3 ease', transition: 'all 0.3 ease', cursor: 'pointer'}} >Signup</button>
        </form>
      </div>
    </div>
  )
}

export default signup