import React, { PureComponent } from 'react';
import { BrowserRouter, Route, Switch, hashHistory } from 'react-router-dom';
import Home from './home/index';

class AppRouter extends PureComponent {
  render() {
    return (
      <BrowserRouter history={hashHistory}>
        <Switch>
          <Route
            path="/"
            exact
            component={Home}
          />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
