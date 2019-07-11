import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import SMSDashboardPage from '../components/SMSDashboardPage';
import CreateSMSPage from '../components/CreateSMSPage';
import EditSMSPage from '../components/EditSMSPage';
import AboutPage from '../components/AboutPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path='/' component={SMSDashboardPage} exact={true} />
        <Route path='/create' component={CreateSMSPage} />
        <Route path='/about' component={AboutPage} />
        <Route path='/edit/:id' component={EditSMSPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
