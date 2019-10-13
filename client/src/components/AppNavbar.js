import React, { Component, Fragment } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState(() => ({
      isOpen: !this.state.isOpen
    }));
  };

  render() {
    const isAuthenticated = this.props.auth_status.isAuthenticated;
    const user = this.props.auth_status.user;
    const authLinks = (
      <Fragment>
        <NavItem>
          <span className='navbar-text mr-3'>
            <strong>{user ? `Welcome ${user.name}` : ''}</strong>
          </span>
        </NavItem>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <div>
        <Navbar color='dark' dark expand='sm' className='mb-5'>
          {/*Dark so that it knows navbar is dark, so that the text should be white*/}
          <Container>
            <NavbarBrand href='/'>ShoppingList</NavbarBrand>
            <NavbarToggler onClick={this.toggle}></NavbarToggler>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className='ml-auto' navbar>
                <NavItem>
                  <NavLink href='https://github.com/bradtraversy'>
                    Github
                  </NavLink>
                </NavItem>
                {isAuthenticated ? authLinks : guestLinks}
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  auth_status: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return { auth_status: state.myauth };
};

export default connect(
  mapStateToProps,
  {}
)(AppNavbar);
