/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import { Icon, Card, Image } from 'semantic-ui-react';

import { getCurrentUser, deleteCurrentUser } from '../../actions/profile';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import ListingDisplay from './ListingDisplay';
import { Button } from 'semantic-ui-react';

function Dashboard({ profile: { profile, loading }, getCurrentUser, deleteCurrentUser }) {
  useEffect(() => {
    getCurrentUser();
  }, []);

  // console.log(<img src={profile.data.data.photo} />);

  return (
    <div>
      {profile && profile.data && profile.data.data ? (
        <div className='dashboard'>
          {/* <Link to='/editprofile'>
            <Icon className='dashboard__edit' size='large' name='pencil' />
          </Link> */}

          <div className='dashboard__userInfo'>
            {profile.data.data.photo && (
              <Image
                size='small'
                className='dashboard__image'
                src={`/uploads/${profile.data.data.photo || profile.data.user.photo}`}
                alt='Profile Image'
              />
            )}

            <Card className='dashboard__card'>
              <Card.Content>
                <Card.Header className='dashboard__cardHeader'>
                  {profile.data.data.firstName || profile.data.user.firstName} {profile.data.data.lastName || profile.data.user.lastName}
                </Card.Header>
                <Card.Meta>{profile.data.data.role || profile.data.user.role}</Card.Meta>
                <Card.Description>{profile.data.data.email || profile.data.user.email}</Card.Description>
              </Card.Content>
            </Card>

            <Button onClick={() => deleteCurrentUser()}>Delete Account</Button>
            <Link to='/editprofile'>
              {' '}
              <Button>Edit Account</Button>{' '}
            </Link>
          </div>
          <div className='arrow_up' />

          {profile.data.data.listings &&
            profile.data.data.listings.map((listing) => {
              return <ListingDisplay key={listing._id} listing={listing} />;
            })}
        </div>
      ) : (
        <div> Your profile will loaded in a while. Thank you!</div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentUser, deleteCurrentUser })(Dashboard);
