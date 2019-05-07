/* global __LOCAL__:true */
import 'babel-polyfill'; // fixing es6 issue in IE11

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { PersistGate } from 'redux-persist/lib/integration/react';
import configureStore from './appStore';
import AppRouter from './appRouter';
import './style.less';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  fontFamily: 'helvetica neue, helvetica',
  palette: {
    primary: {
      main: '#36425A',
    },
  },
});

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInitializing: true,
      store: null,
      persistor: null,
    };
  }

  componentDidMount() {
    configureStore().then((response) => {
      this.setState({
        isInitializing: false,
        store: response.store,
        persistor: response.persistor,
      });
    });
    // const unsubscribe = store.subscribe(() => {
    //   console.log(store.getState());
    //   if (store.getState().isHydrated) {
    //     console.log('isHydrated');
    //     unsubscribe();
    //     this.setState({
    //       isInitializing: false,
    //     });
    //   }
    // });
    // setTimeout(() => this.setState({ isInitializing: false }), 3000);
  }

  render() {
    if (this.state.isInitializing) {
      return <div className="loading-screen"><div /><span>Initializing...</span></div>;
    }
    return (
      <Provider store={this.state.store}>
        <PersistGate loading={null} persistor={this.state.persistor}>
          <MuiThemeProvider theme={theme}>
            <AppRouter />
          </MuiThemeProvider>
        </PersistGate>
      </Provider>
    );
  }
}

ReactDOM.render(
  <AppProvider />,
  document.getElementById('app'),
);

if (__LOCAL__ === true) {
  module.hot.accept();
}

export default AppProvider;
