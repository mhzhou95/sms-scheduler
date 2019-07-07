import React from 'react';
import { BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import SMSDashboardPage from '../components/SMSDashboardPage';
import CreateSMSPage from '../components/CreateSMSPage';
import EditSMSPage from '../components/EditSMSPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
        <Switch>
          <Route path= "/" component={SMSDashboardPage} exact={true}/>
          <Route path= "/create" component={CreateSMSPage}/>
          <Route path= "/edit/:id" component={EditSMSPage}/>
          <Route component={NotFoundPage}/>
        </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;

