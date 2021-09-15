import React from 'react';

import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';

function AlertComponent({ alert }) {
  return (
    <div>
      <Alert variant='success'>{alert.msg}</Alert>
    </div>
  );
}

const mapStateToProps = (state) => ({
  alert: state.alert
});

export default connect(mapStateToProps)(AlertComponent);
