import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CreateUser from '../pages/CreateUser/CreateUser';
import LeadList from '../pages/LeadList/LeadList';
import CreateLead from '../pages/CreateLead/CreateLead';

const Routes = (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={CreateUser} />
      <Route path="/leads" exact={true} component={LeadList} />
      <Route path="/create-lead" exact={true} component={CreateLead} />
    </Switch>
  </BrowserRouter>
);
export default Routes;
