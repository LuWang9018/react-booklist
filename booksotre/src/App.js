import React, { Component } from 'react';

import { AppProvider, Card } from '@shopify/polaris';

import BookList from './modules/bookList';

class App extends Component {
  render() {
    return (
      <AppProvider>
        <Card title='Book List' sectioned>
          <BookList />
        </Card>
      </AppProvider>
    );
  }
}

export default App;
