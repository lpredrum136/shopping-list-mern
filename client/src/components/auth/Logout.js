import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';

class Logout extends Component {
  render() {
    return (
      <Fragment>
        <NavLink onClick={this.props.logoutUser} href='#'>
          Logout
        </NavLink>
      </Fragment>
    );
  }
}

Logout.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { logoutUser }
)(Logout);
