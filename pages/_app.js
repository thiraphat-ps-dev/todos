import App from 'next/app';
import React from 'react';
import Head from 'next/head';
import './../public/styles/main.scss';
import withReduxStore from '../lib/with-redux-store';
import { Provider } from 'react-redux';

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <div>
        <Head>
          <title>todolist</title>
        </Head>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </div>
    );
  }
}

export default withReduxStore(MyApp);
