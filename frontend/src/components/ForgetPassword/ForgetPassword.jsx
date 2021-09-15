/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';

import { Segment, Form } from 'semantic-ui-react';

import { setAlert } from '../../actions/alert';
import { getAllUsers } from '../../actions/profile';

import { connect } from 'react-redux';

import './ForgetPassword.css';
import Password from './Password';

function ForgetPassword({ getAllUsers, profile: { profiles } }) {
  const [form, setForm] = useState({
    email: ''
  });
  const [next, setNext] = useState(false);
  const [user, setUser] = useState();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

 

  const { email } = form;

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredUser =
      profiles &&
      profiles.data &&
      profiles.data.data &&
      profiles.data.data.filter((user) => {
        if (email === user.email) {
          return user;
        }
      });

    // console.log(filteredUser);

    setUser(filteredUser);

    setNext(true);
  };

  // console.log(user);
  return (
    <div>
      {next === true ? (
        <Password user={user} />
      ) : (
        <div className='forgetPass'>
          <div>
            <Segment style={{ width: '40%', marginLeft: '25%', marginTop: '10%', border: 'none' }}>
              <div style={{ marginBottom: '1rem' }}>
                <span>Welcome to Summerly</span>
              </div>
              <Form>
                <Form.Input
                  onChange={(event) => setForm({ ...form, [event.target.name]: event.target.value })}
                  value={email}
                  name='email'
                  label='Enter the email you registered your account with'
                  placeholder='json.3@gmail.com'
                />

                <Form.Button content='submit' onClick={handleSubmit} />
              </Form>
            </Segment>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { setAlert, getAllUsers })(ForgetPassword);
