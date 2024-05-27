import React from 'react';

const Searchbar = () => {
    return (
        <div style={{ maxWidth: '420px', margin: '3.5rem auto', fontFamily: "'Raleway', sans-serif" }}>
            <div style={{ paddingTop: '64px' }}>
                <div style={{ position: 'relative',display:'flex',justifyContent:'space-between', alignItems:'center'}}>
                    <input
                        type="text"
                        placeholder="Search"
                        style={{
                            width: '100%',
                            padding: '12px 24px',
                            backgroundColor: 'transparent',
                            transition: 'transform 250ms ease-in-out',
                            fontSize: '14px',
                            lineHeight: '18px',
                            color: '#575756',
                            borderRadius: '50px',
                            border: '1px solid #2980b9',
                            transition: 'all 250ms ease-in-out',
                            backfaceVisibility: 'hidden',
                            transformStyle: 'preserve-3d',
                            paddingRight: '40px', // Add padding to make room for the icon
                        }}
                    />
                    <button
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '10px',
                            transform: 'translateY(-50%)',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <img
                            src="data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E"
                            alt="Search"
                            style={{ width: '18px', height: '18px' }}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};


export default Searchbar;
