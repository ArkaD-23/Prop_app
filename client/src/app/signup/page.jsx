'use client'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpStart, signUpSuccess, signUpFailure } from '@/store/features/user/userSlice.js';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.js';



export default function Signup() {

  const [formData, setFormData] = useState({});
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error, loading } = useAppSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password || !formData.contact_no) {
      alert('Please fill all the fields!')
      return
    }
    
    try {
      dispatch(signUpStart());
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
        dispatch(signUpFailure(data));
        alert('This email has already been registered!')
        return;
      }
      dispatch(signUpSuccess(data));
      router.push('/signin');
    } catch (error) {
      dispatch(signUpFailure(error));
    }
  };


  return (
    <div style={{ width: '360px', padding: '8% 0 0', margin: '150px auto' }}>
      <div style={{
        position: 'relative', zIndex: '1', background: '#FFFFFF', maxWidth: '360px', margin: '0, auto 100px', padding: '45px', paddingBottom: '70px', textAlign: 'center',
        boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '1.6em' }}>SIGNUP</h1>
        <form onSubmit={handleSubmit}>
          <input id="username" onChange={handleChange} style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px', borderRadius: '50px' }} type="text" placeholder="username" />
          <input id="email" onChange={handleChange} style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px', borderRadius: '50px' }} type="text" placeholder="email" />
          <input id='password' onChange={handleChange} style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px', borderRadius: '50px' }} type="password" placeholder="password" />
          <input id="contact_no" onChange={handleChange} style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px', borderRadius: '50px' }} type="text" placeholder="contact no" />
          <button style={{ fontFamily: '"Roboto", sans-serif', textTransform: 'uppercase', outline: '0', background: '#2980b9', width: '100%', border: '0', padding: '15px', color: '#FFFFFF', fontSize: '14px', WebkitTransition: 'all 0.3 ease', transition: 'all 0.3 ease', cursor: 'pointer', borderRadius: '50px' }} >{loading ? 'Loading....' : 'Signup'}</button>
        </form>
      </div>
    </div>
  )
};

