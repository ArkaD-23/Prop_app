'use client'
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'

export default function Signup() {

  const [formData, setFormData] = useState({});
  const router = useRouter();
 /* useEffect(() => {
    handleChange;
    handleSubmit;
  }, []);*/

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value })
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!formData.username || !formData.email || !formData.password) {
        alert('Please fill all the fields!')
        return
      }

      try {
        const res = await fetch('../../server/auth/signup', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          alert('Enter your details as mentioned accordingly')
          return;
        }
        router.push('/signin');
      } catch (error) {
        console.log(error);
      }
    };


    return (
      <div style={{ width: '360px', padding: '8% 0 0', margin: '150px auto' }}>
        <div style={{
          position: 'relative', zIndex: '1', background: '#FFFFFF', maxWidth: '360px', margin: '0, auto 100px', padding: '45px', textAlign: 'center',
          boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)'
        }}>
          <form onSubmit={handleSubmit}>
            <input id="username" onChange={handleChange} style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px' }} type="text" placeholder="username" />
            <input id="email" onChange={handleChange} style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px' }} type="text" placeholder="email" />
            <input id='password' onChange={handleChange} style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px' }} type="password" placeholder="password" />
            <button style={{ fontFamily: '"Roboto", sans-serif', textTransform: 'uppercase', outline: '0', background: '#2980b9', width: '100%', border: '0', padding: '15px', color: '#FFFFFF', fontSize: '14px', WebkitTransition: 'all 0.3 ease', transition: 'all 0.3 ease', cursor: 'pointer' }} >Signup</button>
          </form>
        </div>
      </div>
    )
  };

