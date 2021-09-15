import React, { useEffect, useState } from 'react';

import { Segment, Form } from 'semantic-ui-react';

import { setAlert } from '../../actions/alert';
import { connect } from 'react-redux';
import { getAllUsers, forgotPassword } from '../../actions/profile';

import './ForgetPassword.css';

function Password({ setAlert, user, profile: { profiles }, getAllUsers, forgotPassword }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    getAllUsers();
  }, []);

  const userEmail = user.map((user) => user.email);

  const currentUser =
    profiles &&
    profiles.data &&
    profiles.data.data &&
    // eslint-disable-next-line array-callback-return
    profiles.data.data.filter((user1) => {
      if (userEmail[0] === user1.email) {
        return user1;
      }
    });

  // console.log('Current User', currentUser[0].id);
  const handleSubmit = () => {
    if (password !== confirmPassword) {
      setAlert('Passwords does not match');
    } else {
      forgotPassword({ password, confirmPassword }, currentUser[0].id);
    }
  };

  return (
    <div>
      <div>
        <Segment style={{ width: '40%', marginLeft: '25%', marginTop: '10%', border: 'none' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span>Welcome to Summerly</span>
          </div>
          <Form>
            <Form.Input
              onChange={(event) => setPassword(event.target.value)}
              value={password}
              name='password'
              label='Enter your new password'
              placeholder='Summerly1234!'
            />
            <Form.Input
              onChange={(event) => setConfirmPassword(event.target.value)}
              value={confirmPassword}
              name='confirmPassword'
              label='Enter your new password again'
              placeholder='Summerly1234!'
            />
            <Form.Button content='submit' onClick={handleSubmit} />
          </Form>
        </Segment>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { setAlert, getAllUsers, forgotPassword })(Password);
