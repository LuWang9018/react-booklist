import React, { Component, PureComponent } from 'react';
import {
  Button,
  Card,
  ResourceList,
  TextStyle,
  List,
  Caption,
  Layout,
  Modal,
  TextContainer,
  FormLayout,
  TextField,
  InlineError,
} from '@shopify/polaris';
import { connect } from 'react-redux';
import { addBook } from '../redux/actions';

export class AddBook extends React.Component {
  state = {
    active: false,
    isDirty: false,
  };

  async stateHook(data, attr) {
    console.log('attr', attr);
    console.log('data', data);
    await this.setState({ [attr]: data });
    this.setState({ isDirty: true });
  }

  clearData = () => {
    this.setState({
      name: undefined,
      price: undefined,
      category: undefined,
      description: undefined,
    });

    //close window as well
    this.setState(({ active }) => ({ active: !active }));
  };

  handleAdd = () => {
    const { name, price, category, description } = this.state;
    if (name && name.length > 0) {
      const newbook = { name, price, category, description };
      this.props.addBook(newbook);
      this.clearData();
      this.setState({ showInlineError: false, isDirty: false });
    } else {
      this.setState({ showInlineError: true });
    }
  };

  handleClose = () => {
    this.clearData();
  };

  render() {
    const { active } = this.state;

    const inlineError = this.state.showInlineError ? (
      <InlineError message='Name is required' fieldID='Text_Name' />
    ) : null;

    console.log(this.state.showInlineError);
    return (
      <div style={{ height: '50px' }}>
        <Button onClick={this.handleClose}>Add Book</Button>
        <Modal
          open={active}
          onClose={this.handleClose}
          title='Add a new book'
          primaryAction={{
            content: 'Add Book',
            onAction: this.handleAdd,
          }}
        >
          <Modal.Section>
            <FormLayout>
              <TextField
                id='Text_Name'
                label='Name'
                minLength={1}
                value={this.state['name']}
                onChange={value => this.stateHook(value, 'name')}
              />
              {inlineError}
              <TextField
                type='number'
                label='Price'
                value={this.state['price']}
                onChange={value => this.stateHook(value, 'price')}
              />
              <TextField
                label='category'
                value={this.state['category']}
                onChange={value => this.stateHook(value, 'category')}
              />
              <TextField
                label='description'
                multiline
                value={this.state['description']}
                onChange={value => this.stateHook(value, 'description')}
              />
            </FormLayout>
          </Modal.Section>
        </Modal>
      </div>
    );
  }
}

export default connect(
  null,
  { addBook }
)(AddBook);
