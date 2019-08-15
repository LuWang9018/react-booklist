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

export class EditBook extends React.Component {
  state = {
    active: this.props.active,
    isDirty: false,
    name: this.props.name,
    price: this.props.price,
    category: this.props.category,
    description: this.props.description,
  };

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props === nextProps) || !(this.state === nextState);
  }

  componentWillUpdate(nextProps) {
    console.log('componentWillUpdate');
    if (this.props !== nextProps) {
      this.setState({
        active: nextProps.active,
        name: nextProps.name,
        price: nextProps.price,
        category: nextProps.category,
        description: nextProps.description,
      });
    }
  }

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
    this.setState({ active: false });
    this.props.changeEditWindowState();
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
    );
  }
}

export default connect(
  null,
  {}
)(EditBook);
