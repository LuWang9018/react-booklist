import './bookList.css';

import React, { Component, PureComponent } from 'react';
import {
  Button,
  Card,
  ResourceList,
  TextStyle,
  List,
  Caption,
  Layout,
} from '@shopify/polaris';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { delBook } from '../redux/actions';

export class BookList extends Component {
  state = {
    books: this.props.books,
  };

  async componentDidMount() {
    const { books } = this.props;
    await this.setState({ books });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate', this.props, nextProps);
    return (
      !(this.props.books === nextProps.books) ||
      !(this.state.books === nextState.books)
    );
  }

  async componentWillUpdate(nextProps, nextState) {
    console.log('@@@@@@@@@@@@@@@@');
    console.log('state', this.state);
    console.log('props', this.props);
    console.log('nextState', nextState);
    console.log('nextProps', nextProps);
    this.setState({ books: nextProps.books });
  }

  // componentWillReceiveProps(props) {
  //   console.log(props);
  //   if (props.books !== this.props.books) {
  //     this.setState({ books: props.books });
  //   }
  // }

  render() {
    console.log('>>>>>>>>>>');
    const { books } = this.state;
    if (!books) return null;
    console.log('render books', books);
    return (
      <div style={{ maxWidth: '800px' }}>
        <Card sectioned>
          <ResourceList
            resourceName={{ singular: 'customer', plural: 'customers' }}
            items={books}
            renderItem={item => {
              const { id, name, price, category } = item;

              return (
                <ResourceList.Item
                  id={id}
                  accessibilityLabel={`View details for ${name}`}
                >
                  <div id="itemListInfo">
                    <List>
                      <List.Item>
                        <TextStyle variation="strong">Name:</TextStyle>
                        <Caption>
                          <TextStyle variation="strong"> {name}</TextStyle>
                        </Caption>
                      </List.Item>
                      <List.Item>
                        <TextStyle variation="strong">Price:</TextStyle>
                        <Caption>
                          <TextStyle variation="strong"> {price}$</TextStyle>
                        </Caption>
                      </List.Item>
                      <List.Item>
                        <TextStyle variation="strong">Category:</TextStyle>
                        <Caption>
                          <TextStyle variation="strong"> {category}</TextStyle>
                        </Caption>
                      </List.Item>
                    </List>
                  </div>
                  <div id="itemListActions">
                    <div>
                      <Button
                        onClick={event => {
                          event.stopPropagation();
                          const { delBook } = this.props;
                          delBook(id);
                          // console.log('123', this.props);
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </ResourceList.Item>
              );
            }}
          />
        </Card>
      </div>
    );
  }
}

export default connect(
  state => state.books,
  { delBook }
)(BookList);
