import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { registerUser } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';

class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  };

  componentDidUpdate(prevProps) {
    const error = this.props.error;
    const isAuthenticated = this.props.isAuthenticated;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    // When user registers successfully (authenticated), close modal
    if (this.state.modal) {
      if (isAuthenticated) this.toggle();
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    // Create user object
    const new_user_data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    // Call actions: Attempt to register
    this.props.registerUser(new_user_data);

    // Close modal
    //this.toggle();
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Register
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Your Name'
                  onChange={this.onChange}
                  className='mb-3'
                />

                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Your Email'
                  onChange={this.onChange}
                  className='mb-3'
                />

                <Label for='password'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Your Password'
                  onChange={this.onChange}
                  className='mb-3'
                />

                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

RegisterModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.myauth.isAuthenticated,
    error: state.myerrors
  };
};

export default connect(
  mapStateToProps,
  { registerUser, clearErrors }
)(RegisterModal);
