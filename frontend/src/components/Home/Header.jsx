import React from 'react';

import './Header.css';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { Fragment } from 'react';

import { Container } from 'semantic-ui-react';
import { Nav, Navbar } from 'react-bootstrap';

function Header({ auth: { isAuthenticated, loading, role }, logout }) {
  const listerLinks = (
    <Navbar>
      <Container>
        <Navbar.Brand className='header_list_home'>
          {' '}
          <Link to='/'> Summerly</Link>
        </Navbar.Brand>
        <Nav>
          <Nav.Link className='header__list'>
            {' '}
            <Link to='/aboutus'>ABOUT US</Link>
          </Nav.Link>

          <Nav.Link className='header__list'>
            <Link to='/addlisting'>ADD A LISTING </Link>
          </Nav.Link>

          <Nav.Link className='header__list'>
            {' '}
            <Link to='/dashboard'>DASHBOARD</Link>
          </Nav.Link>

          <Nav.Link className='header__list' onClick={logout}>
            <Link to='/#'>LOGOUT</Link>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );

  const guestLinks = (
    <Navbar>
      <Container>
        <Navbar.Brand className='header_list_home'>
          {' '}
          <Link to='/'> Summerly</Link>
        </Navbar.Brand>
        <Nav>
          <Nav.Link className='header__list'>
            {' '}
            <Link to='/aboutus'>ABOUT US</Link>
          </Nav.Link>

          {!isAuthenticated && (
            <Nav.Link className='header__list'>
              <Link to='/signin'>SIGN IN</Link>
            </Nav.Link>
          )}

          <Nav.Link className='header__list'>
            <Link to='/listings'>LISTINGS</Link>
          </Nav.Link>

          {isAuthenticated && (
            <Nav.Link className='header__list'>
            {' '}
            <Link to='/dashboard'>DASHBOARD</Link>
          </Nav.Link>
          )}

          {isAuthenticated && (
            <Nav.Link className='header__list' onClick={logout}>
              <Link to='/#'>LOGOUT</Link>
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );

  return (
    <div className='header'>{!loading && <Fragment>{isAuthenticated ? (role === 'user' ? guestLinks : listerLinks) : guestLinks}</Fragment>}</div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Header);
