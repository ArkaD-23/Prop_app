'use client'
import React, { useState } from 'react'
import Propcard from "@/components/Propcard.jsx"
import Link from 'next/link'
import { signOut, updateUserFailure, updateUserStart, updateUserSuccess } from '@/lib/store/features/user/userSlice.js'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks.js'

const Profile = () => {

    const dispatch = useAppDispatch();
    const { currentUser, error, loading } = useAppSelector((state) => state.user);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`../../server/user/update/${currentUser.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if(data.success === false) {
                dispatch(updateUserFailure(data));
                return;
            }
            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        } catch (error) {
            dispatch(updateUserFailure(error));
        }
    }


    const handleSignout = async () => {
        try {
            await fetch("../../server/auth/signout");
            dispatch(signOut());
        } catch (error) {
            next(error);
        }
    }

    return (
        <div style={{ display: 'grid' }}>
            <div style={{
                width: '100%', padding: '8% 0 0', margin: ' auto', display: 'grid', justifyItems: 'center'
            }}>
                <div style={{
                    background: '#FFFFFF', maxWidth: '360px', margin: '0, auto 100px', padding: '45px', display: 'grid', justifyContent: 'center',
                    alignItems: 'center'

                }}>
                    <h1 style={{ textAlign: 'center' }}>My Profile</h1>
                    <form onSubmit={handleSubmit}>
                        <input style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px', borderRadius: '50px' }} type="text" defaultValue={currentUser.username} placeholder="username" onChange={handleChange} />
                        <input style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px', borderRadius: '50px' }} type="text" defaultValue={currentUser.email} placeholder="email" onChange={handleChange} />
                        <input style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px', borderRadius: '50px' }} type="text" defaultValue={currentUser.contact_no} placeholder="contact" onChange={handleChange} />
                        <input style={{ fontFamily: 'Roboto', outline: '0', background: '#f2f2f2', width: '100%', border: '0', margin: '0 0 15px', padding: '15px', boxSizing: 'border-box', fontSize: '14px', borderRadius: '50px' }} type="password" defaultValue={currentUser.password} placeholder='password' onChange={handleChange} />
                        <button style={{ fontFamily: '"Roboto", sans-serif', textTransform: 'uppercase', outline: '0', background: 'green', width: '100%', border: '0', padding: '15px', color: '#FFFFFF', fontSize: '14px', WebkitTransition: 'all 0.3 ease', transition: 'all 0.3 ease', cursor: 'pointer', borderRadius: '50px' }} >Update</button>
                    </form>
                </div>
            </div>
            <div>
                <h1 style={{ textAlign: 'center' }}>My Listings</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Propcard />
                    <Propcard />
                    <Propcard />
                    <Propcard />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Link href="/sell" style={{ fontFamily: '"Roboto", sans-serif', textTransform: 'uppercase', outline: '0', background: 'green', width: '20%', border: '0', padding: '15px', color: '#FFFFFF', fontSize: '14px', WebkitTransition: 'all 0.3 ease', transition: 'all 0.3 ease', cursor: 'pointer', borderRadius: '50px', textDecoration: 'none', textAlign: 'center' }}>
                    Add Listing
                </Link>
                <Link href="/" onClick={handleSignout} style={{ fontFamily: '"Roboto", sans-serif', textTransform: 'uppercase', outline: '0', background: 'red', width: '20%', border: '0', padding: '15px', color: '#FFFFFF', fontSize: '14px', WebkitTransition: 'all 0.3 ease', transition: 'all 0.3 ease', cursor: 'pointer', borderRadius: '50px', textDecoration: 'none', textAlign: 'center' }} >Signout</Link>
            </div>

        </div>
    )
}

export default Profile; 