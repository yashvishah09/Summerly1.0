import React, { useState } from 'react';
import { Segment, Form, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import './CreateAccount.css';

function CreateAccount(props) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: 'user',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { firstName, lastName, role, email, password, confirmPassword } = formData;

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      props.setAlert('Passwords do not match', 'danger');
    } else {
      props.register({ firstName, lastName, role, email, password, confirmPassword });
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='createAccount'>
      <Segment style={{ width: '40%', marginLeft: '25%', marginTop: '3%', border: 'none' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h5>Sign up to Summerly</h5>
        </div>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Input label='First Name' placeholder='Edward' name='firstName' value={firstName} onChange={(e) => handleChange(e)} />
              </Grid.Column>
              <Grid.Column>
                <Form.Input label='Last Name' placeholder='Shway' name='lastName' value={lastName} onChange={(e) => handleChange(e)} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <div style={{ margin: '0.8rem 0' }}>
            <p style={{ fontSize: '1rem', fontWeight: 'bold' }}>Are you a lister or looking for accomodation?</p>
            <select name='role' value={role} onChange={handleChange}>
              <option value='lister'>a lister</option>
              <option value='user'>finding accomodation</option>
            </select>
          </div>

          <Form.Input label='Email Address' placeholder='summerly@gmail.com' name='email' value={email} onChange={(e) => handleChange(e)} />
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Input label='New Password' placeholder='Summerly1234@' name='password' value={password} onChange={(e) => handleChange(e)} />
              </Grid.Column>
              <Grid.Column>
                <Form.Input
                  label='Confirm Password'
                  placeholder='Summerly1234@'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={(e) => handleChange(e)}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>

          {/* <Dropdown onChange={(e) => handleChange(e, options)} options={options} placeholder='Choose an option' selection value={role} /> */}

          <Form.Button style={{ marginTop: '15px' }} content='Submit' />
        </Form>
      </Segment>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(CreateAccount);
