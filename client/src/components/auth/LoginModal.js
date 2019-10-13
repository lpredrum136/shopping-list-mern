import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
import { loginUser } from '../../actions/authActions';

class LoginModal extends Component {
  state = {
    modal: false,
    email: '',
    password: '',
    msg: null
  };

  componentDidUpdate(prevProps) {
    const error = this.props.error;
    const isAuthenticated = this.props.isAuthenticated;

    if (error !== prevProps.error) {
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }

    if (this.state.modal) {
      if (isAuthenticated) this.toggle();
    }
  }

  toggle = () => {
    this.props.clearErrors();
    this.setState({ modal: !this.state.modal });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    // User data
    const login_data = {
      email: this.state.email,
      password: this.state.password
    };

    // Call action: Login user
    this.props.loginUser(login_data);
  };

  render() {
    return (
      <div>
        <NavLink onClick={this.toggle} href='#'>
          Login
        </NavLink>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color='danger'>{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  onChange={this.onChange}
                  placeholder='Enter email'
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
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

LoginModal.propTypes = {
  loginUser: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.myauth.isAuthenticated,
    error: state.myerrors
  };
};

export default connect(
  mapStateToProps,
  { loginUser, clearErrors }
)(LoginModal);
