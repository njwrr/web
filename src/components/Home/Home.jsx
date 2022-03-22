import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Buttons from './Buttons';
import Why from './Why';
import Sponsors from './Sponsors';
import { HeadContainerDiv, HeadlineDiv, DescriptionDiv, BottomTextDiv } from './Styled';

const Home = ({ strings }) => (
  <div>
    <HeadContainerDiv>
      <HeadlineDiv>
        <h1>{strings.app_name}</h1>
      </HeadlineDiv>
      <DescriptionDiv>
        <h2>{strings.app_description}</h2>
      </DescriptionDiv>
      <Buttons />
    </HeadContainerDiv>
    <Why />
    <Sponsors />
  </div>
);

Home.propTypes = {
  strings: PropTypes.shape({}),
};

const mapStateToProps = state => ({
  content: state.content,
  strings: state.app.strings,
});

export default connect(mapStateToProps)(Home);
