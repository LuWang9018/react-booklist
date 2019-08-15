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
import AddBook from './addBook';
import EditBook from './editBook';
export class BookList extends Component {
  //Now we can use connect to link store with props
  //so follow code are useless, although they all works
  //depends on which style you want to use

  // state = {
  //   books: this.props.books,
  // };

  // async componentDidMount() {
  //   const { books } = this.props;
  //   await this.setState({ books });
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('shouldComponentUpdate', this.props, nextProps);
  //   return (
  //     !(this.props.books === nextProps.books) ||
  //     !(this.state.books === nextState.books)
  //   );
  // }

  // async componentWillUpdate(nextProps, nextState) {
  //   this.setState({ books: nextProps.books });
  // }

  // componentWillReceiveProps(props) {
  //   console.log(props);
  //   if (props.books !== this.props.books) {
  //     this.setState({ books: props.books });
  //   }
  // }

  state = {
    editWindow: false,
  };

  changeEditWindowState = () => {
    this.setState(({ editWindow }) => ({
      editWindow: !editWindow,
    }));

    console.log('changeEditWindowState', this.state.editWindow);
  };

  render() {
    const { books } = this.props;
    if (!books) return null;
    return (
      <div style={{ maxWidth: '800px' }}>
        <AddBook />

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
                  onClick={() => this.changeEditWindowState()}
                >
                  <EditBook
                    active={this.state.editWindow}
                    changeEditWindowState={this.changeEditWindowState}
                    data={item}
                  />
                  <div id='itemListInfo'>
                    <List>
                      <List.Item>
                        <TextStyle variation='strong'>Name:</TextStyle>
                        <Caption>
                          <TextStyle variation='strong'> {name}</TextStyle>
                        </Caption>
                      </List.Item>
                      <List.Item>
                        <TextStyle variation='strong'>Price:</TextStyle>
                        <Caption>
                          <TextStyle variation='strong'>
                            {price ? price + '$' : ''}
                          </TextStyle>
                        </Caption>
                      </List.Item>
                      <List.Item>
                        <TextStyle variation='strong'>Category:</TextStyle>
                        <Caption>
                          <TextStyle variation='strong'> {category}</TextStyle>
                        </Caption>
                      </List.Item>
                    </List>
                  </div>
                  <div id='itemListActions'>
                    <div>
                      <Button
                        onClick={event => {
                          event.stopPropagation();
                          const { delBook } = this.props;
                          delBook(id);
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
