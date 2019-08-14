import React, { Component } from 'react';

import { Button, Card } from '@shopify/polaris';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class BookList extends Component {
  static contextTypes = {
    store: PropTypes.object,
  };

  constructor(props, context) {
    super(props);

    this.store = context.store;
    // const { store } = this.context;

    // let books = store.getstate().books;
    // this.state = {
    //   books: books,
    // };
  }

  componentDidMount() {
    console.log('store', this.store);
    let books = this.store.getstate().books;

    this.setState(books);
  }

  render() {
    return (
      <Card title='Book List' sectioned>
        <p>View a summary of your online store’s performance.</p>
      </Card>
    );
  }
}

export default connect(state => ({
  books: state.books,
}))(BookList);
