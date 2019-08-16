import './bookList.css';

import React, { Component } from 'react';
import {
  Button,
  Card,
  ResourceList,
  TextStyle,
  List,
  Caption,
} from '@shopify/polaris';
import { connect } from 'react-redux';
import { delBook, changeEditState } from '../redux/actions';
import AddBook from './addBook';
import EditBook from './editBook';
export class BookList extends Component {
  changeEditWindowState = async (state, data) => {
    this.props.changeEditState(state, data);
  };

  render() {
    const { books } = this.props;
    if (!books) return null;
    return (
      <div style={{ maxWidth: '800px' }}>
        <AddBook />
        <EditBook />
        <Card sectioned>
          <ResourceList
            resourceName={{ singular: 'customer', plural: 'customers' }}
            items={books}
            renderItem={item => {
              const { id, name, price, category, description } = item;

              const book = Object.assign({}, item);
              return (
                <ResourceList.Item
                  id={id}
                  accessibilityLabel={`View details for ${name}`}
                  onClick={() => this.props.changeEditState(true, book)}
                >
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
                            {price ? price + ' $' : 'N/A'}
                          </TextStyle>
                        </Caption>
                      </List.Item>
                      <List.Item>
                        <TextStyle variation='strong'>Category:</TextStyle>
                        <Caption>
                          <TextStyle variation='strong'>
                            {category ? category : 'N/A'}
                          </TextStyle>
                        </Caption>
                      </List.Item>
                      <List.Item>
                        <TextStyle variation='strong'>Description:</TextStyle>
                        <Caption>
                          <TextStyle variation='strong'>
                            {description ? description : 'N/A'}
                          </TextStyle>
                        </Caption>
                      </List.Item>
                    </List>
                  </div>
                  <div id='itemListActions'>
                    <div className='bookDiv'>
                      <Button
                        className='bookBtn'
                        destructive
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
  state => ({
    books: state.books.books,
    editWindowState: state.editWindow.editWindowState,
  }),
  { delBook, changeEditState }
)(BookList);
