import React from 'react';
import { Modal, FormLayout, TextField, InlineError } from '@shopify/polaris';
import { connect } from 'react-redux';
import { changeEditState, editBook } from '../redux/actions';

export class EditBook extends React.Component {
  state = {};

  shouldComponentUpdate(nextProps, nextState) {
    return !(this.props === nextProps) || !(this.state === nextState);
  }

  UNSAFE_componentWillUpdate(nextProps) {
    if (this.props !== nextProps && nextProps.data) {
      this.setState({
        id: nextProps.data.id,
        active: nextProps.data.active,
        name: nextProps.data.name,
        price: nextProps.data.price,
        category: nextProps.data.category,
        description: nextProps.data.description,
      });
    }
  }

  async stateHook(data, attr) {
    await this.setState({ [attr]: data });
    this.setState({ isDirty: true });
  }

  clearData = () => {
    this.setState({
      id: undefined,
      name: undefined,
      price: undefined,
      category: undefined,
      description: undefined,
    });

    //close window as well
    this.props.changeEditState();
  };

  handleEdit = event => {
    event.stopPropagation();

    const { id, name, price, category, description } = this.state;
    if (name && name.length > 0) {
      const newbook = { id, name, price, category, description };
      this.props.editBook(newbook);
      this.clearData();
      this.setState({ showInlineError: false, isDirty: false });
      this.props.changeEditState(false);
    } else {
      this.setState({ showInlineError: true });
    }
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.changeEditState(false);
  };

  render() {
    const inlineError = this.state.showInlineError ? (
      <InlineError message='Name is required' fieldID='Text_Name' />
    ) : null;

    return (
      <Modal
        open={this.props.editWindowState}
        onClose={this.handleClose}
        title='Edit book'
        primaryAction={{
          content: 'Edit',
          onAction: this.handleEdit,
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
              label='Category'
              value={this.state['category']}
              onChange={value => this.stateHook(value, 'category')}
            />
            <TextField
              label='Description'
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
  state => ({
    books: state.books,
    editWindowState: state.editWindow.editWindowState,
    data: state.editWindow.currentEditing,
  }),
  { changeEditState, editBook }
)(EditBook);
