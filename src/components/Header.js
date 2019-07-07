import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
  <header>
    <h1> SMS Scheduler</h1>
    <NavLink to="/" activeClassName ="is-active" exact={true}>GoHome</NavLink>
    <NavLink to="/create" activeClassName ="is-active">CreateSMS</NavLink>
  </header>
);

export default Header;