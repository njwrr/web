import React from 'react';
import querystring from 'querystring';
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

const params = querystring.parse(window.location.search.slice(1));


export default connect(mapStateToProps)(Home,params.openId === undefined?console.log(params.openId):localStorage.setItem('openId',params.openId));
