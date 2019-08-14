import React, { Component } from 'react';

import { AppProvider } from '@shopify/polaris';
import PropTypes from 'prop-types';

import { BookList } from './modules/bookList';

class App extends Component {
  static contextTypes = {
    store: PropTypes.object,
  };

  render() {
    return (
      <AppProvider>
        <BookList />
      </AppProvider>
    );
  }
}

export default App;
