import React from 'react';
import PropTypes from 'prop-types';
import wx from 'weixin-js-sdk';
import querystring from 'querystring';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import FlatButton from 'material-ui/FlatButton';
import ActionUpdate from 'material-ui/svg-icons/navigation/refresh';
import ActionCheck from 'material-ui/svg-icons/navigation/apps';
import styled from 'styled-components';
import localStorage from "localStorage";
import { toggleShowForm as toggleShowFormAction } from '../../../actions/formActions';
import GamemodeToggle from '../../../components/GamemodeToggle';

const Styled = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  font-size: 14px;

  @media only screen and (max-width: 660px) {
    justify-content: center;

    & a {
      min-width: 50px !important;
    }

    & button {
      min-width: 50px !important;
    }

    & * {
      margin: auto !important;
    }

    & span {
      margin: 0 !important;
    }
  }
`;
class PlayerButtons extends React.Component {
  static propTypes = {
    playerId: PropTypes.string,
    strings: PropTypes.shape({}),
  };

  state = { disableRefresh: false };

  render() {
    const { playerId, strings } = this.props;
    return localStorage.getItem("busId") == null ? (
      <Styled>
        <div data-hint={strings.app_refresh} data-hint-position="top">
          <FlatButton
            icon={<ActionUpdate />}
            disabled={this.state.disableRefresh}
            onClick={() => {
              fetch(
                `https://bbs.dotamax.cloud/thirdParty/refreshDotaMax?playerId=${playerId}`,
                { method: 'post',
                mode: 'no-cors',
                },
              );
              this.setState({ disableRefresh: false });
            }}
            label={strings.app_refresh_label}
          />
        </div>
        <Box ml="16px">
          <GamemodeToggle />
        </Box>
        <div data-hint='绑定个人账号' data-hint-position="left">
                  <FlatButton
                    icon={<ActionCheck />}
                    disabled={this.state.disableRefresh}
                    onClick={() => {
                      localStorage.setItem('busId',playerId);
                      this.setState({ disableRefresh: false });
                      const urlDotamax = `/pages/mine/mine?busId=${playerId}`;
                      const openId = localStorage.getItem('openId');
                      const urlBind =  `https://bbs.dotamax.cloud/thirdParty/bindOpenIdAndPlayId?openId=${openId}&playerId=${playerId}`;
                      // 直接调用接口绑定关系
                                            fetch(
                                                           urlBind,
                                                            { method: 'GET',
                                                              mode: 'no-cors',
                                                            },
                                                          );
                      // wx.miniProgram.reLaunch({ url: urlDotamax });

                    }}
                    label='绑定账号'
                  />
        </div>
      </Styled>
    ) : (
          <Styled>
            <div data-hint={strings.app_refresh} data-hint-position="top">
              <FlatButton
                icon={<ActionUpdate />}
                disabled={this.state.disableRefresh}
                onClick={() => {
                  fetch(
                                  `https://bbs.dotamax.cloud/thirdParty/refreshDotaMax?playerId=${playerId}`,
                                  { method: 'get',
                                  mode: 'no-cors',
                                  },
                                );
                  this.setState({ disableRefresh: false });
                }}
                label={strings.app_refresh_label}
              />
            </div>
            <Box ml="16px">
              <GamemodeToggle />
            </Box>
            <div data-hint='解绑' data-hint-position="left">
                      <FlatButton
                        icon={<ActionCheck />}
                        disabled={this.state.disableRefresh}
                        onClick={() => {
                          localStorage.removeItem('busId');
                          const openId = localStorage.getItem('openId');
                          this.setState({ disableRefresh: false });
                          const urlDotamax = `/pages/mine/mine?unBind=1`;
                          const unBindUrl = `https://bbs.dotamax.cloud/thirdParty/unbindOpenIdAndPlayId?openId=${openId}`;
                          fetch(
                                                                                          unBindUrl,
                                                                                          { method: 'GET',
                                                                                            mode: 'no-cors',
                                                                                          },
                                                                                        );
                          // wx.miniProgram.reLaunch({ url: urlDotamax });

                        }}
                        label='解绑'
                      />
            </div>
          </Styled>
        )
    ;
  }
}

const mapStateToProps = state => ({
  showForm: state.app.form.show,
  strings: state.app.strings,
});

const mapDispatchToProps = dispatch => ({
  toggleShowForm: () => dispatch(toggleShowFormAction('tableFilter')),
});
const params = querystring.parse(window.location.hash.substring(window.location.hash.indexOf("?")+1));

export default connect(mapStateToProps, mapDispatchToProps)(PlayerButtons, params.openId !== undefined ?
localStorage.setItem('openId',params.openId):console.log("error"),
params.busId !== undefined ?
localStorage.setItem('busId',params.busId):console.log("error")
);


