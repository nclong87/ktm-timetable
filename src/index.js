import 'babel-polyfill'; // fixing es6 issue in IE11

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './appStore';
import AppRouter from './appRouter';
import './style.less';

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitializing: true,
    };
  }

  componentDidMount() {
    const unsubscribe = store.subscribe(() => {
      if (store.getState().isHydrated) {
        unsubscribe();
        this.setState({
          isInitializing: false,
        });
      }
    });
  }

  render() {
    if (this.state.isInitializing === true) {
      return <div className="loading-screen"><div /><span>Initializing...</span></div>;
    }
    return (
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <AppProvider />,
    document.getElementById('app'),
  );
});

module.hot.accept();

export default AppProvider;
