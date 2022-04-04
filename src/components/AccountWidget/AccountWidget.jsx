import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Error from '../Error';
import { IconSteam } from '../Icons';
import LoggedIn from './LoggedIn';

const ButtonLabel = styled.span`
  margin-left: 4px;
`;

const AccountWidget = ({
  loading, error, user, style, strings,
}) => {
  if (loading) return null;
  return (
    <div style={style}>
      {error && <Error />}
      {!error && !loading && user
        ? <LoggedIn style={style} playerId={user.account_id} />
        :
        <Button />
      }
    </div>
  );
};

AccountWidget.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  user: PropTypes.shape({}),
  style: PropTypes.string,
  strings: PropTypes.shape({}),
};

const mapStateToProps = (state) => {
  const { error, loading, data } = state.app.metadata;
  return {
    loading,
    error,
    user: JSON.parse(localStorage.getItem('user')),
    strings: state.app.strings,
  };
};

export default connect(mapStateToProps, null)(AccountWidget);
