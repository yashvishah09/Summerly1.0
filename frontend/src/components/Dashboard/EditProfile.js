import React, { useEffect, useState } from 'react';

import { useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment, Form, Grid } from 'semantic-ui-react';

import { getCurrentUser, updateCurrentUser } from '../../actions/profile';

function EditProfile({ profile: { profile, loading }, getCurrentUser, updateCurrentUser, history }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    getCurrentUser();

    setFirstName(loading || !profile.data.data.firstName ? '' : profile.data.data.firstName);
    setLastName(loading || !profile.data.data.lastName ? '' : profile.data.data.lastName);
    setRole(loading || !profile.data.data.role ? '' : profile.data.data.role);
    setEmail(loading || !profile.data.data.email ? '' : profile.data.data.email);
  }, [getCurrentUser]);

  const handleFile = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('role', role);
    formData.append('email', email);
    formData.append('photo', photo);

    updateCurrentUser(formData, history);
  };

  return (
    <div>
      <Segment>
        <Form>
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Form.Input
                  label='First Name'
                  placeholder='Edward'
                  name='firstName'
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Input
                  label='Last Name'
                  placeholder='Shway'
                  name='lastName'
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <div>
            <span>Choose you profile picture</span>
            <input type='file' onChange={handleFile} />
          </div>
          <div>
            <select
              name='role'
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            >
              <option value='lister'>a lister</option>
              <option value='user'>finding accomodation</option>
            </select>
          </div>

          <Form.Input
            label='Email Address'
            placeholder='summerly@gmail.com'
            name='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <Form.Button
            type='submit'
            content='Update'
            onClick={(e) => {
              handleSubmit(e);
            }}
          />
        </Form>
      </Segment>
    </div>
  );
}

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentUser, updateCurrentUser })(withRouter(EditProfile));
