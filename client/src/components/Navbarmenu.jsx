"use client"
import React, { useState } from 'react';
import { Link } from 'next/link';
import { FiAlignRight, FiXCircle, FiChevronDown } from "react-icons/fi";

export const Navbarmenu = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [isResponsiveClose, setIsResponsiveClose] = useState(false);

  const toggleClass = () => {
    setIsMenu(!isMenu);
    setIsResponsiveClose(!isResponsiveClose);
  };

  const [isMenuSubMenu, setIsMenuSubMenu] = useState(false);

  const toggleSubmenu = () => {
    setIsMenuSubMenu(!isMenuSubMenu);
  };

  const mainMenuStyles = {
    display: isMenu ? 'block' : 'none',
    right: isMenu ? '0' : '-100%',
    transition: 'right 0.3s ease',
  };

  const subMenuStyles = {
    display: isMenuSubMenu ? 'block' : 'none',
    height: isMenuSubMenu ? 'auto' : '0',
    overflow: 'hidden',
  };

  return (
    <header style={{ padding: '20px 0', borderBottom: '1px solid #eaeaea' }}>
      <div style={{ maxWidth: '1170px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <div>
          <nav style={{ position: 'relative' }}>
            {isResponsiveClose ? (
              <span style={{ display: 'none' }} onClick={toggleClass}><FiXCircle /></span>
            ) : (
              <span style={{ display: 'none' }} onClick={toggleClass}><FiAlignRight /></span>
            )}

            <ul style={{ ...mainMenuStyles, listStyle: 'none', padding: '0', margin: '0', position: 'absolute', top: '100%' }}>
              <li style={{ marginBottom: '10px' }}>
                <Link exact onClick={toggleClass} to="/">Home</Link>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link onClick={toggleClass} to="/About">About</Link>
              </li>
              <li style={{ marginBottom: '10px' }} onClick={toggleSubmenu}>
                <Link to="#">Shop <FiChevronDown /></Link>
                <ul style={{ ...subMenuStyles, padding: '0', margin: '0' }}>
                  <li style={{ marginBottom: '10px' }}>
                    <Link onClick={toggleClass} to="/Online">Online Shop</Link>
                  </li>
                  <li style={{ marginBottom: '10px' }}>
                    <Link onClick={toggleClass} to="/Offline">Offline Shop</Link>
                  </li>
                </ul>
              </li>
              <li style={{ marginBottom: '10px' }}>
                <Link onClick={toggleClass} to="/Contact">Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};


