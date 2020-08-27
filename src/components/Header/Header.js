import React from 'react';
import './Header.css';

function Header( {black} ){
  return (
    <header className={ black ? 'black' : '' } >
      <div className="logo">
        <a href="/">
          <img src="https://image.tmdb.org/t/p/original/wwemzKWzjKYJFfCeiB57q3r4Bcm.svg" alt="Netflix" />
        </a>
      </div>
      <div className="user"></div>
    </header>
  )
}

export default Header;