import React, { Component } from 'react';

import { AppProvider, Card } from '@shopify/polaris';
import PropTypes from 'prop-types';

import BookList from './modules/bookList';

class App extends Component {
  render() {
    return (
      <AppProvider>
        <Card title="Book List" sectioned>
          <p>View a summary of your online store’s performance.</p>
          <BookList />
        </Card>
      </AppProvider>
    );
  }
}

export default App;
