import React, { Component } from 'react';
import { Nav } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import { Link } from 'react-router-dom';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};
const email = localStorage.getItem('email')
class DefaultHeader extends Component {

  render() {
    const { children, ...attributes } = this.props;
    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand>
          <img src={require("../../assets/img/logo.png")} height="40" />
        </AppNavbarBrand>
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        <Nav className="ml-auto headerEmail" navbar>
          <Link to="/profile" title="Profile"><i className="fa fa-user fa-lg mr-1"> </i>{email}</Link>
          <a href="#!" className="btn mr-2" onClick={e => this.props.onLogout(e)}><i className="fa fa-lock"></i> Logout</a>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
