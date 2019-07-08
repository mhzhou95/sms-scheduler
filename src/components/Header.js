import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
  <header className="header">
    <h1 className="header-title"> SMS Scheduler</h1>
    <NavLink className="header-link" to="/" activeClassName ="is-active" exact={true}>Home</NavLink>
    <NavLink className="header-link" to="/create" activeClassName ="is-active">CreateSMS</NavLink>
  </header>
);

export default Header;