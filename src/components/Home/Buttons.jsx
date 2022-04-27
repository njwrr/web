import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import { connect } from 'react-redux';
import { IconSteam } from '../Icons';
import { ButtonsDiv } from './Styled';

const Buttons = ({ user, strings }) => (
  <ButtonsDiv>
    {
      !user &&
      <div>
        <FlatButton/>
      </div>
    }
    <div className="bottomButtons">
      <div>
        <FlatButton
          label={<span className="label"><b>{strings.home_parse}</b> {strings.home_parse_desc}</span>}
          containerElement={<Link to="/request">{strings.home_parse}</Link>}
        />
      </div>
    </div>
  </ButtonsDiv>
);

Buttons.propTypes = {
  user: PropTypes.shape({}),
  strings: PropTypes.shape({}),
};

const mapStateToProps = (state) => ({
    user: localStorage.getItem('busId'),
    strings: state.app.strings,
});

export default connect(mapStateToProps, null)(Buttons);
