
import React from 'react';
import {Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink,} from '../NavbarElements';
  
const Header = () => {
  return (
    <>
      <Nav>
        <Bars />
        <img id='logo' alt='logo' src='.../picthers/logo.png'/>
        <NavMenu>
          <NavLink to='/בית' activeStyle>
            בית
          </NavLink>
          <NavLink to='/חומרי_לימוד' activeStyle>
            חומרי לימוד
          </NavLink>
          <NavLink to='/אודות' activeStyle>
            אודות
          </NavLink>
          <NavLink to='/צור_קשר' activeStyle>
            צור קשר
          </NavLink>
          <NavLink to='/בלוג' activeStyle>
            בלוג
          </NavLink>

        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/sign-in'>התחברות</NavBtnLink>
          <NavBtnLink to='/sign-out'>יצירת פרופיל מורה חדש</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};
  
export default Header;