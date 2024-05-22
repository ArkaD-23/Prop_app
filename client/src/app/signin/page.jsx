import Link from "next/link";
import React, { useEffect, useState, useNavigate} from "react";

export default function signin() {

  const [formData, setformData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setformData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => {
    try {
      const res = fetch("/server/auth/signin", {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false) {
        console.log(data);
        return;
      }
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ width: '360px', padding: '8% 0 0', margin: '150px auto' }}>
      <div style={{
          position: 'relative', zIndex: '1', background: '#FFFFFF', maxWidth: '360px', margin: '0, auto 100px', padding: '45px', textAlign: 'center',
          boxShadow: '0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24)'}}>
        <form onSubmit={handleSubmit}>
          <input id="email" onChange={handleChange} style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px' }} type="text" placeholder="email" />
          <input id="password" onChange={handleChange} style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px' }} type="password" placeholder="password" />
          <button id="button" style={{ fontFamily: '"Roboto", sans-serif', textTransform: 'uppercase', outline: '0', background: '#2980b9', width: '100%', border: '0', padding: '15px', color: '#FFFFFF', fontSize: '14px', WebkitTransition: 'all 0.3 ease', transition: 'all 0.3 ease', cursor: 'pointer' }}>login</button>
          <p style={{margin: '15px 0 0',  color: '#b3b3b3',fontSize: '12px'}}>Not registered? <Link style={{color: '#2980b9', textDecoration: 'none'}}   href="/signup">Create an account</Link></p>
        </form>
      </div>
    </div>
  )
}
